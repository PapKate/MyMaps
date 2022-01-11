import { useState } from "react";
import { ThemeProvider, makeStyles } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import axios from 'axios'

import Constants from "../../Shared/Constants";
import TextInput from "../../Components/Inputs/TextInput";
import TextButton from "../../Components/Buttons/TextButton";
import VectorButton from "../../Components/Buttons/VectorButton";
import MessageDialog from "../../Components/Dialogs/MessageDialog";

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

const useStyles = makeStyles({
  itemDisplayFlexContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: '1em'
  },
  deleteButtonContainer: {
    position: "fixed",
    bottom: '1rem',
    right: '1rem'
  }
});

const marginStyle = {
    margin: '2em'
  };
  
  
const PointsOfInterestPage = () => {
  // Material UI Styles
  const classes = useStyles();

  const [filePath, setFilePath] = useState("");
  // On text changed event
  const OnFilePathChanged = event => {
      setFilePath(event.target.value);
  };

  const [deleteDialog_IsOpen, deleteDialog_SetIsOpen] = useState(false);
  const DeleteDialog_IsOpenHandler = () => deleteDialog_SetIsOpen(!deleteDialog_IsOpen);

  const DeletePointsOfInterestOnClick = () =>
  {
    DeleteDialog_IsOpenHandler();
    console.log("delete? :(")
  }

  const AddPointsOfInterestFromJSONFile = async() => {
    try {
      const response = await axios.post(`/api/myMaps/file`, {
        path : filePath
      });

      // The json data from the response
      let jsonData = response.data;

      console.log(jsonData);
      
    } 
    catch (error) {
      console.log(error)
    }
   
  }

  return(
    <div className="pointsOfInterestPage">
        <ThemeProvider theme={theme}>
          <div style={marginStyle}>
            <div className={classes.itemDisplayFlexContainer}>
              <TextInput Text={filePath} 
                        OnTextChanged={OnFilePathChanged} 
                        HasFullWidth={true}
                        Hint={"File path"} />
              <TextButton Text={"Add"} BackColor={Constants.Yellow}
                          OnClick={AddPointsOfInterestFromJSONFile} />
            </div>
          </div>
          <div style={marginStyle}>
            {/* Data Grid */}
          </div>
          <div className={classes.deleteButtonContainer}>
              <VectorButton Size="3.5rem" 
                          BackColor={Constants.Red}
                          VectorSource={Constants.Delete}
                          OnClick={DeletePointsOfInterestOnClick} />
          </div>

          <MessageDialog  Title={"Delete"}
                            Text={"Are you sure you want to delete all points of interest?"}
                            IsOpen={deleteDialog_IsOpen} 
                            IsOpenHandler={DeleteDialog_IsOpenHandler}
                            VectorSource={Constants.Delete}
                            Color={Constants.Red}
                            BackColor={Constants.VeryLightRed}
                            YesOnClick={()=> { DeleteDialog_IsOpenHandler(); console.log("Yes!"); }}
                            NoOnClick={()=> { DeleteDialog_IsOpenHandler(); console.log("No!"); }}/>
        </ThemeProvider>
    </div>
  );
};

export default PointsOfInterestPage;
