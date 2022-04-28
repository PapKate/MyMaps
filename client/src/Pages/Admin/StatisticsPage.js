import { makeStyles } from "@material-ui/core";

import Constants from "../../Shared/Constants";

const useStyles = makeStyles({
    statisticsPageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: `#${Constants.White}`,
  }
});

const StatisticsPage = () => {
  // Material UI Styles
  const classes = useStyles();

  return (
    <div className={classes.statisticsPageContainer}>
      Statistics
    </div>
  );
};

export default StatisticsPage;