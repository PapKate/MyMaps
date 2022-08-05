import React, { useState, useEffect } from 'react';
import { makeStyles, Tooltip } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { Icon } from 'leaflet';
import { MapContainer, Popup, Marker, TileLayer, ZoomControl } from "react-leaflet"

import axios from "axios";

import Constants from "../../Shared/Constants";
import pointsOfInterest from  '../../Shared/generic.json'
import TitleAndText from "../../Components/TitleAndText";
import IconTextInput from '../../Components/Inputs/IconTextInput';
import VectorButton from '../../Components/Buttons/VectorButton';

const useStyles = makeStyles({
  homePageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: `#${Constants.White}`,
  },
});

const silhouette = new Icon({
  iconSize:[60, 60],
  iconUrl: '/icons/personBlack.png'
});

const greenPlaceholder = new Icon({
  iconSize:[40, 40],
  iconUrl: '/icons/greenPlaceholder.png'
});

const orangePlaceholder = new Icon({
  iconSize:[40, 40],
  iconUrl: '/icons/orangePlaceholder.png'
});

const redPlaceholder = new Icon({
  iconSize:[40, 40],
  iconUrl: '/icons/redPlaceholder.png'
});

const HomePage = ({ UserId }) => {
  /**
   ** Material UI Styles
   */
   const classes = useStyles();

  /**
   ** The current location object, which represents the current URL in web browsers.
   */
   const location = useLocation();

  /**
   ** The user data and location from the state
   */
  const { userData, userLocation } = location.state;

  /**
   * The days of a week
   */
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  //#region Current Hour

  /**
   ** The hour of date time now 
   */
  const [currentHour, setCurrentHour] = useState(0);

  //#endregion

  //#region Current Day

  /**
   ** The day of date time now 
   */
   const [currentDay, setCurrentDay] = useState(1);

  //#endregion

  //#region Points Of Interest

  /**
   ** The points of interest
  */
   const [points, setPoints] = useState(null);

  /**
   ** The unique points of interest
  */
   const [uniquePoints, setUniquePoints] = useState(null);

  //#endregion

  //#region Search Text Input
  
  /**
   ** The text of the search input
   */
  const [searchText, setSearchText] = useState("");

  /**
   ** On searchText changed event
   */
  const OnSearchTextChanged = (event) => {
    setSearchText(event.target.value);
  };

  //#endregion
  
  //#region Popularity Text Input
  
  /**
   ** The text of the popularity input
   */
   const [popularityText, setPopularityText] = useState("");

   /**
    ** On popularityText changed event
    */
   const OnPopularityTextChanged = (event) => {
    var value = event.target.value;
    if (typeof value !== 'string') {
      event.target.value = "";
    }
  
    const num = Number(value);
  
    if (Number.isInteger(num) && num >= 0) {
      setPopularityText(event.target.value);
    }
    event.target.value = "";
  };
 
  //#endregion

  //#region Methods

  /**
   ** Gets the correct place holder for the given current popularity
   * @param {int} currentPopularity The current popularity
   * @returns The placeholder
   */
  const GetPlaceHolder = (currentPopularity) => {
    // Parses to an int the value
    var popularity = parseInt(currentPopularity)
    // If the popularity is greater or equal than 66...
    if(66 <= popularity)
      // Returns the red placeholder
      return redPlaceholder  
    // Else if the popularity is greater or equal than 33 and smaller or equal to 65...
    else if(33 <= popularity && popularity <= 65)
      // Returns the orange placeholder
      return orangePlaceholder
    // Else
    else
      // Returns the green placeholder
      return greenPlaceholder
  };

  /**
   ** Submits the current popularity
   */
  const PopularityButtonOnClick = async (point) => {
    try {
      await axios.post(`/api/myMaps/pointCheckIns`, {
        userId: userData.id,
        pointId: point.id,
        customers: popularityText,
      });

      setPopularityText("");

    } catch (error) {
      console.log(error);
      console.log("data not fetched");
    }
  }

  /**
   * 
   */
  const SetCurrentDayAndHour = () => {
    var currentDateAndTime = new Date();

    var day = currentDateAndTime.getDay();

    if(day == 0)
      setCurrentDay(7);
    else
      setCurrentDay(day - 1)

    setCurrentHour(currentDateAndTime.getHours());
  }

  /**
   * Gets the pois from the data base
   */
  const GetPOIS = async() => {
    try {
      const response = await axios.get(`/api/myMaps/points`);

      // The json data from the response
      let pois = response.data;

      var uniquePois = [];
      for(var i = 0; i < pois.length; i++)
      {
        if(i % 7 === 0)
        uniquePois.push(pois[i]);
      }
      uniquePois.forEach(poi => {
        var key = "next";
        var value = 0;
        poi[key] = value;
      });

      let dateTimeNow = new Date();
      let day = dateTimeNow.getDay();
      let hour = dateTimeNow.getHours();
      
      uniquePois.map((point) => {
        let nextValue = 0;
        for(let i = 0; i < 2; i ++)
        {
          let nextHourValue = 0;
          if(hour - (i + 1) < 0)
            nextHourValue = GetPointHourData(pois, point, day - 1, 24 - (i + 1));
          else
            nextHourValue = GetPointHourData(pois, point, day, hour - (i + 1));
          nextValue += nextHourValue;
        }

        nextValue = Math.ceil(nextValue / 2); 
        point["next"] = nextValue;

        

      });

      setPoints(pois);
      setUniquePoints(uniquePois);
    } catch (error) {
      console.log(error);
      console.log("data not fetched");
    }
  }

  /**
   * Gets the "hourXX" data from the data base of the specified @point
   * @param {List<poi>} points The points of interest
   * @param {poi} point The point of interest
   * @param {*} day The day
   * @param {*} hour The hour
   */
  const GetPointHourData = (points, point, day, hour) => {
    // Gets the point data from the points list with id the specified point's id
    var pointData = points.filter(function(x) { return x.id === point.id; });
    // Gets the day's name of the week 
    let dayName = weekday[day];
    // Formats the hour to 2 digits integer
    let formattedHour = hour.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    // Gets the data from the specified day
    var dayData = pointData.find(function(x) { return x.day === dayName; });
    // Creates the key to search the column name
    var key = `hour${formattedHour}`;

    // Return the value of the day data key 
    return dayData[key];
  }

  /**
   ** On initialized
   */
  useEffect(() => { 
    SetCurrentDayAndHour();
    GetPOIS();

  }, []);

  //#endregion

  return (
    <div className={classes.homePageContainer}>
      <div className="leafletSearchBarContainer">
        <div className="leafletSearchBar">
          <IconTextInput  Text={searchText}
                          HasFullWidth={true}
                          Size="small"
                          OnTextChanged={OnSearchTextChanged}
                          Hint="Search for a place or category..."
                          VectorSource={Constants.Magnify}
                          VectorColor={Constants.Gray}/>
        </div>
      </div>
      <div className='leaflet-container'>
        <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={15} scrollWheelZoom={true} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          <Marker position={[userLocation.lat, userLocation.lng]} icon={silhouette}>
          </Marker> 

          {uniquePoints !== null && uniquePoints?.map((point) => (
            
            <Marker key={point.id}
                    position={[
                      point.lat, 
                      point.lng
                    ]}
                    icon={ GetPlaceHolder(point.next) }>
              <Popup closeButton={false} onClose={() => {setPopularityText("")}}>
                <div className='poiPopUpContainer'>
                  <h2 className='poiTitle'>{point.name}</h2>
                                                                                                                                                          
                  <TitleAndText title={'Address'} text={point.address} />
                  <TitleAndText title={'Rating'} text={`${point.rating} / 5 by ${point.ratingNumber} reviews`} />
                  <TitleAndText title={'Current popularity'} text={point.currentPopularity == null ? '-' : point.currentPopularity} />
                  <TitleAndText title={'Next 2 hours estimated popularity'} text={point.next} />
                  <div className='popUpButtonsContainer'>
                    <IconTextInput  Text={popularityText}
                                    HasFullWidth={true}
                                    Size="small"
                                    Hint=''
                                    OnTextChanged={OnPopularityTextChanged}
                                    VectorSource={Constants.AccountGroup}
                                    VectorColor={Constants.LightBlue}/>
                    <div className="tooltip">
                      <VectorButton VectorSource={Constants.AccountEye} 
                                    BorderRadius={'8px'} 
                                    Size={'40px'}
                                    BackColor={Constants.LightBlue}
                                    OnClick={() => PopularityButtonOnClick(point)}
                                    />
                      <span className="tooltipText">Submit popularity</span>
                    </div>
                    <div className="tooltip">
                      <VectorButton VectorSource={Constants.Hand} 
                                    BorderRadius={'8px'}
                                    Size={'40px'} 
                                    BackColor={Constants.Yellow}/>
                      <span className="tooltipText">I was here</span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

         </MapContainer>
      </div>

    </div>
  );
};

export default HomePage;