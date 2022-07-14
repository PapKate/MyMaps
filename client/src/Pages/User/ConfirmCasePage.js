import { makeStyles } from "@material-ui/core";

import { useLocation } from "react-router-dom";

import Constants from "../../Shared/Constants";

const useStyles = makeStyles({
  confirmCasePageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    backgroundColor: `#${Constants.White}`,
  }
});

const ConfirmCasePage = ({ UserId }) => {
  // Material UI Styles
  const classes = useStyles();

  const location = useLocation();


  const { userData } = location.state;

  return (
    <div className={classes.confirmCasePageContainer}>
      Confirm Case
    </div>
  );
};

export default ConfirmCasePage;
