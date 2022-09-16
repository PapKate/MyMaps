import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import SingleDatePicker from "../../Components/DatePickers/SingleDatePicker";

import TextButton from "../../Components/Buttons/TextButton";
import Constants from "../../Shared/Constants";
import Helpers from "../../Shared/Helpers";
import axios from 'axios';

const marginStyle = {
  margin: '3em'
};

const useStyles = makeStyles({
  confirmCasePageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: `#${Constants.White}`,
  },
  confirmCaseText: {
    position: "relative",
    width: "100%",
    height: "auto",
    fontSize: "180%",
    fontWeight: "600",
    color: `#${Constants.Red}`,
    fontFamily: Constants.FontFamily,
    textAlign: "center",
    display: "block",
    padding: "4px 0",
    borderRadius: "8px 8px 0 0",
    backgroundColor: `#${Constants.White}`,
  },
  confirmCaseDisplay: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "2em",
    gap: "2em",
    justifyContent: "space-evenly",
    alignItems: "center",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
    },
  },
  confirmCaseDatePickerArea: {
    position: "relative",
    width: "100%",
    height: "max-content",
    display: "flex",
    paddingBottom: "2em",
    gap: "2em",
    justifyContent: "space-evenly",
    alignItems: "center",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
    },
  },
});



const ConfirmCasePage = ({ UserId }) => {
  // Material UI Styles
  const classes = useStyles();

  const location = useLocation();

  const { userData } = location.state;
  const [date, setDate] = useState(new Date());
  const [lastCase, setLastCase] = useState(null);

  const Report = async () => {

    try{
      var maxCaseDate = lastCase;
      maxCaseDate.setDate(maxCaseDate?.getDate() + 14);
      if(date < maxCaseDate)
        return;

      var reportResponse = await axios.post(`/api/myMaps/confirmedCases`, {
         userId: userData.id,
         date: Helpers.FormatDateTime(date)
      });
    }
    catch (error) {
        console.log(error);
    }
  }

  /**
   ** On initialized
   */
   useEffect(async () => { 
    var userCasesResponse = await axios.get(`/api/myMaps/confirmedCases`);
    let userCases = userCasesResponse.data.find(x => x.userId === userData.id)

    if(userCases.length > 1)
    {
      setLastCase(new Date(userCases[0].date));
    }
    else if(userCases != null)
      setLastCase(new Date(userCases.date));

  }, []);

  return (
    <>
      <div className="confirmCasePage">
        <div style={marginStyle}>
        <div className={classes.confirmCasePageContainer}>
          <div className={classes.confirmCaseDisplay}>
              <span className={classes.confirmCaseText}>Confirm Case</span>
              <span>Last confirmed case: {lastCase == null ? "-" : `${Helpers.GetFullDateToString(lastCase)}`}</span>
            <SingleDatePicker OnDateChanged={(date) => setDate(date)}/>
            <TextButton Text={"Report"} BackColor={Constants.Red} 
              OnClick={Report}
            />
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmCasePage;
