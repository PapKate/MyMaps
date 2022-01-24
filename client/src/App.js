import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { ThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';

import UserResponseModel from "../src/ResponseModels/UserResponseModel";

import Constants from "./Shared/Constants";

import IconTextInput from "./Components/Inputs/IconTextInput";
import MenuButton from "./Components/Buttons/MenuButton";
import UserSideMenu from "./Components/SideMenus/UserSideMenu";
import AdminSideMenu from "./Components/SideMenus/AdminSideMenu";
import HeaderBar from './Components/HeaderBar';

import PointsOfInterestPage from "./Pages/Admin/PointsOfInterestPage";
import TestPage from "./Pages/TestPage";
import ProfilePage from "./Pages/User/ProfilePage";
import LoginForm from "./Pages/LoginRegisterForms/LoginForm";
import SignupForm from "./Pages/LoginRegisterForms/SignupForm";
import LoginPage from "./Pages/LoginRegisterForms/LoginForm";



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

  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const SetUserIsLoggedIn = () => setUserIsLoggedIn(!userIsLoggedIn);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  var userObject = null;
  useEffect(() => {
    userObject = JSON.parse(user);
    setUsername(userObject?.username);
    console.log(userObject?.id);

  });

  return (
    <>
      <HeaderBar Username={username} IsLoggedIn={false}/>
        {userObject?.id}
        <Router>
          <Routes>
            <Route path='/' element={ <LoginForm SetParentUser={setUser}/> } />
            <Route path='sign-up' element={ <SignupForm/> } /> 
            <Route path='profile' element={ <ProfilePage User={user} /> } />
          </Routes> 
        </Router>
    </>
  );
}

export default App;
