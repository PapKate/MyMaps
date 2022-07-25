import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//import { DatePicker } from "@mui/x-date-pickers";

import TextButton from "../../Components/Buttons/TextButton";
import Constants from "../../Shared/Constants";
import { useLocation } from "react-router-dom";

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

    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomTimeInput = ({ date, value, onChange }) => (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ border: "solid 1px pink" }}
      />
    );

  return (
    <div className="confirmCasePage">
       <div style={marginStyle}>
       <div className={classes.confirmCasePageContainer}>
        <div className={classes.confirmCaseDisplay}>
            <span className={classes.confirmCaseText}>Confirm Case</span>
           <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeInput
              customTimeInput={<ExampleCustomTimeInput />}
            />
           <TextButton Text={"Report"} BackColor={Constants.Red} />
         </div>
        </div>
       </div>
    </div>
  );
};

export default ConfirmCasePage;
