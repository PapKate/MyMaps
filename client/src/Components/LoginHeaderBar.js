import { useState } from "react";

import { Button, makeStyles } from '@material-ui/core';

import Constants from "../Shared/Constants";
import IconTextInput from "./Inputs/IconTextInput";

const useStyles = makeStyles({
    headerBar: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '4rem',
        padding: '0 1em',
        zIndex:2,
        backgroundColor: `#${Constants.LightBlue}`,
        boxShadow: Constants.BoxShadow
    }
});


const LoginHeaderBar = ({ ImageSource, Title}) => {
    // Material UI Styles
    const classes = useStyles();

    return(
        <div className={classes.headerBar}>
            <div className="headerLogoAndTitle">
                <img className="headerLogo" src={ImageSource} alt="logo"/>
                <div className="headerTitle">{Title}</div>
            </div>
        </div>
    );
};

export default LoginHeaderBar;