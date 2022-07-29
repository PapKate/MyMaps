import React, { useState, useEffect } from 'react';
import { makeStyles, Tooltip } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { Icon } from 'leaflet';
import { MapContainer, Popup, Marker, TileLayer, ZoomControl } from "react-leaflet"

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
   ** Opens a dialog to submit the current popularity
   */
  const PopularityButtonOnClick = () => {
  }

  /**
   ** Calculates the estimated future popularity of a point of interest...
   ** For the next given hours of the current hour of the day
   * @param {poi} point The point of interest 
   * @param {int} hours The next hours to create the estimation
   */
  const GetEstimatedFuturePopularity = (point, hours) => {
    var totalPopularity = 0;
    for(var i = 0; i < hours; i++)
    {
      var nextPopularity = point.populartimes[currentDay - 1].data[currentHour + i];
      totalPopularity = totalPopularity + nextPopularity;
    }

    totalPopularity = Math.ceil(totalPopularity / hours);

    return totalPopularity;
  };

  /**
   ** On after render
   */
  useEffect(() => {
    
    var currentDateAndTime = new Date();

    setCurrentDay(currentDateAndTime.getDay())

    setCurrentHour(currentDateAndTime.getHours());
  });

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

          {pointsOfInterest.map((point) => (
            
            <Marker key={point.id}
                    position={[
                      point.coordinates.lat, 
                      point.coordinates.lng
                    ]}
                    icon={ GetPlaceHolder(point.current_popularity) }>
              <Popup closeButton={false} onClose={() => {setPopularityText("")}}>
                <div className='poiPopUpContainer'>
                  <h2 className='poiTitle'>{point.name}</h2>
                  {currentDay !== 0 
                  ?
                   point.populartimes[currentDay - 1].data[currentHour] === 0 
                    ? 
                      <h4 className='poiClosed'>Closed</h4>
                    : 
                      <h4 className='poiOpen'>Open</h4>
                  :
                    point.populartimes[7].data[currentHour] === 0 
                    ? 
                      <h4 className='poiClosed'>Closed</h4>
                    : 
                      <h4 className='poiOpen'>Open</h4>
                  }
                  <TitleAndText title={'Address'} text={point.address} />
                  <TitleAndText title={'Rating'} text={`${point.rating} / 5 by ${point.rating_n} reviews`} />
                  <TitleAndText title={'Current popularity'} text={point.current_popularity == null ? '-' : point.current_popularity} />
                  <TitleAndText title={'Next 2 hours estimated popularity'} text={GetEstimatedFuturePopularity(point, 2)} />
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
                                    OnClick={PopularityButtonOnClick}
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