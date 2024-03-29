import { makeStyles } from '@material-ui/core';

import Constants from "../Shared/Constants";

const useStyles = makeStyles({
    headerBar: {
        position: 'sticky',
        top: 0,
        left: 0,
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '4rem',
        padding: '0 1em',
        zIndex: 10,
        backgroundColor: `#${Constants.LightBlue}`,
        boxShadow: Constants.BoxShadow
    }
});



const HeaderBar = ({ Username }) => {
    // Material UI Styles
    const classes = useStyles();

    return(
        <div className={classes.headerBar}>
            <div className="headerLogoAndTitle">
                <img className="headerLogo" src={"/icons/infection.png"} alt="logo"/>
                <div className="headerTitle">MyMaps</div>
            </div>
            {Username ? (
                <div className="headerLogoAndTitle">
                    <div className="headerUsername">{Username}</div>
                    <img className="headerLogo" src={"/icons/user.png"} alt="user"/>
                </div>
            ) : (
                <div></div>
            )} 
        </div>
    );
};

export default HeaderBar;