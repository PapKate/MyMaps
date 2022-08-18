import React, { useState, useEffect } from 'react';
import { makeStyles, Tooltip } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { Icon } from 'leaflet';
import { MapContainer, Popup, Marker, TileLayer, ZoomControl, Circle } from "react-leaflet"

import axios from "axios";

import Helpers from "../../Shared/Helpers"
import Constants from "../../Shared/Constants";
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
  iconUrl: '/icons/personBlue.png'
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

const HomePage = () => {
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

  /**
   ** The searched points of interest
   */
  const [searchedPoints, setSearchedPoints] = useState(null);
  
  //#endregion

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
   * Converts the @degrees to radius
   * @param {int} degrees The degrees
   */
  const DegreesToRadius = (degrees) => {
    return degrees * (Math.PI/180)
  }
  /**
   ** Gets the distance between two points 
   * @param {double} lat1 Latitude for first
   * @param {double} lon1 Longitude for first
   * @param {double} lat2 Latitude for second
   * @param {double} lon2 Longitude for second
   */
  const GetDistanceInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = DegreesToRadius(lat2-lat1);  
    var dLon = DegreesToRadius(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(DegreesToRadius(lat1)) * Math.cos(DegreesToRadius(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

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

  const CheckInButtonOnClick = async (point) => {
    try {
      await axios.post(`/api/myMaps/pointCheckIns`, {
        userId: userData.id,
        pointId: point.id,
        customers: null
      });

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
   ** Gets the next two hours popularity according to the current day and time 
   * @param {List<pois>} popularTimes 
   * @param {poi} point 
   * @param {*} day 
   * @param {*} hour 
   */
  const GetNextHoursPopularity = (popularTimes, point, day, hour) => {
    // Sets as the next hours popularity value to 0
    let nextValue = 0;
    // For two times...
    for(let i = 0; i < 2; i ++)
    {
      // Sets as the next hour value to 0
      let nextHourValue = 0;
      // If the next hour is on the next day...
      if(hour - (i + 1) < 0)
        nextHourValue = GetPointHourData(popularTimes, point, day - 1, 24 - (i + 1));
      // Else...
      else
        nextHourValue = GetPointHourData(popularTimes, point, day, hour - (i + 1));
      // Adds to the next hours value the value
      nextValue += nextHourValue;
    }

    // Sets as the next hours value the next integer of the average of next hours value
    nextValue = Math.ceil(nextValue / 2); 
    // Returns the value
    return nextValue;
  }

  /**
   ** Gets the average popularity for the previous two hoours from the point check ins 
   * @param {List<poiCheckIn>} pointCheckIns 
   */
  const GetPreviousHoursAveragePopularity = (pointCheckIns) => {
    let numberOfCheckIns = 0;
    let averagePopularity = 0;
    pointCheckIns.forEach(checkIn => {
      numberOfCheckIns++;
      averagePopularity += checkIn.customers;
    });

    averagePopularity = numberOfCheckIns == 0 ? 0 : Math.ceil(averagePopularity / numberOfCheckIns);
    return averagePopularity;
  }

  /**
   ** Gets the pois from the data base
   */
  const GetPOIS = async() => {
    try {
      // Gets the popular times for all the points of interest from the database
      const response = await axios.get(`/api/myMaps/popularTimes`);
      
      // The json data from the response
      let pois = response.data;

      // Creates a new list for the unique references of a point of interest
      var uniquePois = [];
      // For each...
      for(var i = 0; i < pois.length; i++)
      {
        // If it is the first reference of a poi in the popular times list...
        if(i % 7 === 0)
          // Add it to the list 
          uniquePois.push(pois[i]);
      }

      // For each poi...
      uniquePois.forEach(poi => {
        // Creates a new key
        var key = "next";
        // Sets a the value 0
        var value = 0;
        // Sets the key and value pair in the poi object
        poi[key] = value;
      });

      // Gets the date time now
      let dateTimeNow = new Date();
      // Gets the day of the week that is now
      let day = dateTimeNow.getDay();
      // Gets the current hour
      let hour = dateTimeNow.getHours();
      
      // For each poi...
      uniquePois.forEach(async(point) => {
        let nextValue = GetNextHoursPopularity(pois, point, day, hour);
        // Sets the value to the next key in the poi
        point["next"] = nextValue;

        // Gets the date time now
        let previousHours = new Date();
        // Subtracts two hours
        previousHours.setTime(previousHours.getTime() - 2 * 60 * 60 * 1000);
        // Gets the check ins of all the points of interest from the database
        const checkInResponse = await axios.get(`/api/myMaps/pointCheckIns/points`, {
          params: {
            pointId : `${point.id}`,
            checkInDate : [`gt.${Helpers.FormatDateTime(previousHours)}`, `lt.${Helpers.FormatDateTime(dateTimeNow)}`]
          }
        });

        // Gets all the point check ins from the data base that have id the poi's id...
        // And are between date time now and two hours previously
        let pointCheckIns = checkInResponse.data;

        let averagePopularity = GetPreviousHoursAveragePopularity(pointCheckIns);
        point["currentPopularity"] = averagePopularity;
      });

      setPoints(pois);
      setUniquePoints(uniquePois);
    } catch (error) {
      console.log(error);
      console.log("data not fetched");
    }
  }

  /**
   ** Gets the "hourXX" data from the data base of the specified @point
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

  /**
   ** Fires when the search text is updated.
   ** Gets the points that contain the searched text in their name or categories 
   */
  useEffect(() => {
    // If the search text is not null or empty...
    // Gets the points that contain in their name //TODO or categories the text
    // Else returns an empty array
    let points = searchText ? uniquePoints?.filter(function (x) {
      return x.name.toLowerCase().includes(searchText.toLowerCase()) ;
    }) : null;
    setSearchedPoints(points);
  }, [searchText])

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
        <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={14} scrollWheelZoom={true} zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          />
          <ZoomControl position="topright" />
          <Circle center={[userLocation.lat, userLocation.lng]} fillColor={"red"} radius={20} stroke={false} />
          <Marker position={[userLocation.lat, userLocation.lng]} icon={silhouette}>
          </Marker> 

          {searchedPoints !== null && searchedPoints?.map((point) => (
            
            <Marker key={point.id} 
                    position={[
                      point.lat, 
                      point.lng
                    ]}
                    icon={ GetPlaceHolder(point.next) }
                    eventHandlers={{
                      click: () => {
                        console.log(`marker ${point.name} clicked`)
                      },
                    }}>
              <Popup closeButton={false} onClose={() => {setPopularityText("")}}>
                <div className='poiPopUpContainer'>
                  <h2 className='poiTitle'>{point.name}</h2>
                  <h4>{point.lat}, {point.lng}</h4>
                  <TitleAndText Title={'Address'} Text={point.address} />
                  <TitleAndText Title={'Rating'} Text={`${point.rating} / 5 by ${point.ratingNumber} reviews`} />
                  <TitleAndText Title={'Current popularity'} Text={point.currentPopularity} />
                  <TitleAndText Title={'Next 2 hours estimated popularity'} Text={point.next} />
                  { GetDistanceInKm(userLocation.lat, userLocation.lng, point.lat, point.lng) <= 0.020 
                    ? 
                    (
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
                                        OnClick={async() => await PopularityButtonOnClick(point)}
                                        />
                          <span className="tooltipText">Submit popularity</span>
                        </div>
                        <div className="tooltip">
                          <VectorButton VectorSource={Constants.Hand} 
                                        BorderRadius={'8px'}
                                        Size={'40px'} 
                                        BackColor={Constants.Yellow}
                                        OnClick={async() => await CheckInButtonOnClick(point)}/>
                          <span className="tooltipText">I was here</span>
                        </div>
                      </div>
                    ) 
                    :
                    (
                      <div></div>
                    )
                  }
                  
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