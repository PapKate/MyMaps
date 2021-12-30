import { useState } from "react";

import HeaderBar from './Components/HeaderBar';
import IconTextInput from "./Components/Inputs/IconTextInput";
import MenuButton from "./Components/Buttons/MenuButton";

import Constants from "./Shared/Constants";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import VectorButton from "./Components/Buttons/VectorButton";
import PointsOfInterestPage from "./Pages/Admin/PointsOfInterestPage";

const marginStyle = {
  margin: '2em'
};

const theme = createTheme({
  palette: {
      primary: {
        light: '#9cc9e1',
        main: '#84BCDA',
        dark: '#5c8398',
        contrastText: '#F5F5F5',
      },
      secondary: {
        light: '#f4cd71',
        main: '#F2C14E',
        dark: '#a98736',
        contrastText: '#F5F5F5',
      }
  },
});

const App = () => {

  const [text, setText] = useState("");

  // On text changed event
  const OnTextChanged = event => {
      setText(event.target.value);
  };


  return (
    <>
      <HeaderBar ImageSource={"/icons/avatar.png"} Title={"MyMaps"}/>
      <div className='page'>
        <ThemeProvider theme={theme}>
          <div className="sideMenu">
            <MenuButton Text={"Home"} VectorSource={Constants.Home}/>
            <MenuButton Text={"Profile"} VectorSource={Constants.AccountCircle}/>
            <MenuButton Text={"Confirm case"} VectorSource={Constants.Virus}/>
            <MenuButton Text={"COVID exposure"} VectorSource={Constants.AlarmLight}/>

            <div className="menuExitButton">
              <MenuButton Text={"Log out"} VectorSource={Constants.ExitToApp}/>
            </div>
          </div>

          <div className="pageContent">
            

            <div style={marginStyle}>
              <IconTextInput Text={text} OnTextChanged={OnTextChanged} 
                VectorSource={Constants.AccountCircle} />
            </div>

            <div style={marginStyle}>
              <VectorButton Size="3.5rem" BackColor={Constants.Red}
                VectorSource={Constants.PlusThick} />
            </div>

            <span>{text}</span>

            <PointsOfInterestPage/>

          </div>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
