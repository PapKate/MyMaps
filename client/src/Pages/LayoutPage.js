import { makeStyles } from "@material-ui/core";

import { useLocation, Outlet } from "react-router-dom";

import Constants from "../Shared/Constants";
import UserSideMenu from "../Components/SideMenus/UserSideMenu";
import AdminSideMenu from "../Components/SideMenus/AdminSideMenu";

const useStyles = makeStyles({
    pageContainer: {
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        backgroundColor: `#${Constants.White}`,
        gap: "2em",
        overflow: "scroll"
    }
});

const LayoutPage = () => {
    // Material UI Styles
    const classes = useStyles();

    const location = useLocation();

    let { userData } = location.state;

    return (
        <div className="page">
            {userData == null 
            ?
            (
                <AdminSideMenu />
            )
            :
            (
                <UserSideMenu />
            )}
            <div className={classes.pageContainer}>
                <Outlet/>
            </div>
        </div>
    );
};

export default LayoutPage;
