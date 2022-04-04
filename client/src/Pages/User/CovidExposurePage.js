import { makeStyles } from "@material-ui/core";

import { useLocation } from "react-router-dom";

import Constants from "../../Shared/Constants";
import UserSideMenu from "../../Components/SideMenus/UserSideMenu";

const useStyles = makeStyles({
    covidExposurePageContainer: {
    width: "100%",
    minHeight: "calc(100vh - 4rem)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: `#${Constants.White}`,
  }
});

const CovidExposurePage = ({ UserId }) => {
  // Material UI Styles
  const classes = useStyles();

  const location = useLocation();


  const { userData } = location.state;

  const user = JSON.parse(userData);

  return (
    <div className="page">
        <UserSideMenu UserData={user}/>
        <div className={classes.covidExposurePageContainer}>
        </div>
    </div>
  );
};

export default CovidExposurePage;
