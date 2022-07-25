import axios from 'axios'
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button, makeStyles } from '@material-ui/core';
import Constants from "../../Shared/Constants";
import IconTextInput from "../../Components/Inputs/IconTextInput";
import ErrorDialog from "../../Components/Dialogs/ErrorDialog";

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

    const logInTextStyle = {
        color: `#${Constants.Green}`
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isSuccessfulSignUp, setIsSuccessfulSignUp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // On username changed event
    const OnUsernameChanged = event => {
        setUsername(event.target.value);
    };

    // On password changed event
    const OnPasswordChanged = event => {
        setPassword(event.target.value);
    };

    // On email changed event
    const OnEmailChanged = event => {
        setEmail(event.target.value);
    };

    const IsOpenHandler = () => setIsOpen(!isOpen);

    const SignUp = async () => {
        if (username === "" || password === "" || email === "") {
            IsOpenHandler();
        }
        else {
            setIsSuccessfulSignUp(true);

            try {
                const response = await axios.post(`/api/myMaps/users`, {
                    username: username,
                    email: email,
                    password: password
                });

                let user = response.data;

                console.log(user);
            }
            catch (error) {
                console.log(error)
            }

            console.log(isSuccessfulSignUp);
        }
    }

    return (
        <>
            <div className="loginPageContainer">
                <div className="loginBackground" />
                <div className="loginPage" style={loginContainerStyle}>
                    <div className="signupText">
                        <h2>Register</h2> </div>
                    <div className="signupUsername">
                        <div className={classes.signupTextInput}>
                            <IconTextInput Text={username} OnTextChanged={OnUsernameChanged}
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
                            <IconTextInput Text={password} OnTextChanged={OnPasswordChanged}
                                Size="small"
                                Hint="password"
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
                            onClick={SignUp}>Signup</Button>

                        <ErrorDialog Text={"Error! Please fill out every input and try again!"}
                            IsOpen={isOpen}
                            IsOpenHandler={IsOpenHandler}
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