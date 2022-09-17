import { useEffect, useState } from "react";
import { Box, Button, ThemeProvider, makeStyles } from '@material-ui/core';


import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from '@material-ui/core/styles';
import axios from 'axios'

import Constants from "../../Shared/Constants";
import IconTextInput from "../../Components/Inputs/IconTextInput";
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
  databaseButtonContainer: {
    position: "absolute",
    bottom: '1rem',
    left: '1rem'
  },
  deleteButtonContainer: {
    position: "fixed",
    bottom: '1rem',
    right: '1rem'
  },
  pointsOfInterestDataGridsArea: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    paddingBottom: "2em",
    gap: "2em",
    justifyContent: "space-evenly",
    alignItems: "center",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
    },
  },
  PointsOfInterestLogTitle: {
    position: "relative",
    width: "100%",
    height: "auto",
    fontSize: "180%",
    fontWeight: "600",
    color: `#${Constants.White}`,
    fontFamily: Constants.FontFamily,
    textAlign: "center",
    display: "block",
    padding: "4px 0",
    borderRadius: "8px 8px 0 0",
    backgroundColor: `#${Constants.Gray}`,
  },
});

const dataGridAreaStyle = {
   width: "100%"
};

const marginStyle = {
    margin: '2em'
  };
  
  
const PointsOfInterestPage = () => {
  // Material UI Styles
  const classes = useStyles();

  // The file path
  const [filePath, setFilePath] = useState("");
  // On text changed event
  const OnFilePathChanged = event => {
      setFilePath(event.target.value);
  };

  // A flag indicating whether the delete data dialog is open
  const [deleteDialog_IsOpen, deleteDialog_SetIsOpen] = useState(false);
  const DeleteDialog_IsOpenHandler = () => deleteDialog_SetIsOpen(!deleteDialog_IsOpen);

  const [pointsName, setPointsName] = useState([]);

  /**
   ** Deletes all the points of interest from the database
   */ 
  const DeletePointsOfInterest = async() => {
    // Try ...
    try 
    {
      // Deletes all the point and type pairs from the database
      await axios.delete(`/api/myMaps/pointAndTypes`);
      // Deletes all the popular times from the database
      await axios.delete(`/api/myMaps/popularTimes`);
      // Deletes all the points from the database
      await axios.delete(`/api/myMaps/points`);
    }
    // Catch if there is an error...
    catch (error) 
    {
      // Prints the error to the console
      console.log(error);
    }
  }
 
  /**
   ** Adds the dummy data to the database 
   */
  const AddDataToDatabase = async () => {
    // Try ...
    try 
    {
      await axios.post(`/api/myMaps/database`, {
        N: 10
      });
    }
    // Catch if there is an error...
    catch (error)
    {
      // Prints the error to the console
      console.log(error);
    }
  }

  /**
   ** Gets and formats the point and types for the rows of the datagrid
   */
  const PointAndTypesFormattedForTheDatagrid = async() => {
    // Gets the response of all the point and type pairs from the data base
    var response = await axios.get(`/api/myMaps/points/types`);

    // Gets the point and type pairs from the response
    const pointsTypes = response.data;
    // Creates an array for the names of all the point of interest
    let pointNames = [];
    // For each point and type pair...
    pointsTypes.forEach(pointType => {
      // Add to the list the formatted string for the rows of the datagrid
      pointNames.push({"id": pointType.id, "name": pointType.name, "address": pointType.address, "categories": pointType.categories});
    })
    // Sets as point the list
    setPointsName(pointNames);
  }

  /**
   ** Adds the points from the given JSON file path 
   */
  const AddPointsOfInterestFromJSONFile = async() => {
    // Try...
    try 
    {
      // Calls the end point for the file with the filepath in the request's body 
      await axios.post(`/api/myMaps/file`, {
        path : filePath
      });

      await PointAndTypesFormattedForTheDatagrid();
    } 
    // Catch if there is an error...
    catch (error)
    {
      // Prints the error to the console
      console.log(error)
    }
    // Empties the text from the input
    setFilePath("");
 }


  /**
   ** On initialized 
  */
  useEffect(async () => {
    // Try...
    try 
    {
      // Gets and formats the point and types for the rows of the datagrid
      await PointAndTypesFormattedForTheDatagrid();
    } 
    // Catch if there is an error...
    catch(error) 
    {
      // Prints the error to the console
      console.log(error);
    }   
  },[]);

  /**
   ** The columns of the points of interest datagrid 
   */
  const pointsOfInterestLogColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: false,
      headerClassName: "pointsOfInterestLogHeader",
      headerAlign: "center",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      editable: false,
      headerClassName: "pointsOfInterestLogHeader",
      headerAlign: "center",
    },
    {
      field: "categories",
      headerName: "Categories",
      flex: 1,
      editable: false,
      headerClassName: "pointsOfInterestLogHeader",
      headerAlign: "center",
    }
  ];

  return(
     <div className="pointsOfInterestPage">
        <ThemeProvider theme={theme}>
          <div style={marginStyle}>
            <div className={classes.itemDisplayFlexContainer}>
              <IconTextInput Text={filePath} 
                        OnTextChanged={OnFilePathChanged} 
                        HasFullWidth={true}
                        Hint={"File path"} 
                        VectorSource={Constants.JSON}
                        VectorColor={Constants.LightBlue}/>
              <TextButton Text={"Add"} BackColor={Constants.Yellow}
                          OnClick={AddPointsOfInterestFromJSONFile} />
            </div>
          </div>
          <div style={marginStyle}>
            <div className={classes.pointsOfInterestDataGridsArea}>
              <div className="DataGridArea" style={dataGridAreaStyle}>           
                <span className={classes.PointsOfInterestLogTitle}>Points Of Interest Log</span>
                <Box
                  sx={{
                    height: 640,
                    "& .pointsOfInterestLogHeader": {
                      backgroundColor: `#${Constants.LightBlue}`,
                      color: `#${Constants.White}`,
                      fontFamily: Constants.FontFamily,
                      fontWeight: 600,
                      fontSize: "140%",
                    }
                  }}
                > 
                  <DataGrid rows={pointsName} columns={pointsOfInterestLogColumns} />
                </Box>
              </div>
            </div>
          </div>
          <div className={classes.databaseButtonContainer}>
            <VectorButton Size="3.5rem" 
                        BackColor={Constants.LightBlue}
                        VectorSource={Constants.Database}
                        OnClick = {AddDataToDatabase}/>
          </div>
          <div className={classes.deleteButtonContainer}>
            <VectorButton Size="3.5rem" 
                        BackColor={Constants.Red}
                        VectorSource={Constants.Delete}
                        OnClick = {DeleteDialog_IsOpenHandler}/>
        
            <MessageDialog  Title={"Delete"}
                              Text={"Are you sure you want to delete all points of interest?"}
                              IsOpen={deleteDialog_IsOpen} 
                              IsOpenHandler={DeleteDialog_IsOpenHandler}
                              VectorSource={Constants.Delete}
                              Color={Constants.Red}
                              BackColor={Constants.VeryLightRed}
                              YesOnClick={()=> { DeleteDialog_IsOpenHandler(); DeletePointsOfInterest();}}
                              NoOnClick={()=> { DeleteDialog_IsOpenHandler(); }}/>
          </div>
        </ThemeProvider>
     </div>
  );
};

export default PointsOfInterestPage;
