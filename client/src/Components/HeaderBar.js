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
    },
    loginTextInput: {
        width: '12rem'
    },
    loginButton: {
        position: 'relative',
        width: '4em',
    }
});

const loginButtonStyle = {
    height: '40px',
    textTransform: 'capitalize',
    fontFamily: Constants.FontFamily,
    fontWeight: 600,
    fontSize: '120%',
    color: `#${Constants.White}`,
    backgroundColor: `#${Constants.Green}`
};


const HeaderBar = ({ ImageSource, Title, Username = "username" }) => {
    // Material UI Styles
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);


    // On username changed event
    const OnUsernameChanged = event => {
        setUsername(event.target.value);
    };

    // On password changed event
    const OnPasswordChanged = event => {
        setPassword(event.target.value);
    };

    const Login = () => {
        if(username === "" || password === "")
            console.log("Please fill every input and try again!")
        else
            setIsUserLoggedIn(true);
    }

    return(
        <div className={classes.headerBar}>
            <div className="headerLogoAndTitle">
                <img className="headerLogo" src={ImageSource} alt="logo"/>
                <div className="headerTitle">{Title}</div>
            </div>
            {isUserLoggedIn ? (
                <div className="headerLogoAndTitle">
                    <div className="headerUsername">{Username}</div>
                    <img className="headerLogo" src={"/icons/avatar.png"} alt="user"/>
                </div>
            ) : (
                <div className="headerLoginArea">
                    <div className={classes.loginTextInput}>
                        <IconTextInput Text={username} OnTextChanged={OnUsernameChanged}
                            Size="small" 
                            Hint="username"
                            VectorSource={Constants.Account} 
                            VectorColor={Constants.LightBlue}/>
                    </div>
                    <div className={classes.loginTextInput}>
                        <IconTextInput Text={password} OnTextChanged={OnPasswordChanged}
                            Size="small" 
                            Hint="password"
                            VectorSource={Constants.KeyVariant} 
                            VectorColor={Constants.LightBlue}/>
                    </div>

                    <Button variant="contained" 
                            className={classes.headerButton}
                            style={loginButtonStyle}
                            onClick={Login}>Login</Button>
                </div>
             )} 
        </div>
    );
};

export default HeaderBar;