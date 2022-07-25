import { makeStyles } from "@material-ui/core";

import { useLocation } from "react-router-dom";
import { Icon } from 'leaflet';
import { MapContainer, Popup, Marker, TileLayer } from "react-leaflet"

import Constants from "../../Shared/Constants";

const useStyles = makeStyles({
    homePageContainer: {
      width: "100%",
      height: "100%",
      position: "relative",
      backgroundColor: `#${Constants.White}`,
  }
});




const HomePage = ({ UserId }) => {
  // Material UI Styles
  const classes = useStyles();

  const location = useLocation();

  const { userData } = location.state;


  let currentDateAndTime = new Date();

  let currentDay = currentDateAndTime.getDay()

  let currentHour = currentDateAndTime.getHours();
  


  return (
    <div className={classes.homePageContainer}>
      Home

      <div className='leaflet-container'>
        <MapContainer center={[38.246639, 21.734573]} zoom={12} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          />
          <Marker position={[38.246639, 21.734573]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>   
         </MapContainer>
      </div>

    </div>
  );
};

export default HomePage;