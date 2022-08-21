import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios, { Axios } from 'axios'

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

  const [totalCheckIns, setTotalCheckIns] = useState(null);
  const [totalCases, setTotalCases] = useState(null);
  const [totalCheckInCases, setTotalCheckInCases] = useState(null);

   /**
   ** On initialized
   */
   useEffect(async () => { 
    try{
      var checkInsResponse = await axios.get(`/api/myMaps/pointCheckIns`);
      var casesResponse = await axios.get(`/api/myMaps/confirmedCases`);
      var checkInCases = await axios.get(`/api/myMaps/pointCheckIns/confirmedCases`);
      
      setTotalCheckIns(checkInsResponse.data);
      setTotalCases(casesResponse.data);
      setTotalCheckInCases(checkInCases.data);

    } catch(error) {
      console.log(error);
    } 


  }, []);


  return (
    <div className={classes.statisticsPageContainer}>
      <div className="totalDataContainer">
        <div className="totalCheckInsContainer">
          <span>Total number of check ins</span> 
          <br/>
          <span style={{fontWeight: 600}}> {totalCheckIns?.length}</span>
        </div>
        <div className="totalCasesContainer">
          <span>Total number of cases</span>
          <br/>
          <span style={{fontWeight: 600}}> {totalCases?.length}</span>
        </div>
        <div className="totalCheckInCasesContainer">
          <span>Total number of check ins by cases</span>
          <br/>
          <span style={{fontWeight: 600}}> {totalCheckInCases?.length}</span>
        </div>


      </div>




    </div>
  );
};

export default StatisticsPage;