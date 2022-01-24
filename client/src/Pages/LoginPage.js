import { useState, useEffect } from "react";

import { Button, makeStyles } from '@material-ui/core';

import Constants from "../Shared/Constants";
import LoginForm from "./Pages/LoginRegisterForms/LoginForm";
import SignupForm from "./Pages/LoginRegisterForms/SignupForm";

const useStyles = makeStyles({
    headerBar: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 'auto',
        padding: '1em',
        backgroundColor: `#${Constants.White}`,
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


const LoginPage = () => {
    // // Material UI Styles
    // const classes = useStyles();

    // const [isLogInVisible, setIsLogInVisible] = useState(true);
    // const SetIsLogInVisible = () => setIsLogInVisible(!isLogInVisible);
  
    // useEffect(() => {
    //     SetIsLogInVisible()
    // },[isLogInVisible]) 

    // return(
    //     <div>
    //         {isLogInVisible ? (
    //             <LoginForm SignUpOnClick={SetIsLogInVisible}/>
    //         ) : (
    //             <SignupForm LoginOnClick={SetIsLogInVisible}/>
    //         )}
    //     </div>
    // );
};

export default LoginPage;