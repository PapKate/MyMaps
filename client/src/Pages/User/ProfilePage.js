import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";

import { Box, makeStyles } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";

import VectorButton from "../../Components/Buttons/VectorButton";
import EditUserDataDialog from "../../Components/Dialogs/EditUserDataDialog";
import Constants from "../../Shared/Constants";

const useStyles = makeStyles({
  profilePageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  profileDataContainer: {
    height: "24vh",
    width: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "2em",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
      height: "fit-content",
      padding: "2em 0",
    },
  },
  profileImgContainer: {
    height: "10rem",
    width: "10rem",
    borderRadius: "50%",
    filter: `drop-shadow(0 0 2px #${Constants.Gray})`,
    "@media (max-width: 450px)": {
      height: "6rem",
      width: "6rem",
    },
  },
  profileTextDataContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "1em",
    color: `#${Constants.Gray}`,
    justifyContent: "space-evenly",
    alignItems: "center",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
    },
  },
  profileData: {
    position: "relative",
    width: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    justifyContent: "center",
    alignItems: "flex-start",
    fontFamily: `${Constants.FontFamily}`,
    fontWeight: "400",
    fontSize: "200%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    "@media (max-width: 1000px)": {
      alignItems: "center",
      fontSize: "200%",
    },
    "@media (max-width: 450px)": {
      fontSize: "100%",
    },
  },
  profileDataBold: {
    fontWeight: "600",
    position: "relative",
  },
  profileDataValue: {
    marginLeft: "1em",
    position: "relative",
    "@media (max-width: 1000px)": {
      marginLeft: "0",
    },
  },
  editButton: {
    position: "absolute",
    margin: "1em",
    top: "0",
    right: "0",
    zIndex: "2",
  },
  profileDataGridsArea: {
    position: "relative",
    width: "initial",
    height: "max-content",
    display: "flex",
    flexDirection: "row",
    padding: "0 2em 0 2em",
    gap: "2em",
    justifyContent: "space-evenly",
    alignItems: "center",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
      padding: "0 0 2em 0"
    },
  },
  svgContainer: {
    width: "32px",
    height: "56px",
  },
  visitsLogTitle: {
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

const ProfilePage = () => {
  /**
   ** Material UI Styles
   */
  const classes = useStyles();
  
  /**
   ** The current location object, which represents the current URL in web browsers.
   */
  const location = useLocation();

  /**
   ** The user data from the state
   */
  const user = location.state.userData;

  //#region Edit user dialog
  
  /**
   ** A flag indicating whether the edit user dialog is open
   */
  const [editUserDataDialog_IsOpen, editUserDataDialog_SetIsOpen] = useState(false);
  
  const EditUserDataDialog_IsOpenHandler = () =>
    editUserDataDialog_SetIsOpen(!editUserDataDialog_IsOpen);
  
  const EditUserData = () => {
    EditUserDataDialog_IsOpenHandler();
  };

  //#endregion

  //#region Check Ins

  /**
   ** The user's check ins
   */
   const [checkIns, setCheckIns] = useState([]);

  //#endregion

  //#region Confirmed Cases

  /**
   ** The user's confirmed cases
   */
   const [confirmedCases, setConfirmedCases] = useState([]);

  //#endregion

  //#region Data grids

  /**
   ** The columns of the visits log data grid
   */
  const visitsLogColumns = [
    {
      field: "checkInDate",
      headerName: "Check in date",
      minWidth: 176,
      maxWidth: 400,
      flex: 1,
      editable: false,
      headerClassName: "visitsLogHeader",
      headerAlign: "center",
      valueGetter: params => moment(params?.value).format("DD/MM/YYYY hh:mm A")
    },
    {
      field: "name",
      headerName: "Place",
      flex: 1,
      editable: false,
      headerClassName: "visitsLogHeader",
      headerAlign: "center",
    },
    {
      field: "customers",
      headerName: "People",
      type: "number",
      minWidth: 40,
      maxWidth: 60,
      headerClassName: "visitsLogHeader",
      headerAlign: "center",
      renderHeader: () => (
        <svg className={classes.svgContainer} viewBox="0 0 24 24">
          <path fill={`#${Constants.White}`} d={Constants.AccountGroup} />
        </svg>
      ),
      editable: false,
      valueGetter: params => params?.value ? params?.value : "__"
    },
  ];
  
  /**
   ** The column of the personal cases data grid
   */
  const casesLogColumns = [
    {
      field: "date",
      headerName: "Date and time",
      flex: 1,
      editable: false,
      headerClassName: "personalCasesLogHeader",
      headerAlign: "center",
      valueGetter: params => moment(params?.value).format("DD/MM/YYYY hh:mm A")
    }
  ];

  //#endregion
  
  //#region Methods

  /**
   ** Gets all the user's check ins
   */
  const GetCheckIns = async () => {
    try {
      // Gets the check ins of all the points of interest from the database
      const checkInResponse = await axios.get(`/api/myMaps/pointCheckIns/points`, {
        params: {
          userId : user.id
        }
      });
      // Gets all the check ins that have user id the user's id
      let userCheckIns = checkInResponse.data;
      
      setCheckIns(userCheckIns);
    } catch (error) {
      console.log(error);
      console.log("data not fetched");
    }
  }

  /**
   ** Gets all the user's confirmed cases 
   */
  const GetConfirmedCases = async () => {
    try {
      // Gets the confirmed cases from the database
      const confirmedCasesResponse = await axios.get(`/api/myMaps/confirmedCases`);

      // Gets all the confirmed cases that have user id the user's id
      let userConfirmedCases = confirmedCasesResponse.data.filter(function (x) {
        return x.userId == user.id;
      });
      
      setConfirmedCases(userConfirmedCases);
    } catch (error) {
      console.log(error);
      console.log("data not fetched");
    }
  }

  //#endregion

  /**
   ** On initialized
   */
   useEffect(async() => { 
    await GetCheckIns();
    await GetConfirmedCases();
  }, []);

  return (
    <div className={classes.profilePageContainer}>
      <div className={classes.profileDataContainer}>
        <div className={classes.editButton}>
          <VectorButton
            OnClick={EditUserData}
            BorderRadius={"4px"}
            BackColor={Constants.Gray}
            Color={Constants.White}
            VectorSource={Constants.Edit}
          />
        </div>
        <img
          className={classes.profileImgContainer}
          src={"/icons/user.png"}
          alt="user"
        />
        <div className={classes.profileTextDataContainer}>
          <div className={classes.profileData}>
            <span className={classes.profileDataBold}>Username</span>
            <span className={classes.profileDataValue}>{user?.username}</span>
          </div>
          <div className={classes.profileData}>
            <span className={classes.profileDataBold}>Email</span>
            <span className={classes.profileDataValue}>{user?.email}</span>
          </div>
        </div>
      </div>

      <div className={classes.profileDataGridsArea}>
        <div style={{"width":"100%"}}>
          <span className={classes.visitsLogTitle}>Visits Log</span>
          <Box
            sx={{
              height: 500,
              "& .visitsLogHeader": {
                backgroundColor: `#${Constants.LightBlue}`,
                color: `#${Constants.White}`,
                fontFamily: Constants.FontFamily,
                fontWeight: 600,
                fontSize: "140%",
              },
            }}
          >
            <DataGrid rows={checkIns} columns={visitsLogColumns} />
          </Box>
        </div>

        <div style={{"width":"100%"}}>
          <span className={classes.visitsLogTitle}>Personal Cases Log</span>
          <Box
            sx={{
              height: 500,
              "& .personalCasesLogHeader": {
                backgroundColor: `#${Constants.Red}`,
                color: `#${Constants.White}`,
                fontFamily: Constants.FontFamily,
                fontWeight: "600",
                fontSize: "140%",
              },
            }}
          >
            <DataGrid rows={confirmedCases} columns={casesLogColumns} />
          </Box>
        </div>
      </div>

      <EditUserDataDialog
        IsOpen={editUserDataDialog_IsOpen}
        IsOpenHandler={EditUserDataDialog_IsOpenHandler}
      />
    </div>
  );
};

export default ProfilePage;
