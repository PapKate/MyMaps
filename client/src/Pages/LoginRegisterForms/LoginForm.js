import axios from "axios";
import { useState } from "react";
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

const LoginForm = ({ SetChildToParentUserId }) => {
    // Material UI Styles
    const classes = useStyles();
    const navigate = useNavigate();

    const [loginUsername, setUsername] = useState("");
    const [loginPassword, setPassword] = useState("");
    const [isSuccessfulLogin, setIsSuccessfulLogin] = useState(false);
    const [isCorrectLogin, setIsCorrectLogin] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

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
                const response = await axios.get(`/api/myMaps/users`);
                // The json data from the response
                let users = response.data;

                var userData = users.find(x => x.username === loginUsername && x.password === loginPassword);
               
                SetChildToParentUserId(userData.id);

                navigate(`user/${userData.id}/profile`, {state: { userData : JSON.stringify(userData) }});
            } catch (error) {
                setIsCorrectLogin(false);
                console.log(isCorrectLogin);
                IsOpenHandler();
            }
        }
    };

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
                                Size="small"
                                Hint="password"
                                VectorSource={Constants.KeyVariant}
                                VectorColor={Constants.LightBlue}
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
