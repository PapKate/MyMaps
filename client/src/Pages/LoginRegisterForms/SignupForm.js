import axios from 'axios'
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button, makeStyles } from '@material-ui/core';

import Constants from "../../Shared/Constants";

import IconTextInput from "../../Components/Inputs/IconTextInput";
import ErrorDialog from "../../Components/Dialogs/ErrorDialog";
import HeaderBar from '../../Components/HeaderBar';

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
    signupTextInput: {
        width: '12rem'
    },
    singupButton: {
        position: 'relative',
        width: '4em',
    }
});

const signupButtonStyle = {
    height: '40px',
    textTransform: 'capitalize',
    fontFamily: Constants.FontFamily,
    fontWeight: 600,
    fontSize: '120%',
    color: `#${Constants.White}`,
    backgroundColor: `#${Constants.Yellow}`
};

const loginContainerStyle = {
    boxShadow: Constants.BoxShadow
};

const SignupForm = () => {
    // Material UI Styles
    const classes = useStyles();
    const navigate = useNavigate();

    const logInTextStyle = {
        color: `#${Constants.Green}`
    };

    /**
     ** The username 
     */
    const [signUpUsername, setUsername] = useState("");
    /**
     ** On username changed event
     */
    const OnUsernameChanged = event => {
        setUsername(event.target.value);
    };

    /**
     ** The password 
     */
    const [signUpPassword, setPassword] = useState("");
    /**
     ** On password changed event 
     */
     const OnPasswordChanged = event => {
        setPassword(event.target.value);
    };

    /**
     ** The confirm password 
     */
    const [confirmPassword, setConfirmPassword] = useState("");
    /**
     ** On confirm password changed event
     */
    const onConfirmPasswordChanged = event => {
        setConfirmPassword(event.target.value);
    };

    /**
     ** The email 
     */
    const [email, setEmail] = useState("");
    /**
     ** On email changed event
     */
    const OnEmailChanged = event => {
        setEmail(event.target.value);
    };

    /**
     ** A flag indicating whether the dialog is open
     */
    const [isOpen, setIsOpen] = useState(false);
    const IsOpenHandler = () => setIsOpen(!isOpen);
    
    /**
     ** A flag indicating whether the dialog is open
     */
    const [isDifferentPasswordsOpen, setIsDifferentPasswordsOpen] = useState(false);
    const IsDifferentPasswordsOpenHandler = () => setIsDifferentPasswordsOpen(!isDifferentPasswordsOpen);
    
    /**
     ** A flag indicating whether the dialog is open
     */
    const [isWrongPasswordOpen, setIsWrongPasswordOpen] = useState(false);
    const IsWrongPasswordOpenHandler = () => setIsWrongPasswordOpen(!isWrongPasswordOpen);
    
    /**
     ** A flag indicating whether the dialog is open
     */
    const [isUsernameInUseOpen, setIsUsernameInUseOpen] = useState(false);
    const IsUsernameInUseOpenHandler = () => setIsUsernameInUseOpen(!isUsernameInUseOpen);
    
    // Password Regex
    const passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$");

    const SignUp = async () => {

        // If the password is not in the correct form
        if(!passwordRegex.test(signUpPassword)) 
        {
            // Open the dialog
            IsWrongPasswordOpenHandler();
            // Returns
            return;
        }
        // If the two passwords do not match...
        if (confirmPassword !== signUpPassword) 
        {
            // Open the dialog
            IsDifferentPasswordsOpenHandler();
            // Returns
            return;
        } 
        // If any input is empty...
        if(signUpUsername === "" || signUpPassword === "" || email === "") 
        {
            // Open the dialog
            IsOpenHandler();
            // Returns
            return;
        }   
        // Try...
        try 
        {
            // Gets the users from the data base
            const responseCheck = await axios.get(`/api/myMaps/users`);

            let usersCheck = responseCheck.data;
        
            // If there is already a user in the database with the given username
            if(usersCheck.find(x => x.username === signUpUsername)) 
            {
                // Open the dialog
                IsUsernameInUseOpenHandler();
                // Returns
                return;
            } 
            
            // Creates the user
            await axios.post(`/api/myMaps/users`, {
                username: signUpUsername,
                email: email,
                password: signUpPassword
            });
    
            // Navigates to the login page
            navigate(`/`);
        } 
        // Catch if there is an error...
        catch(error) 
        {
            // Prints the error to the console
            console.log(error);
        }               
    }

    return (
        <>
            <HeaderBar />

            <div className="loginPageContainer">
                <div className="loginBackground" />
                <div className="loginPage" style={loginContainerStyle}>
                    <div className="signupText">
                        <h2>Register</h2> </div>
                    <div className="signupUsername">
                        <div className={classes.signupTextInput}>
                            <IconTextInput Text={signUpUsername} OnTextChanged={OnUsernameChanged}
                                Size="small"
                                Hint="username"
                                VectorSource={Constants.Account}
                                VectorColor={Constants.LightBlue} />
                        </div>
                    </div>
                    <div className="signupEmail">
                        <div className={classes.signupTextInput}>
                            <IconTextInput Text={email} OnTextChanged={OnEmailChanged}
                                Size="small"
                                Hint="email"
                                VectorSource={Constants.Email}
                                VectorColor={Constants.LightBlue} />
                        </div>
                    </div>
                    <div className="signupPassword">
                        <div className={classes.signupTextInput}>
                            <IconTextInput Text={signUpPassword} OnTextChanged={OnPasswordChanged}
                                Size="small"
                                Hint="password"
                                VectorSource={Constants.KeyVariant}
                                VectorColor={Constants.LightBlue} 
                                Type={'password'}
                                />
                        </div>
                    </div>
                    <div className="signupConfirmPassword">
                        <div className={classes.signupTextInput}>
                            <IconTextInput Text={confirmPassword} OnTextChanged={onConfirmPasswordChanged}
                                Size="small"
                                Hint="confirm password"
                                VectorSource={Constants.KeyVariant}
                                VectorColor={Constants.LightBlue} 
                                Type={'password'}
                                />
                        </div>
                    </div>
                    <div className="signupButton">
                        <Button variant="contained"
                            className={classes.headerButton}
                            style={signupButtonStyle}
                            onClick={SignUp}>Sign up</Button>

                        <ErrorDialog Text={"Please fill out every input and try again!"}
                            IsOpen={isOpen}
                            IsOpenHandler={IsOpenHandler}
                            VectorSource={Constants.AccountCircle}
                        />
                        <ErrorDialog Text={"Wrong password format! Your password must be at least 8 characters long and contain at least one number, one capital letter and a symbol."}
                            IsOpen={isWrongPasswordOpen}
                            IsOpenHandler={IsWrongPasswordOpenHandler}
                            VectorSource={Constants.AccountCircle}
                        />
                        <ErrorDialog Text={"The passwords do not match. Please try again."}
                            IsOpen={isDifferentPasswordsOpen}
                            IsOpenHandler={IsDifferentPasswordsOpenHandler}
                            VectorSource={Constants.AccountCircle}
                        />
                        <ErrorDialog Text={"The username already exists. Please try a different one."}
                            IsOpen={isUsernameInUseOpen}
                            IsOpenHandler={IsUsernameInUseOpenHandler}
                            VectorSource={Constants.AccountCircle}
                        />

                    </div>
                    <div className="loginTextChange">
                        <Link style={logInTextStyle} to="/">Already have and Account? Log in</Link> 
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupForm;