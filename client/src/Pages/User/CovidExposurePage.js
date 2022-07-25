import { Box, makeStyles } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

import { useLocation } from "react-router-dom";

import Constants from "../../Shared/Constants";

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

const CovidExposurePage = ({ UserId }) => {
  // Material UI Styles
  const classes = useStyles();

  const location = useLocation();
  
  const { userData } = location.state;

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
    {
      field: "time",
      headerName: "Time",
      type: "time",
      width: 80,
      flex: 1,
      headerClassName: "covidExposureDatagridHeader",
      headerAlign: "center",
      editable: false,
    },
    {
      field: "caseWasHere",
      headerName: "Case was here",
      type: "time",
      width: 80,
      flex: 1,
      headerClassName: "covidExposureDatagridHeader",
      headerAlign: "center",
      editable: false,
    },
  ];

  const covidExposureDatagridRows = [
    {
      id: 1,
      date: "29/01/2019",
      place: "Bodegas",
      time: "17:23:42",
      caseWasHere: "16:23:42",
    },
    {
      id: 2,
      date: "27/01/2019",
      place: "Bardot",
      time: "15:23:42",
      caseWasHere: "15:23:42",
    },
  ];


  return (
    <div className={classes.covidExposurePageContainer}>
     <div className={classes.covidExposureDataGridArea}>
     <div>
          <Box
            sx={{
              width: 800,
              position: "center",
              height: 600,
              "& .covidExposureDatagridHeader": {
                backgroundColor: `#${Constants.Yellow}`,
                color: `#${Constants.White}`,
                fontFamily: Constants.FontFamily,
                fontWeight: 400,
                fontSize: "140%",
              },
            }}
          >
            <DataGrid rows={covidExposureDatagridRows} columns={covidExposureDatagridColumns} />
          </Box>
        </div>
        </div>
        </div>

  );
};

export default CovidExposurePage;
