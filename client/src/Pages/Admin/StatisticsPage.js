import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import axios, { Axios } from 'axios'

import BarChart from "../../Components/Stats/BarChart"
import Constants from "../../Shared/Constants";
import Loading from "../../Components/Animations/Loading";
import TitleAndText from "../../Components/TitleAndText";
import Helpers from "../../Shared/Helpers"
import DateRangePicker from "../../Components/DatePickers/DateRangePicker";
import SingleDatePicker from "../../Components/DatePickers/SingleDatePicker";

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
  },
  dateRangePickerContainer : {
    position: "relative",
    width: "100%",
    height: "40px",
    display: "flex",
    flexDirection : "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px"
  }
});

const StatisticsPage = () => {
  // Material UI Styles
  const classes = useStyles();

  /**
   ** A flag indicating whether the page is loading
   */
  const [isLoading, setIsLoading] = useState(true);
  /**
   ** The total check ins
   */
  const [totalCheckIns, setTotalCheckIns] = useState(null);
  /**
   ** The total confirmed cases
   */
  const [totalCases, setTotalCases] = useState(null);
  /**
   ** The total check ins of the confirmed cases
   */
  const [totalCheckInCases, setTotalCheckInCases] = useState(null);
  /**
   ** The types of the point of interests in the check ins
   */
  const [totalCheckInTypes, setTotalCheckInTypes] = useState(null);
  /**
   ** The total categories of the points of interest the confirmed cases have checked in
   */
  const [totalCategoriesByCases, setTotalCategoriesByCases] = useState(null);
  /**
   ** The time span for the check ins
   */
  const [totalCheckInTimespan, setTotalCheckInTimeSpan] = useState(null);
  /**
   ** The changes for the hours in the check ins
   */
  const [totalHourlyCheckInChanges, setTotalHourlyCheckInChanges] = useState(null);
  /**
   ** The date
   */
  const [date, setDate] = useState(new Date());
  /**
   ** The date start of the date range picker
   */
  const [dateStart, setDateStart] = useState(new Date());
  /**
   ** The date end of the date range picker
   */
  const [dateEnd, setDateEnd] = useState(new Date());

  /**
   ** Creates a new list with name and references pairs 
   * @param {List} list 
   */
  const CreateNameWithReferencesList = (list) => {
    let nameWithReferences = [];
    let referencesIndex = 0;
    let loopIndex = 0;

    // For each item in the list...
    list.forEach(x => {
      // Increments the references' index by one
      referencesIndex++;
      // If it has not reached the last element and the name of the item is different from the name of the next item in the list...
      // Or it has reached the last element of the list...
      if((loopIndex !== list.length - 1 && x.name !== list[loopIndex + 1].name) || loopIndex === list.length - 1)
      {
        // Adds the name and the number of references to the list
        nameWithReferences.push({"name" : x.name, "references" : referencesIndex});
        // Resets the references' index
        referencesIndex = 0;
      }

      // Increments the loop index by one
      loopIndex++;
    });
    // Returns the list with the name and the references pairs
    return nameWithReferences;
  }

  /**
   ** Creates a new list with check in date and references pairs 
   * @param {List} list 
   */
  const CreateCheckInDateWithReferencesList = (list) => {
    let checkInDateWithReferences = [];
    let referencesIndex = 0;
    let loopIndex = 0;

    // For each item in the list...
    list.forEach(x => {
      // Increments the references' index by one
      referencesIndex++;
      // Gets the date from the check in date.
      // Resets the time to 00:00:00
      var currentCheckInDate = Helpers.GetFullDate(new Date(x.checkInDate));
      // If it has not reached the last element and the check in date of the item is different from the check in date of the next item in the list...
      // Or it has reached the last element of the list... 
      if((loopIndex !== list.length - 1 && currentCheckInDate.getTime() !== Helpers.GetFullDate(new Date(list[loopIndex + 1].checkInDate)).getTime()) || loopIndex === list.length - 1)
      {
        // Adds the check in date and the number of references to the list
        checkInDateWithReferences.push({"checkInDate" : currentCheckInDate, "references" : referencesIndex});
        // Resets the references' index
        referencesIndex = 0;
      }

      // Increments the loop index by one
      loopIndex++;
    })
    // Returns the list with the check in date and the references pairs
    return checkInDateWithReferences;
  }

  /**
   ** Creates a new list with check in date hour and references pairs 
   * @param {List} list 
   * @returns  
   */
  const CreateCheckInDateHourWithReferencesList = (list) => {
    let checkInDateHourWithReferences = [];
    let referencesIndex = 0;
    let loopIndex = 0;

    // For each item in the list...
    list.forEach(x => {
      // Increments the references' index by one
      referencesIndex++;
      // Gets the date and hour from the check in date
      var currentCheckInDateAndHour = Helpers.GetDateHour(new Date(x.checkInDate));
      var nextCheckInDateAndHour = Helpers.GetDateHour(new Date(x.checkInDate));
      // If it is not the last element of the list...
      if(loopIndex !== list.length - 1)
        // Gets the date and hour from the next check in date
        nextCheckInDateAndHour = Helpers.GetDateHour(new Date(list[loopIndex + 1].checkInDate))
      // If it is not the last element of the list...
      // And the hour is not different in the two check ins...
      // Or it is the last element of the list
      if((loopIndex !== list.length - 1 
        && currentCheckInDateAndHour.hour !== nextCheckInDateAndHour.hour) 
        || loopIndex === list.length - 1)
      {
        // Adds the check in date and hour and the number of references to the list
        checkInDateHourWithReferences.push({"dateAndHour" : currentCheckInDateAndHour, "references" : referencesIndex});
        // Resets the references' index
        referencesIndex = 0;
      }

      // Increments the loop index by one
      loopIndex++;
    })
    // Returns the list with the check in date hour and the references pairs
    return checkInDateHourWithReferences;
  }

  /**
   ** On initialized
  */
  useEffect(async () => { 
    // Try...
    try
    {
      // Gets the check ins from the database
      var checkInsResponse = await axios.get(`/api/myMaps/pointCheckIns`);
      // Gets the confirmed cases from the database
      var casesResponse = await axios.get(`/api/myMaps/confirmedCases`);
      // Gets the check ins of the confirmed cases from the database
      var checkInCasesResponse = await axios.get(`/api/myMaps/pointCheckIns/confirmedCases`);
      // Gets the check in types from the database
      var checkInTypesResponse = await axios.get(`/api/myMaps/pointCheckIns/types`);
      // Gets the categories from the confirmed cases from the database
      var categoriesByCasesResponse = await axios.get(`/api/myMaps/confirmedCases/types`);

      // Gets the current date and time
      var dateTimeNow = new Date();
      // Sets as date start the first date of the current month
      setDateStart(new Date(dateTimeNow.getFullYear(), dateTimeNow.getMonth(), 1)); 
      // Sets as date end the last date of the current month
      setDateEnd(new Date(dateTimeNow.getFullYear(), dateTimeNow.getMonth() + 1, 0)); 
      
      setTotalCheckIns(checkInsResponse.data);
      setTotalCases(casesResponse.data);
      setTotalCheckInCases(checkInCasesResponse.data);
     
      var checkInTypes = checkInTypesResponse.data;
      let checkInTypesList = [];
      let referencesIndex = 0;
      let loopIndex = 0;

      // For each check in type in the list...
      checkInTypes.forEach(checkInType => 
      {
        // Increments the references' index by one  
        referencesIndex++;
        // If it is not the last element of the list...
        // And the name is not different in the two check in types...
        // Or it is the last element of the list
        if((loopIndex !== checkInTypes.length - 1 && checkInType.name !== checkInTypes[loopIndex + 1].name) || loopIndex === checkInTypes.length - 1)
        {
          // Adds the name and the references to the list
          checkInTypesList.push({"name" : checkInType.name, "references" : referencesIndex});
          // Resets the references' index
          referencesIndex = 0;
        }

        // Increments the loop index by one
        loopIndex++;
      });

      // Sets the total check in types for the chart
      setTotalCheckInTypes({
        // Gets the name of the types from the list
        labels : checkInTypesList.map((nameAndReferences) => nameAndReferences.name),
        datasets : [
          {
            label : "Popular Categories",
            // Gets the references from the list
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

      // Creates a new list with name and references pairs
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

      // Sets the flag to false
      setIsLoading(false);
    }
    // Catch if there is an error...
    catch(error) 
    {
      // Prints the error to the console
      console.log(error);
    } 

  }, []);

  /**
   ** Fires when the date end is set
   */
  useEffect (async () => {
    // Gets the check ins for the given time span
    var timespanCheckInResponse = await axios.get(`/api/myMaps/pointCheckIns`, {
      params: {
        checkInDate : [`gt.${Helpers.FormatDateTime(dateStart)}`, `lt.${Helpers.FormatDateTime(dateEnd)}`]
      }
    });

    // Gets the check ins for the given time span for the confirmed cases
    var timespanCheckInCasesResponse = await axios.get(`/api/myMaps/pointCheckIns/confirmedCases`, {
      params: {
        checkInDate : [`gt.${Helpers.FormatDateTime(dateStart)}`, `lt.${Helpers.FormatDateTime(dateEnd)}`]
      }
    });

    var timespanCheckIns = timespanCheckInResponse.data;
    var timespanCheckInsCases = timespanCheckInCasesResponse.data;

    // Creates a new list with check in date and references pairs for the check ins
    var timespanCheckInData = CreateCheckInDateWithReferencesList(timespanCheckIns);
    // Creates a new list with check in date and references pairs for the check ins of the confirmed cases
    var timespanCheckInsCasesData = CreateCheckInDateWithReferencesList(timespanCheckInsCases);

    var days = [];
    var daysCases = [];
    // For the time span between the date start and date end...
    for(let i = dateStart.getDate(); i <= dateEnd.getDate() - 1; i++)
    {
      // Formats the current date
      var current = new Date(dateStart.getFullYear(), dateStart.getMonth(), i + 1)

      // Adds to the list the default pairs
      days.push({"checkInDate" : current, "references" : 0 });
      daysCases.push({"checkInDate" : current, "references" : 0});
    }

    // For each day in the list...
    days.forEach(day => {
      // Gets the first check in references that have the same date as the date
      let checkIns = timespanCheckInData?.find(x => x.checkInDate.getTime() === day.checkInDate.getTime())?.references;
      // If any check in exist...
      if(checkIns != null)
        // Sets the check in references for the current day
        day.references = checkIns;
    })

    // For each day in the list...
    daysCases.forEach(dayCase => {
      // Gets the first check in references that have the same date as the date
      let checkIns = timespanCheckInsCasesData?.find(x => x.checkInDate.getTime() === dayCase.checkInDate.getTime())?.references;
      // If any check in exist...
      if(checkIns != null)
        // Sets the check in references for the current day
        dayCase.references = checkIns;
    })

    setTotalCheckInTimeSpan({
      // Formats the check in dates
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

  /**
   ** Fires when the date is changed 
   */
  useEffect (async () => {
    // Gets the last minutes of the current day
    var lastMinutesOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
    // Gets the check ins of the current day
    var timespanHourlyCheckInResponse = await axios.get(`/api/myMaps/pointCheckIns`, {
      params: {
        checkInDate : [`gt.${Helpers.FormatDateTime(date)}`, `lt.${Helpers.FormatDateTime(lastMinutesOfDay)}`]
      }
    });

    // Gets the check ins of confirmed cases of the current day
    var timespanHourlyCheckInCasesResponse = await axios.get(`/api/myMaps/pointCheckIns/confirmedCases`, {
      params: {
        checkInDate : [`gt.${Helpers.FormatDateTime(date)}`, `lt.${Helpers.FormatDateTime(lastMinutesOfDay)}`]
      }
    });

    var timespanHourlyCheckIns = timespanHourlyCheckInResponse.data;
    var timespanHourlyCheckInsCases = timespanHourlyCheckInCasesResponse.data;

    // Creates a new list with check in date hour and references pairs 
    var hourlyCheckInChangesData = CreateCheckInDateHourWithReferencesList(timespanHourlyCheckIns);
    // Creates a new list with check in date hour and references pairs for the confirmed cases
    var hourlyCheckInCasesChangesData = CreateCheckInDateHourWithReferencesList(timespanHourlyCheckInsCases);

    var hours = [];
    var hoursCases = [];
    // For every hour...
    for(let i = 0; i <= 24 - 1; i++)
    {
      // The current hour
      var current = i;
      // Adds the the list the default values
      hours.push({"hour" : current, "references" : 0 });
      hoursCases.push({"hour" : current, "references" : 0 });
    }

    // For each hour in the list...
    hours.forEach(hour => {
      // Gets the first data's references where the hour is the same as the current hour
      let checkInsChanges = hourlyCheckInChangesData?.find(x => x.dateAndHour.hour === hour.hour)?.references;
      // If the references exist...
      if(checkInsChanges != null)
        // Sets the references
        hour.references = checkInsChanges;
    })

    // For each hour in the list...
    hoursCases.forEach(hourCase => {
      // Gets the first data's references where the hour is the same as the current hour
      let checkInsChanges = hourlyCheckInCasesChangesData?.find(x => x.dateAndHour.hour === hourCase.hour)?.references;
      // If the references exist...
      if(checkInsChanges != null)
        // Sets the references
        hourCase.references = checkInsChanges;
    })

    setTotalHourlyCheckInChanges({
      labels : hours.map((hour) => hour.hour),
      datasets : [
        {
          label : "Check Ins",
          data : hours.map((hour) => hour.references),
          backgroundColor: [
            `#${Constants.Yellow}`,
          ]
        },
        {
          label : "COVID cases Check Ins",
          data : hoursCases.map((hourCase) => hourCase.references),
          backgroundColor: [
            `#${Constants.Red}`,
          ]
        }
      ]
    })
  }, [date])

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
                <div className={classes.dateRangePickerContainer}>
                  <DateRangePicker OnDateStartChanged={(date) => setDateStart(date)} OnDateEndChanged={(date)=> setDateEnd(date)}/>
                </div>
                <BarChart chartData={totalCheckInTimespan}/>
              </div>
              <div className={classes.statisticContainer}>
                <SingleDatePicker OnDateChanged={(date) => setDate(date)}/>
                <BarChart chartData={totalHourlyCheckInChanges}/>
              </div>
            </div>
          </div>
        )
      }
    </div>
    
  );
};

export default StatisticsPage;