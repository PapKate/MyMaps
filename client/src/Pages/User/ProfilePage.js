import { useState } from "react";
import { Box, makeStyles } from "@material-ui/core";

import { DataGrid } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";

import VectorButton from "../../Components/Buttons/VectorButton";
import EditUserDataDialog from "../../Components/Dialogs/EditUserDataDialog";
import Constants from "../../Shared/Constants";

const useStyles = makeStyles({
  profilePageContainer: {
    width: "100%",
    height: "max-content",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: `#${Constants.White}`,
    gap: "2em",
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
      height: "100%",
      padding: "2em 0",
    },
  },
  profileImgContainer: {
    height: "10rem",
    width: "10rem",
    background: `#${Constants.Red}`,
    borderRadius: "50%",
    boxShadow: Constants.BoxShadow,
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

const ProfilePage = ({ UserId }) => {
  // Material UI Styles
  const classes = useStyles();

  const location = useLocation();

  const [editUserDataDialog_IsOpen, editUserDataDialog_SetIsOpen] =
    useState(false);
  const EditUserDataDialog_IsOpenHandler = () =>
    editUserDataDialog_SetIsOpen(!editUserDataDialog_IsOpen);
  const EditUserData = () => {
    EditUserDataDialog_IsOpenHandler();
  };

  const { user } = location.state;

  //const user = JSON.parse(userData);

  const visitsLogColumns = [
    {
      field: "arrivalDate",
      headerName: "Arrival date",
      minWidth: 150,
      maxWidth: 200,
      flex: 1,
      editable: false,
      headerClassName: "visitsLogHeader",
      headerAlign: "center",
    },
    {
      field: "place",
      headerName: "Place",
      flex: 1,
      editable: false,
      headerClassName: "visitsLogHeader",
      headerAlign: "center",
    },
    {
      field: "currentPeople",
      headerName: "People",
      type: "number",
      width: 40,
      headerClassName: "visitsLogHeader",
      headerAlign: "center",
      renderHeader: () => (
        <svg className={classes.svgContainer} viewBox="0 0 24 24">
          <path fill={`#${Constants.White}`} d={Constants.AccountGroup} />
        </svg>
      ),
      editable: false,
    },
  ];

  const visitsLogRows = [
    {
      id: 1,
      arrivalDate: "23/01/2019, 17:23:42",
      place: "Snow",
      currentPeople: 23,
    },
    {
      id: 2,
      arrivalDate: "21/01/2019, 17:23:42",
      place: "Alpha",
      currentPeople: 23,
    },
  ];

  const casesLogColumns = [
    {
      field: "caseDate",
      headerName: "Date and time",
      flex: 1,
      editable: false,
      headerClassName: "personalCasesLogHeader",
      headerAlign: "center",
    },
  ];

  const casesLogRows = [
    { id: 1, caseDate: "23/01/2019, 17:23:42" },
    { id: 2, caseDate: "23/01/2018, 17:23:42" },
  ];

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
          src={"/icons/ninja.png"}
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
        <div>
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
            <DataGrid rows={visitsLogRows} columns={visitsLogColumns} />
          </Box>
        </div>

        <div>
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
            <DataGrid rows={casesLogRows} columns={casesLogColumns} />
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
