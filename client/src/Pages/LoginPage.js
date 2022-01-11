import { useState } from "react";

import { Button, makeStyles } from '@material-ui/core';

import Constants from "../Shared/Constants";
import IconTextInput from "../Components/Inputs/IconTextInput";
import ErrorDialog from "../Components/Dialogs/ErrorDialog";

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
    // Material UI Styles
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSuccessfulLogin, setIsSuccessfulLogin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    // On username changed event
    const OnUsernameChanged = event => {
        setUsername(event.target.value);
    };

    // On password changed event
    const OnPasswordChanged = event => {
        setPassword(event.target.value);
    };

   const IsOpenHandler = () => setIsOpen(!isOpen);


    const Login = () => {
        if(username === "" || password === "")
        IsOpenHandler();
        else
            setIsSuccessfulLogin(true);

        console.log(isSuccessfulLogin);
    }

    return(
        <div className={classes.headerBar}>
           
                <div className={classes.headerBar}>
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

                    <ErrorDialog Text={"Error! Please fill out every input and try again!"}
                        IsOpen={isOpen} 
                        IsOpenHandler={IsOpenHandler}
                        VectorSource={Constants.AccountCircle}
                        />
                </div>
                
        </div>
    );
};

export default LoginPage;