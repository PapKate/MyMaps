import { makeStyles } from "@material-ui/core";

import { useLocation, Outlet } from "react-router-dom";

import Constants from "../Shared/Constants";
import UserSideMenu from "../Components/SideMenus/UserSideMenu";

const useStyles = makeStyles({
    homePageContainer: {
    width: "100%",
    minHeight: "calc(100vh - 4rem)",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: `#${Constants.White}`,
  }
});

const LayoutPage = () => {

    const location = useLocation();

    let { userData } = location.state;

    return (
        <div className="page">
            <UserSideMenu UserData={userData}/>
            <Outlet/>
        </div>
    );
};

export default LayoutPage;
