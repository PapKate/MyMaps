import { useState } from "react";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';

import HeaderBar from './Components/HeaderBar';
import PointsOfInterestPage from "./Pages/Admin/PointsOfInterestPage";
import TestPage from "./Pages/TestPage";
import UserSideMenu from "./Components/SideMenus/UserSideMenu";
import AdminSideMenu from "./Components/SideMenus/AdminSideMenu";
import ProfilePage from "./Pages/User/ProfilePage";


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

  return (
    <>
      <HeaderBar Username="0xTeli" IsLoggedIn={true}/>

      {userIsLoggedIn ? (
        <div className='page'>
          <ThemeProvider theme={theme}>

            <UserSideMenu/>

            <div className="pageContent">

              {/* <TestPage/> */}

              <ProfilePage/>
            
            </div>

          </ThemeProvider>
        </div>
      ) : (
        <div className='page'>
          <ThemeProvider theme={theme}>

            <AdminSideMenu/>

            <div className="pageContent">
            
              <PointsOfInterestPage/>

            </div>

          </ThemeProvider>
        </div>
      )}

    </>
  );
}

export default App;
