import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { createTheme } from '@material-ui/core/styles';

import axios from "axios";

import HeaderBar from './Components/HeaderBar';

import ProfilePage from "./Pages/User/ProfilePage";
import LoginForm from "./Pages/LoginRegisterForms/LoginForm";
import SignupForm from "./Pages/LoginRegisterForms/SignupForm";
import HomePage from "./Pages/User/HomePage";
import ConfirmCasePage from "./Pages/User/ConfirmCasePage";
import CovidExposurePage from "./Pages/User/CovidExposurePage";
import PointsOfInterestPage from "./Pages/Admin/PointsOfInterestPage";

const App = () => {

  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const childToParent = async(childData) => {
    const response = await axios.get(`/api/myMaps/users`);
    // The json data from the response
    let users = response.data;
    
    var userData = users.find(x => x.id === childData);
    
    setUsername(userData.username);

    setUserIsLoggedIn(true);
  }


  useEffect(() => {
  } );

  return (
    <>
      <HeaderBar Username={username} IsLoggedIn={userIsLoggedIn}/>
        <Router>
          <Routes>
            <Route exact path='/' element={ <LoginForm SetChildToParentUserId={childToParent}/> } />
            <Route exact path='sign-up' element={ <SignupForm/> } /> 
            <Route exact path='/user/:userId/home' element={ <HomePage /> } />
            <Route exact path='/user/:userId/profile' element={ <ProfilePage /> } />
            <Route exact path='/user/:userId/confirmCase' element={ <ConfirmCasePage /> } />
            <Route exact path='/user/:userId/COVIDExposure' element={ <CovidExposurePage /> } />
            <Route exact path='/admin/:adminId/pointsOfInterest' element={ <PointsOfInterestPage /> } />
          </Routes> 
        </Router>
    </>
  );
}

export default App;
