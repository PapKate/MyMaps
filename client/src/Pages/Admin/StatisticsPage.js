import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios, { Axios } from 'axios'

import BarChart from "../../Components/Stats/BarChart"
import Constants from "../../Shared/Constants";
import Loading from "../../Components/Animations/Loading";
import TitleAndText from "../../Components/TitleAndText";
import Helpers from "../../Shared/Helpers"
import DateRangePicker from "../../Components/DatePickers/DateRangePicker";

const useStyles = makeStyles({
  statisticsPageContainer: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    backgroundColor: `#${Constants.White}`
  },
  textDataContainer : {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    padding: "16px",
    width: "fit-content",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 450px)": {
      flexDirection: "column"
    }
  },
  totalDataContainer : {
    position: "relative",
    fontSize: "140%",
    color: `#${Constants.Gray}`,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "inherit",
    justifyContent: "center",
    alignItems: "start",
    "@media (max-width: 640px)": {
      fontSize: "100%",
      left: "10%"
    },
    "@media (max-width: 450px)": {
      left: "4%"
    }
  },
  statisticsAreaContainer : {
    position: "relative",
    padding: "32px",
    gap: "32px",
    display: "flex",
    flexDirection: "column"
  },
  statisticContainer : {
    position: "relative",
    padding: "32px",
    background: `#FFFFFF`,
    borderRadius: "8px",
  }
});

const StatisticsPage = () => {
  // Material UI Styles
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [totalCheckIns, setTotalCheckIns] = useState(null);
  const [totalCases, setTotalCases] = useState(null);
  const [totalCheckInCases, setTotalCheckInCases] = useState(null);
  const [totalCheckInTypes, setTotalCheckInTypes] = useState(null);
  const [totalCategoriesByCases, setTotalCategoriesByCases] = useState(null);
  const [totalCheckInTimespan, setTotalCheckInTimeSpan] = useState(null);

  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());

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

  const CreateCheckInDateWithReferencesList = (list) => {
    let checkInDateWithReferences = [];
    let referencesIndex = 0;
    let loopIndex = 0;

    list.forEach(x => {
      referencesIndex++;
      var currentCheckInDate = Helpers.GetFullDate(new Date(x.checkInDate));
      if((loopIndex !== list.length - 1 && currentCheckInDate.getTime() !== Helpers.GetFullDate(new Date(list[loopIndex + 1].checkInDate)).getTime()) || loopIndex === list.length - 1)
      {
        checkInDateWithReferences.push({"checkInDate" : currentCheckInDate, "references" : referencesIndex});
        referencesIndex = 0;
      }

      loopIndex++;
    })
    return checkInDateWithReferences;
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

      var dateTimeNow = new Date();
      setDateStart(new Date(dateTimeNow.getFullYear(), dateTimeNow.getMonth(), 1)); 
      setDateEnd(new Date(dateTimeNow.getFullYear(), dateTimeNow.getMonth() + 1, 0)); 
      
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

      setIsLoading(false);
    } catch(error) { 
      console.log(error);
    } 

  }, []);


  useEffect (async () => {
    var timespanCheckInResponse = await axios.get(`/api/myMaps/pointCheckIns`, {
      params: {
        checkInDate : [`gt.${Helpers.FormatDateTime(dateStart)}`, `lt.${Helpers.FormatDateTime(dateEnd)}`]
      }
    });

    var timespanCheckInCasesResponse = await axios.get(`/api/myMaps/pointCheckIns/confirmedCases`, {
      params: {
        checkInDate : [`gt.${Helpers.FormatDateTime(dateStart)}`, `lt.${Helpers.FormatDateTime(dateEnd)}`]
      }
    });
    var timespanCheckInsCases = timespanCheckInCasesResponse.data;

    var timespanCheckIns = timespanCheckInResponse.data;

    var timespanCheckInData = CreateCheckInDateWithReferencesList(timespanCheckIns);

    var timespanCheckInsCasesData = CreateCheckInDateWithReferencesList(timespanCheckInsCases);

    var days = [];
    var daysCases = [];
    for(let i = dateStart.getDate(); i <= dateEnd.getDate() - 1; i++)
    {
      var current = new Date(dateStart.getFullYear(), dateStart.getMonth(), i + 1)

      days.push({"checkInDate" : current, "references" : 0 });
      daysCases.push({"checkInDate" : current, "references" : 0});
    }

    days.forEach(day => {
      let checkIns = timespanCheckInData?.find(x => x.checkInDate.getTime() === day.checkInDate.getTime())?.references;
      if(checkIns != null)
        day.references = checkIns;
    })

    daysCases.forEach(dayCase => {
      let checkIns = timespanCheckInsCasesData?.find(x => x.checkInDate.getTime() === dayCase.checkInDate.getTime())?.references;
      if(checkIns != null)
        dayCase.references = checkIns;
    })

    setTotalCheckInTimeSpan({
      labels : days.map((day) => Helpers.GetFullDateToString(day.checkInDate)),
      datasets : [
        {
          label : "Check Ins",
          data : days.map((day) => day.references),
          backgroundColor: [
            `#${Constants.LightBlue}`,
          ]
        },
        {
          label : "COVID cases Check Ins",
          data : daysCases.map((dayCase) => dayCase.references),
          backgroundColor: [
            `#${Constants.LightGreen}`,
          ]
        }
      ]
    })
  }, [dateEnd])

  return (
    <div className={classes.statisticsPageContainer}>
      {isLoading 
        ? 
        (
          <Loading/>
        )
        :
        (
          <div>
            <div className={classes.textDataContainer}>
              <img className="headerLogo" style={{width: "50%", maxWidth: "320px", height: "auto", maxHeight: "320px",}} src={"/icons/infection.png"} alt="logo"/>
              <div className={classes.totalDataContainer}>
                <TitleAndText IsTitleBold={false} 
                              Title={"Total number of check ins"} 
                              Text={totalCheckIns?.length}/>
                <TitleAndText IsTitleBold={false} 
                              Title={"Total number of cases"} 
                              Text={totalCases?.length}/>
                <TitleAndText IsTitleBold={false} 
                              Title={"Total number of check ins by cases"} 
                              Text={totalCheckInCases?.length}/>
              </div>
            </div>
            
            <div className={classes.statisticsAreaContainer}>
              <div className={classes.statisticContainer}>
                <BarChart chartData={totalCheckInTypes}/>
              </div>
              <div className={classes.statisticContainer}>
                <BarChart chartData={totalCategoriesByCases}/>
              </div>
              <div className={classes.statisticContainer}>
                <DateRangePicker OnDateStartChanged={(date) => setDateStart(date)} OnDateEndChanged={(date)=> setDateEnd(date)}/>
                <BarChart chartData={totalCheckInTimespan}/>
              </div>
            </div>
          </div>
        )
      }
    </div>
    
  );
};

export default StatisticsPage;