import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button, makeStyles } from "@material-ui/core";

import Constants from "../../Shared/Constants";

import IconTextInput from "../../Components/Inputs/IconTextInput";
import ErrorDialog from "../../Components/Dialogs/ErrorDialog";
import HeaderBar from '../../Components/HeaderBar';

const useStyles = makeStyles({
    headerBar: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "auto",
        padding: "1em",
        backgroundColor: `#${Constants.White}`,
    },
    loginTextInput: {
        width: "12rem",
    },
    loginButton: {
        position: "relative",
        width: "4em",
    },
});

const loginButtonStyle = {
    height: "40px",
    textTransform: "capitalize",
    fontFamily: Constants.FontFamily,
    fontWeight: 600,
    fontSize: "120%",
    color: `#${Constants.White}`,
    backgroundColor: `#${Constants.Green}`,
};

const loginContainerStyle = {
    boxShadow: Constants.BoxShadow
};

const signUpTextStyle = {
    color: `#${Constants.Yellow}`
};

const LoginForm = () => {
    // Material UI Styles
    const classes = useStyles();
    const navigate = useNavigate();
    const [userLocation, setUserLocation] = useState(null);
    
    /**
     ** The username 
     */
    const [loginUsername, setUsername] = useState("");
    /**
     ** On username changed event  
     */ 
     const OnUsernameChanged = (event) => {
        setUsername(event.target.value);
    };

    /**
     ** The password 
     */
    const [loginPassword, setPassword] = useState("");
    /**
     ** On password changed event
     */
    const OnPasswordChanged = (event) => {
        setPassword(event.target.value);
    };

    /**
     ** A flag indicating whether the login is successful 
     */
    const [isCorrectLogin, setIsCorrectLogin] = useState(true);
    
    /**
     ** A flag indicating whether the error dialog is open
     */
    const [isOpen, setIsOpen] = useState(false);
    const IsOpenHandler = () => setIsOpen(!isOpen);
    
    /**
     ** A flag indicating whether the error dialog for empty inputs is open
     */
    const [isEmptyInputsOpen, setIsEmptyInputsOpen] = useState(false);
    const IsEmptyInputsOpenHandler = () => setIsEmptyInputsOpen(!isEmptyInputsOpen);
    
    /**
     ** Logs in a user and navigates to the home page if it is a user and to the point of interest page for the admin 
     */
    const Login = async () => {
        // If any input is empty...
        if (loginUsername === "" || loginPassword === "") {
            // Opens the empty input dialog
            IsEmptyInputsOpenHandler();
            return;
        } 
        // Try...
        try 
        {
            // Gets the users form the data base
            const responseOne = await axios.get(`/api/myMaps/users`);
            // Gets the admins form the data base
            const responseTwo = await axios.get(`/api/MyMaps/admins`);
            
            // The json data from the response
            let users = responseOne.data;
            let admins = responseTwo.data;
            
            // If a user with the given credentials exists...
            if (users.find(x => x.username === loginUsername && x.password === loginPassword)) 
            {
                // Gets the data of the user
                var userData = users.find(x => x.username === loginUsername && x.password === loginPassword);  
                // Navigates tot he user's home page and sets in the location and user data
                navigate(`users/${userData.id}/home`, {state: { userData : userData, userLocation: {"lat" : userLocation.lat, "lng" : userLocation.lng} }}); 
            } 
            // Else if an admin with the given credentials exists...
            else if(admins.find(x => x.username === loginUsername && x.password === loginPassword)) {
                // Gets the data from the admin                
                var adminData = admins.find(x => x.username === loginUsername && x.password === loginPassword);
                // Navigates to the points of interest page and sets in the location the admin's data
                navigate(`admins/${adminData.id}/pointsOfInterest`, {state: { adminData : adminData }});
            } 
            // Else...
            else 
            {
                // Sets the login as unsuccessful    
                setIsCorrectLogin(false);
                // Opens the dialog
                IsOpenHandler();
            }
        }
        // Catch if there is an error...
        catch (error) 
        {
            // Sets the login as unsuccessful    
            setIsCorrectLogin(false);
            // Opens the dialog
            IsOpenHandler();
        }
    };

    /**
     ** On initialized
     */
    useEffect(() => {
        // If the user location is not set...
        if(userLocation === null)
        {
            // Gets the user's position
            navigator.geolocation.getCurrentPosition(function(position) {
                //setUserLocation({"lat" : position.coords.latitude, "lng" : position.coords.longitude})
                setUserLocation({"lat" : 38.249669, "lng" : 21.7373873})
            });
        }
    });

    return (
        <>
            <HeaderBar />

            <div className="loginPageContainer">
                <div className="loginBackground" />
                <div className="loginPage" style={loginContainerStyle}>
                    <div className="loginText">
                        <h2>Login</h2>
                    </div>
                    <div className="loginUsername">
                        <div className={classes.loginTextInput}>
                            <IconTextInput
                                Text={loginUsername}
                                OnTextChanged={OnUsernameChanged}
                                Size="small"
                                Hint="username"
                                VectorSource={Constants.Account}
                                VectorColor={Constants.LightBlue}
                            />
                        </div>
                    </div>
                    <div className="loginPassword">
                        <div className={classes.loginTextInput}>
                            <IconTextInput
                                Text={loginPassword}
                                OnTextChanged={OnPasswordChanged}
                                variant = "outlined"
                                Size="small"
                                Hint="password"
                                VectorSource={Constants.KeyVariant}
                                VectorColor={Constants.LightBlue}
                                Type={'password'}
                            />
                        </div>
                    </div>
                    <div className="loginButton">
                        <Button
                            variant="contained"
                            className={classes.headerButton}
                            style={loginButtonStyle}
                            onClick={Login}>
                            Login
                        </Button>

                        <ErrorDialog
                            Text={"Please fill out every input and try again!"}
                            IsOpen={isEmptyInputsOpen}
                            IsOpenHandler={IsEmptyInputsOpenHandler}
                            VectorSource={Constants.AccountCircle}
                        />

                        <ErrorDialog
                            Text={"Wrong Username or Password. Please try again!"}
                            IsOpen={isOpen}
                            IsOpenHandler={IsOpenHandler}
                            VectorSource={Constants.AccountCircle}
                        />
                    </div>
                    <div className="signupTextChange">
                        <Link style={signUpTextStyle} 
                              to={"/sign-up"}>
                            Don't have an account? Sign up
                        </Link> 
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
