import { useEffect, useState } from "react";
import { Box, Button, ThemeProvider, makeStyles } from '@material-ui/core';


import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from '@material-ui/core/styles';
import axios, { Axios } from 'axios'

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

  const [filePath, setFilePath] = useState("");
  // On text changed event
  const OnFilePathChanged = event => {
      setFilePath(event.target.value);
  };

  const [deleteDialog_IsOpen, deleteDialog_SetIsOpen] = useState(false);
  const DeleteDialog_IsOpenHandler = () => deleteDialog_SetIsOpen(!deleteDialog_IsOpen);

  const DeletePointsOfInterest = async() => {
    try {
      await axios.delete(`/api/myMaps/pointAndTypes`);
      await axios.delete(`/api/myMaps/popularTimes`);
      await axios.delete(`/api/myMaps/pointCheckIns`);
      await axios.delete(`/api/myMaps/points`);
    
    } catch (error) {
        console.log(error)
    }
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

    setFilePath("");
 }


const [pointsName, setPointsName] = useState([]);

 useEffect(async () => {
  try {
    var response = await axios.get(`/api/myMaps/points/types`);

    const pointsTypes = response.data;

    let pointNames = [];
    pointsTypes.forEach(pointType => {
      
      pointNames.push({"id": pointType.id, "name": pointType.name, "address": pointType.address, "categories": pointType.categories});
    })
    setPointsName(pointNames);
  
  } catch(error) {
    console.log(error);
  }   
},[]);

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
