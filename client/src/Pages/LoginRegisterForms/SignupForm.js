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

    const [signUpUsername, setUsername] = useState("");
    const [signUpPassword, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isSuccessfulSignUp, setIsSuccessfulSignUp] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isDifferentPasswordsOpen, setIsDifferentPasswordsOpen] = useState(false);
    const [isWrongPasswordOpen, setIsWrongPasswordOpen] = useState(false);
    const [isUsernameInUseOpen, setIsUsernameInUseOpen] = useState(false);
    
    // On username changed event
    const OnUsernameChanged = event => {
        setUsername(event.target.value);
    };

    // On password changed event
    const OnPasswordChanged = event => {
        setPassword(event.target.value);
    };

    // On confirm password changed event
    const onConfirmPasswordChanged = event => {
        setConfirmPassword(event.target.value);
    };

    // Password Regex
    const passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$");

    // On email changed event
    const OnEmailChanged = event => {
        setEmail(event.target.value);
    };

    const IsOpenHandler = () => setIsOpen(!isOpen);

    const IsDifferentPasswordsOpenHandler = () => setIsDifferentPasswordsOpen(!isDifferentPasswordsOpen);
    
    const IsWrongPasswordOpenHandler = () => setIsWrongPasswordOpen(!isWrongPasswordOpen);

    const IsUsernameInUseOpenHandler = () => setIsUsernameInUseOpen(!isUsernameInUseOpen);

    const SignUp = async () => {

        if(!passwordRegex.test(signUpPassword)) 
        {
            IsWrongPasswordOpenHandler();
            return;
        }
        if (confirmPassword !== signUpPassword) 
        {
            IsDifferentPasswordsOpenHandler();
            return;
        } 
        if(signUpUsername === "" || signUpPassword === "" || email === "") 
        {
            IsOpenHandler();
            return;
        }   
        try 
        {
            const responseCheck = await axios.get(`/api/myMaps/users`);

            let usersCheck = responseCheck.data;
        
            if(usersCheck.find(x => x.username === signUpUsername)) 
            {
                IsUsernameInUseOpenHandler();
                return;
            } 
            else 
            {
                try 
                {
                    const response = await axios.post(`/api/myMaps/users`, {
                    username: signUpUsername,
                    email: email,
                    password: signUpPassword
                    });
            
                    setIsSuccessfulSignUp(true);
                }
                catch (error) 
                {
                    console.log(error);
                }
                
                navigate(`/`);
            }
        } 
        catch(error) 
        {
            setIsSuccessfulSignUp(false);
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