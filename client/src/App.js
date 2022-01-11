import { useState } from "react";

import LoginHeaderBar from './Components/LoginHeaderBar';
import IconTextInput from "./Components/Inputs/IconTextInput";
import MenuButton from "./Components/Buttons/MenuButton";

import Constants from "./Shared/Constants";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';
import VectorButton from "./Components/Buttons/VectorButton";
import PointsOfInterestPage from "./Pages/Admin/PointsOfInterestPage";
import LoginPage from "./Pages/Login/LoginPage";

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
      <LoginHeaderBar ImageSource={"/icons/avatar.png"} Title={"COVID-19 Map"}/>
        <ThemeProvider theme={theme}>

           <LoginPage/>
           
        </ThemeProvider>
    </>
  );
}

export default App;
