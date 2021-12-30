import { useState } from "react";


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

const PointsOfInterestPage = () => {

    const [filePath, setFilePath] = useState("");
        
    // On text changed event
    const OnFilePathChanged = event => {
        setFilePath(event.target.value);
    };

    const GetFile = async () => {
      
    }

    return(
      <div className="pointsOfInterestPage">
          <ThemeProvider theme={theme}>
            <div style={marginStyle}>
              <div style={flexContainerStyle}>
                <TextInput Text={filePath} 
                          OnTextChanged={OnFilePathChanged} 
                          HasFullWidth={true}
                          Hint={"File path"} />
                <Button color="secondary" 
                        variant="contained"
                        onClick={GetFile}>
                  Enter
                </Button>
              </div>
            </div>
          </ThemeProvider>
      </div>
    );
};

export default PointsOfInterestPage;
