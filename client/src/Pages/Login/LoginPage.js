import { useState } from "react";
import axios from 'axios';
import { Button, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import TextInput from "../../Components/Inputs/TextInput";


const fs = require('fs');
const http = require('http');

const theme = createTheme({
    palette: {
        primary: {
          light: '#9cc9e1',
          main: '#84BCDA',
          dark: '#5c8398',
          contrastText: '#F5F5F5',
        },
        secondary: {
          light: '#f4cd71',
          main: '#F2C14E',
          dark: '#a98736',
          contrastText: '#F5F5F5',
        }
        
    },
});

const marginStyle = {
    margin: '2em'
  };
  
  const flexContainerStyle = {
    display: 'flex'
  };

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const OnUsernameChanged = event => {
        setUsername(event.target.value);
    };

    const OnPasswordChanged = event => {
        setPassword(event.target.value);
    };

    return(
      <div className="loginPageContainer">
        <div className="loginBackground" />
        <div className="loginPage">
                <div className="loginText">
                <label>Login</label>
                </div>
                <div className="loginUsername">
                <TextInput Text={username}   
                          OnTextChanged={OnUsernameChanged}     
                          HasFullWidth={true}
                          Hint={"Username"} />
                </div>
                <div className="loginPassword">
                <TextInput Text={password}   
                          OnTextChanged={OnPasswordChanged}       
                          HasFullWidth={true}
                          Hint={"Password"} />
                </div>
                <div className="loginButton">
                <Button color="secondary" 
                        variant="contained"
                        >
                  Login
                </Button>
                </div>
              </div> 
      </div>

    );
};

export default LoginPage;
