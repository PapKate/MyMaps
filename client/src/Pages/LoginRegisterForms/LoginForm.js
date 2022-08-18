import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Button, makeStyles } from "@material-ui/core";
import Constants from "../../Shared/Constants";
import IconTextInput from "../../Components/Inputs/IconTextInput";
import ErrorDialog from "../../Components/Dialogs/ErrorDialog";

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

    const [loginUsername, setUsername] = useState("");
    const [loginPassword, setPassword] = useState("");
    const [isSuccessfulLogin, setIsSuccessfulLogin] = useState(false);
    const [isCorrectLogin, setIsCorrectLogin] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [userLocation, setUserLocation] = useState(null);

    // On username changed event
    const OnUsernameChanged = (event) => {
        setUsername(event.target.value);
    };

    // On password changed event
    const OnPasswordChanged = (event) => {
        setPassword(event.target.value);
    };

    const IsOpenHandler = () => setIsOpen(!isOpen);

    const Login = async () => {
        if (loginUsername === "" || loginPassword === "") {
            IsOpenHandler();
        } else {
            setIsSuccessfulLogin(true);

            try {
                const responseOne = await axios.get(`/api/myMaps/users`);
                const responseTwo = await axios.get(`/api/MyMaps/admins`);

                // The json data from the response
                let users = responseOne.data;
                let admins = responseTwo.data;
               
                if (users.find(x => x.username === loginUsername && x.password === loginPassword)) {

                    var userData = users.find(x => x.username === loginUsername && x.password === loginPassword);  

                    navigate(`users/${userData.id}/home`, {state: { userData : userData, userLocation: {"lat" : 38.246, "lng" : 21.734} }}); 
                } 
                else if(admins.find(x => x.username === loginUsername && x.password === loginPassword)) {

                    var adminData = admins.find(x => x.username === loginUsername && x.password === loginPassword);

                    navigate(`admins/${adminData.id}/pointsOfInterest`, {state: { adminData : adminData }});
                } 
                else {

                    setIsCorrectLogin(false);
                    console.log(isCorrectLogin);
                    IsOpenHandler();
                }
            } catch (error) {
                setIsCorrectLogin(false);
                console.log(isCorrectLogin);
                IsOpenHandler();
            }
        }
    };

    useEffect(() => {
        if(userLocation === null)
        {
            navigator.geolocation.getCurrentPosition(function(position) {
                setUserLocation({"lat" : position.coords.latitude, "lng" : position.coords.longitude})
            });
        }
    });

    return (
        <>
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
                            Text={"Error! Please fill out every input and try again!"}
                            IsOpen={isOpen}
                            IsOpenHandler={IsOpenHandler}
                            VectorSource={Constants.AccountCircle}
                        />

                        <ErrorDialog
                            Text={"Error! Wrong Username or Password try again!"}
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
