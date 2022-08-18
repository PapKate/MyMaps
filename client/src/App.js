import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import axios from "axios";

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

  const [username, setUsername] = useState("");

  const GetUsernameOnLogin = username => {
    setUsername(username);
  }

  return (
    <>
        <Router>
          <Routes>
            <Route path='/' element={ <LoginForm /> } />
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
