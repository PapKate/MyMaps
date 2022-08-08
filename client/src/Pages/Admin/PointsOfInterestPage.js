import { useEffect, useState } from "react";
import { Box, Button, ThemeProvider, makeStyles } from '@material-ui/core';


import { DataGrid } from "@mui/x-data-grid";
import { createTheme } from '@material-ui/core/styles';
import axios, { Axios } from 'axios'

import Constants from "../../Shared/Constants";
import TextInput from "../../Components/Inputs/TextInput";
import TextButton from "../../Components/Buttons/TextButton";
import VectorButton from "../../Components/Buttons/VectorButton";
import MessageDialog from "../../Components/Dialogs/MessageDialog";
import AdminSideMenu from "../../Components/SideMenus/AdminSideMenu";
import { sizeWidth, width } from "@mui/system";
import { point } from "leaflet";

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

  // const DeletePointsOfInterestOnClick = () => {}
  // {
  //   DeleteDialog_IsOpenHandler();
  //   console.log("delete? :(")
  // }

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
    var response = await axios.get(`/api/myMaps/points`);


    const points = response.data;
    const pointAndTypes = responsePointAndType.data;
    const types = responseType.data;

    console.log(points);
    console.log(pointAndTypes);
    console.log(types);
    
    let pointTypes = [];
    let typeList = [];

    points.forEach(point => {
      if(point.id === pointAndTypes.pointId) {
        typeList.push()
      } else
      {
        typeList.push({"name":pointAndTypes.name});
        pointTypes.push({"id": point.id, "type": typeList.name});
      }
    })

    let pointNames = [];
    points.forEach(point => {
      
      pointNames.push({"id": point.id, "name": point.name, "address": point.address, "categories": pointAndTypes.name});
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
              <TextInput Text={filePath} 
                        OnTextChanged={OnFilePathChanged} 
                        HasFullWidth={true}
                        Hint={"File path"} />
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
                          />
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
