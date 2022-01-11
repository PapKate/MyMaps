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

const PointsOfInterestPage = () => {

    const [filePath, setFilePath] = useState("");
        
    // On text changed event
    const OnFilePathChanged = event => {
        setFilePath(event.target.value);
    };

    const GetFile = async () => {
      const test = "test";
      try {
      const jsonData = await axios({
        method: 'POST',
        url: `/api/myMaps/file`,
        data:{
          path: filePath
        },
        cancelToken: new axios.CancelToken((c) => (console.log(c))),
      }); 

      console.log(jsonData)
    
      }catch(error) {
        console.log(error);
    }
      // jsonData.forEach(x => {
      //   var id = x.id;
      //   var name = x.name;

      //   var types = x.types;
      //   types.forEach(type =>{
      //       // Get all types 
      //       var typeName = type;
      //       // Check if type exists in types...
      //       // if not ...
      //       // Call the database to create a new type
      //   });

      //   var coordinates = x.coordinates;
      //   var lat = x.coordinates.lat;

      // });
    

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
