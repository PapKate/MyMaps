import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios, { Axios } from 'axios'

import BarChart from "../../Components/Stats/BarChart"
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
  const [totalCheckInTypes, setTotalCheckInTypes] = useState(null);
  const [totalCategoriesByCases, setTotalCategoriesByCases] = useState(null);

  const CreateNameWithReferencesList = (list) => {
    let nameWithReferences = [];
    let referencesIndex = 0;
    let loopIndex = 0;

    list.forEach(x => {
      referencesIndex++;
      if((loopIndex !== list.length - 1 && x.name !== list[loopIndex + 1].name) || loopIndex === list.length - 1)
      {
        nameWithReferences.push({"name" : x.name, "references" : referencesIndex});
        referencesIndex = 0;
      }

      loopIndex++;
    })
    return nameWithReferences;
  }

  /**
   ** On initialized
  */
  useEffect(async () => { 
    try{
      var checkInsResponse = await axios.get(`/api/myMaps/pointCheckIns`);
      var casesResponse = await axios.get(`/api/myMaps/confirmedCases`);
      var checkInCasesResponse = await axios.get(`/api/myMaps/pointCheckIns/confirmedCases`);
      var checkInTypesResponse = await axios.get(`/api/myMaps/pointCheckIns/types`);
      var categoriesByCasesResponse = await axios.get(`/api/myMaps/confirmedCases/types`);

      setTotalCheckIns(checkInsResponse.data);
      setTotalCases(casesResponse.data);
      setTotalCheckInCases(checkInCasesResponse.data);
     
      var checkInTypes = checkInTypesResponse.data;
      let checkInTypesList = [];
      let referencesIndex = 0;
      let loopIndex = 0;

      checkInTypes.forEach(checkInType => {
        referencesIndex++;
        if((loopIndex !== checkInTypes.length - 1 && checkInType.name !== checkInTypes[loopIndex + 1].name) || loopIndex === checkInTypes.length - 1)
        {
          checkInTypesList.push({"name" : checkInType.name, "references" : referencesIndex});
          referencesIndex = 0;
        }

        loopIndex++;
      })

      setTotalCheckInTypes({
        labels : checkInTypesList.map((nameAndReferences) => nameAndReferences.name),
        datasets : [
          {
            label : "Popular Categories",
            data : checkInTypesList.map((nameAndReferences) => nameAndReferences.references),
            backgroundColor: [
              `#${Constants.Blue}`,
              `#${Constants.Yellow}`,
              `#${Constants.Red}`,
              `#${Constants.Gray}`,
              `#${Constants.LightBlue}`,
              `#${Constants.LightGreen}`,
              `#${Constants.Green}`,
              `#${Constants.VeryLightGreen}`,
              `#${Constants.VeryLightRed}`,
            ]
          }
        ]
      });

      var casesCategories = CreateNameWithReferencesList(categoriesByCasesResponse.data);

      setTotalCategoriesByCases({
        labels : casesCategories.map((nameAndReferences) => nameAndReferences.name),
        datasets : [
          {
            label : "Popular case Categories",
            data : casesCategories.map((nameAndReferences) => nameAndReferences.references),
            backgroundColor: [
              `#${Constants.Blue}`,
              `#${Constants.Yellow}`,
              `#${Constants.Red}`,
              `#${Constants.Gray}`,
              `#${Constants.LightBlue}`,
              `#${Constants.LightGreen}`,
              `#${Constants.Green}`,
              `#${Constants.VeryLightGreen}`,
              `#${Constants.VeryLightRed}`,
            ]
          }
        ]
      });

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
    
      <BarChart chartData={totalCheckInTypes}/>
      <BarChart chartData={totalCategoriesByCases}/>

    </div>
  );
};

export default StatisticsPage;