import { Box, makeStyles } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios, { Axios } from 'axios'
import { useLocation } from "react-router-dom";

import Constants from "../../Shared/Constants";
import Helpers from "../../Shared/Helpers"


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
    height: "100%",
    display: "flex",
    flexDirection: "row",
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
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: 'center',
  alignItems: 'center',
  gap: "2em",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const CovidExposurePage = () => {
  // Material UI Styles
  const classes = useStyles();

  const location = useLocation();
  
  const { userData } = location.state;

  const [exposure, setExposure] = useState([]);
 
  useEffect(async () => {
    try {
      var responseConfirmedCasesCaseWasHere = await axios.get(`/api/myMaps/confirmedCases/caseWasHere`,{
        params: {
          userId : userData.id,
          date : `"${Helpers.FormatDateTime(new Date())}"`
        }
      })

      const caseWasHereCases = responseConfirmedCasesCaseWasHere.data;

      let exposureList = [];
      let id = 0;
      caseWasHereCases.forEach(caseWasHereCase => {

        exposureList.push({"id": id, "name": caseWasHereCase.name, "checkInDate": caseWasHereCase.checkInDate, "caseWasThere": caseWasHereCase.caseWasThere})
        id++;
      })
      setExposure(exposureList);
    } 
    catch(error) 
    {
      console.log(error);
    }   
  },[]);

  const covidExposureDatagridColumns = [
    {
      field: "name",
      headerName: "Place",
      width: 80,
      flex: 1,
      editable: false,
      headerClassName: "covidExposureDatagridHeader",
      headerAlign: "center",
    },
    {
      field: "checkInDate",
      headerName: "I Was There",
      width: 70,
      flex: 1,
      editable: false,
      headerClassName: "covidExposureDatagridHeader",
      headerAlign: "center",
      valueGetter: params => moment(params?.value).format("DD/MM/YYYY hh:mm A")
    },
    {
      field: "caseWasThere",
      headerName: "Case Was There",
      width: 80,
      flex: 1,
      headerClassName: "covidExposureDatagridHeader",
      headerAlign: "center",
      editable: false,
      valueGetter: params => moment(params?.value).format("DD/MM/YYYY hh:mm A")
    }
  ];

  return (
    <div className={classes.covidExposurePageContainer}>
      <div className={classes.covidExposureDataGridArea}>
       <div className="DataGridArea" style={dataGridAreaStyle}>
          <Box
            sx={{
              height: 'calc(100vh - 8rem)',
              width: 'inherit',
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
          </Box>
      </div>
    </div>
  </div>

  );
};

export default CovidExposurePage;
