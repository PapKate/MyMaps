import { Box, makeStyles } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios, { Axios } from 'axios'
import { useLocation } from "react-router-dom";

import Constants from "../../Shared/Constants";
import { point } from "leaflet";
import { useGridStrategyProcessing } from "@mui/x-data-grid/hooks/core/strategyProcessing";


const useStyles = makeStyles({
  covidExposurePageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: `#${Constants.White}`,
  },
  covidExposureDataGridArea: {
    position: "relative",
    width: "100%",
    height: "max-content",
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
});

const dataGridAreaStyle = {
  position: "relative",
  width: "100%",
  height: "max-content",
  display: "flex",
  flexDirection: "row",
  paddingBottom: "2em",
  gap: "2em",
  justifyContent: "space-evenly",
  alignItems: "center",
  margin: '4em'
};

const CovidExposurePage = ({ UserId }) => {
  // Material UI Styles
  const classes = useStyles();

  const location = useLocation();
  
  const { userData } = location.state;

  const [exposure, setExposure] = useState([]);
  const [cases, setCases] = useState([]);
 
  useEffect(async () => {
    try {
      var responseConfirmedCases = await axios.get(`/api/myMaps/confirmedCases/caseWasHere`)

      const pointsCheckIns = responseCheckIns.data;
      const confirmedCasesCheckIns = responseConfirmedCases.data;

      // ta check ins
      console.log("check ins")
      console.log(pointsCheckIns);

      // ta krousmata me tis topothesies pou ekanan check in
      console.log("krousmata kai to pou ekanan check in")
      console.log(confirmedCasesCheckIns);

      let helpMe = [];
      let helpMeVol2 = [];

      pointsCheckIns.forEach(pointsCheckIn => {
        if(pointsCheckIn.userId === userData.id){
          helpMe.push({"id": pointsCheckIn.id, "name": pointsCheckIn.name, "my check in date": pointsCheckIn.checkInDate})
        }
      })

      confirmedCasesCheckIns.forEach(confirmedCasesCheckIn => {
        if(confirmedCasesCheckIn.userId !== userData.id){
          helpMeVol2.push({"id": confirmedCasesCheckIn.id, "case date": confirmedCasesCheckIn.checkInDate})
        }
      })

      console.log(helpMeVol2)

      console.log(helpMe);
    
    } catch(error) {
      console.log(error);
    }   
  },[]);

  const covidExposureDatagridColumns = [
    {
      field: "date",
      headerName: "Date",
      width: 70,
      flex: 1,
      editable: false,
      headerClassName: "covidExposureDatagridHeader",
      headerAlign: "center",
    },
    {
      field: "place",
      headerName: "Place",
      width: 80,
      flex: 1,
      editable: false,
      headerClassName: "covidExposureDatagridHeader",
      headerAlign: "center",
    },
    // {
    //   field: "time",
    //   headerName: "Time",
    //   type: "time",
    //   width: 80,
    //   flex: 1,
    //   headerClassName: "covidExposureDatagridHeader",
    //   headerAlign: "center",
    //   editable: false,
    // },
    // {
    //   field: "caseWasHere",
    //   headerName: "Case was here",
    //   type: "time",
    //   width: 80,
    //   flex: 1,
    //   headerClassName: "covidExposureDatagridHeader",
    //   headerAlign: "center",
    //   editable: false,
    // },
  ];

  const casesDatagridColumns = [
    {
      field: "date",
      headerName: "Date",
      width: 70,
      flex: 1,
      editable: false,
      headerClassName: "covidExposureDatagridHeader",
      headerAlign: "center",
    },
  ];



  return (
    <div className={classes.covidExposurePageContainer}>
      <div className={classes.covidExposureDataGridArea}>
       <div className="DataGridArea" style={dataGridAreaStyle}>
          <Box
            sx={{
              width: 800,
              position: "center",
              height: 640,
              "& .covidExposureDatagridHeader": {
                backgroundColor: `#${Constants.Yellow}`,
                color: `#${Constants.White}`,
                fontFamily: Constants.FontFamily,
                fontWeight: 400,
                fontSize: "140%",
              },
            }}
          >
            <DataGrid rows={exposure} columns={covidExposureDatagridColumns} />
            <DataGrid rows={cases} columns={casesDatagridColumns} />
          </Box>
      </div>
    </div>
  </div>

  );
};

export default CovidExposurePage;
