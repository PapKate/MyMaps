import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import axios from "axios";

import HeaderBar from './Components/HeaderBar';
import ProfilePage from "./Pages/User/ProfilePage";
import LoginForm from "./Pages/LoginRegisterForms/LoginForm";
import SignupForm from "./Pages/LoginRegisterForms/SignupForm";
import HomePage from "./Pages/User/HomePage";
import ConfirmCasePage from "./Pages/User/ConfirmCasePage";
import CovidExposurePage from "./Pages/User/CovidExposurePage";
import PointsOfInterestPage from "./Pages/Admin/PointsOfInterestPage";
import StatisticsPage from "./Pages/Admin/StatisticsPage";
import LayoutPage from "./Pages/LayoutPage";


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

  return (
    <>
      <HeaderBar Username={username} IsLoggedIn={userIsLoggedIn}/>
        <Router>
          <Routes>
            <Route path='/' element={ <LoginForm SetChildToParentUserId={childToParent}/> } />
            <Route path='sign-up' element={ <SignupForm/> } /> 
            <Route path='admins/:adminId' element={ <LayoutPage /> } >
              <Route path='pointsOfInterest' element={ <PointsOfInterestPage /> } />
              <Route path='statistics' element={ <StatisticsPage /> } />
            </Route>
            <Route path='users/:userId' element={ <LayoutPage /> } >
              <Route path='home' element={ <HomePage /> } />
              <Route path='profile' element={ <ProfilePage /> } />
              <Route path='confirmCase' element={ <ConfirmCasePage /> } />
              <Route path='COVIDExposure' element={ <CovidExposurePage /> } />
            </Route>
          </Routes> 
        </Router>
    </>
  );
}

export default App;
