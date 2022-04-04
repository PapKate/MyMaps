
const fs = require("fs").promises;

const GetQueryResultAsync = require('../config/db');

const Type = require('../models/Type');
const Coordinate = require('../models/Coordinate');
const TimeSpent = require('../models/TimeSpent');
const PopularTime = require('../models/PopularTime');
const Point = require('../models/Point');
const PointAndType = require('../models/PointAndType');
/**
 * Uploads a file and passes its POI data to the data base
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

 exports.GetFile = async (req,res,next) =>{

    try {
       // var fs = require('fs');

        // The query to get all the types in the data base
        var getAllTypesQuery = Type.GetAll();
        // Calls the data base and gets all the types
        var allTypes = await GetQueryResultAsync(getAllTypesQuery);
        // Gets the names of all the types
        var allTypesList = allTypes.map(x => x.name);

        // The query to get all the coordinates in the data base
        var getAllCoordinatesQuery = Coordinate.GetAll();
        // Calls the data base and gets all the coordinates
        var allCoordinates = await GetQueryResultAsync(getAllCoordinatesQuery);
        // Gets the names of all the coordinates
        var allLatList = allCoordinates.map(x => x.lat);
        var allLngList = allCoordinates.map(x => x.lng);

        // The query to get all the timespents in the data base
        var getAllTimeSpentQuery = TimeSpent.GetAll();
        // Calls the data base and gets all the timespents
        var allTimeSpents = await GetQueryResultAsync(getAllTimeSpentQuery);
        // Gets the names of all the timespents
        var allMinValueList = allTimeSpents.map(x => x.minValue);
        var allMaxValueList = allTimeSpents.map(x => x.maxValue);
        
        // The query to get all the popular times in the data base
        var getAllPopularTimesQuery = PopularTime.GetAll();
        // Calls the data base and gets all the popular times
        var allPopularTimes = await GetQueryResultAsync(getAllPopularTimesQuery);
        // Gets the names of all the popular times
        var allPopularTimesNameList = allPopularTimes.map(x => x.name);
        var allPopularTimesPointIdList = allPopularTimes.map(x => x.pointId)
 
        // Reads the path from the request's body as a text
        var data = await fs.readFile(req.body.path, 'utf8');
        // Parses it to JSON
        var points = JSON.parse(data);

        points.forEach(async x => {
            var id = x.id;

            var types = x.types;

            
            types.forEach(async type => {
                // Check if type does NOT exist in the data base...
                if(allTypesList.includes(type) === false)
                {

                    // Adds the type name to the list
                    allTypesList.push(type);
                    // Creates the type model
                    let typeModel = new Type(type);
                    // Gets the query to create an instance in the data base
                    let typeQuery = typeModel.Create();
                    // Execute the query
                    await GetQueryResultAsync(typeQuery);
                }
            });

            var lat = x.coordinates.lat;
            var lng = x.coordinates.lng;
            
            // Check if coordinates does NOT exist in data base...
            if((allLatList.includes(x.coordinates.lat) === false) && (allLngList.includes(x.coordinates.lng) === false))
            {
                // Adds the lat lng pair to the list
                allLatList.push(x.coordinates.lat);
                allLngList.push(x.coordinates.lng);
                // Creates the coordinate model
                let coordinatesModel = new Coordinate(lat, lng);
                // Gets the query to create an instance in the data base
                let coordinatesQuery = coordinatesModel.Create();
                // Execute the query
                await GetQueryResultAsync(coordinatesQuery);
            }

            // If the time spent values exist...
            if(x.time_spent != null)
            {
                var valueData = [x.time_spent[0], x.time_spent[1]];
                
                // Check if timeSpent does NOT exist in data base...
                if((allMinValueList.includes(x.time_spent[0]) === false) && (allMaxValueList.includes(x.time_spent[1]) === false))
                {
                    // Adds the minValue and maxValue pair to the list
                    allMinValueList.push(x.time_spent[0]);
                    allMaxValueList.push(x.time_spent[1]);
                    // Creates the timespent model
                    let timeSpentModel = new TimeSpent(valueData[0],valueData[1]);
                    // Gets the query to create an instance in the data base
                    let timeSpentQuery = timeSpentModel.Create();
                    // Execute the query
                    var result = await GetQueryResultAsync(timeSpentQuery);
                }
            }
        });

        // The query to get all the types in the data base
        var getAllTypesQuery = Type.GetAll();
        // Calls the data base and gets all the types
        var allTypes = await GetQueryResultAsync(getAllTypesQuery);

        // The query to get all the timespents in the data base
        var getAllPointAndTypesQuery = PointAndType.GetAll();
        // Calls the data base and gets all the timespents
        var allPointAndTypes = await GetQueryResultAsync(getAllPointAndTypesQuery);
        // Gets the names of all the timespents
        var allPointIdList = allPointAndTypes.map(x => x.pointId);
        var allTypeIdList = allPointAndTypes.map(x => x.typeId);

        // The query to get all the timespents in the data base
        var getAllTimeSpentQuery = TimeSpent.GetAll();
        // Calls the data base and gets all the timespents
        var allTimeSpents = await GetQueryResultAsync(getAllTimeSpentQuery);
        // Gets the names of all the timespents
        var allMinValueList = allTimeSpents.map(x => x.minValue);
        var allMaxValueList = allTimeSpents.map(x => x.maxValue);

        // The query to get all the coordinates in the data base
        var getAllCoordinatesQuery = Coordinate.GetAll();
        // Calls the data base and gets all the coordinates
        var allCoordinates = await GetQueryResultAsync(getAllCoordinatesQuery);
        // Gets the names of all the coordinates
        var allLatList = allCoordinates.map(x => x.lat);
        var allLngList = allCoordinates.map(x => x.lng);

        var getAllPointsQuery = Point.GetAll();

        var allPoints = await GetQueryResultAsync(getAllPointsQuery);

        var allIdPointList = allPoints.map(x => x.id);

        // For each point of interest...
        points.forEach(async point => {
            
            // Creates the coordinates id
            var coordinatesId = 0;

            // For each coordinate in the data base...
            allCoordinates.forEach(coordinate => {
                // If the lat and lng of point match the lat and lng of the current coordinate...
                if(point.coordinates.lat === coordinate.lat && point.coordinates.lng === coordinate.lng)
                    // Sets the coordinates id as the current coordinate's id
                    coordinatesId = coordinate.id;
            });

            // Creates the time spent id
            var timeSpentId;

            // For each time spents in the data base...
            allTimeSpents.forEach(timeSpent => {
                // If the min and max values of point match the min and max values  of the current timespents...
                if(point.time_spent != null && point.time_spent[0] === timeSpent.minValue && point.time_spent[1] === timeSpent.maxValue)
                    // Sets the time spent id as the current time spents's id
                    timeSpentId = timeSpent.id;
            });

            // If the point does not already exist in the data base...
            if((allIdPointList.includes(point.id) === false))
            {
                // Creates a point model
                var pointModel = new Point( point.id, 
                                            point.name, 
                                            point.address, 
                                            coordinatesId, 
                                            point.rating ?? null, 
                                            point.rating_n ?? null,
                                            point.current_popularity ?? null,
                                            timeSpentId ?? null);
                // Gets the create query
                var createPointQuery = pointModel.Create();
                // Gets the result and adds the point to the data base
                var pointResult = await GetQueryResultAsync(createPointQuery);
                var test = pointResult;
            }
            // Else...
            else
            {
                /* TODO -> Update the point */
            }
        });

        points.forEach(async x => {
            // For each type in the data base...
            allTypes.forEach(async type => {
                
                // If the point of interest's types include the type...
                if(x.types.includes(type.name))
                {
                    if((allPointIdList.includes(x.id) === false) && (allTypeIdList.includes(type.id) === false))
                    {
                        // Creates a new point and type
                        var pointAndType = new PointAndType(x.id, type.id)
                        // Gets the create SQL query for the current point and type
                        var createPointAndTypeQuery = pointAndType.Create();
                        // Executes the query
                        var pointAndTypeResult = await GetQueryResultAsync(createPointAndTypeQuery);
                        var test = pointAndTypeResult;
                    }
                }
            });

            var populartimes = x.populartimes;
              
            populartimes.forEach(async populartime => {
                if((allPopularTimesNameList.includes(x.populartimes.name) === false) && (allPopularTimesPointIdList.includes(x.id) === false))
                {
                    var hourData = [populartime.data[0], populartime.data[1],populartime.data[2],populartime.data[3]
                    ,populartime.data[4],populartime.data[5],populartime.data[6],populartime.data[7]
                    ,populartime.data[8],populartime.data[9],populartime.data[10],populartime.data[11],populartime.data[12],populartime.data[13]
                    ,populartime.data[14],populartime.data[15],populartime.data[16],populartime.data[17],populartime.data[18],populartime.data[19]
                    ,populartime.data[20],populartime.data[21]
                    ,populartime.data[22],populartime.data[23]];

                    let popularTimeModel = new PopularTime(populartime.name, hourData[0], hourData[1] ,hourData[2], hourData[3],
                        hourData[4], hourData[5], hourData[6], hourData[7],
                        hourData[8], hourData[9], hourData[10], hourData[11], hourData[12], hourData[13],
                        hourData[14], hourData[15], hourData[16], hourData[17], hourData[18], hourData[19],
                        hourData[20], hourData[21], hourData[22], hourData[23], x.id);
                    // Gets the query to create an instance in the data base
                    let popularTimeQuery = popularTimeModel.Create();
                    // Execute the query
                    var result = await GetQueryResultAsync(popularTimeQuery);
                }
            });
        });

        // types.forEach(async type => {
            
        //     // Searches tthrough the table types in the data base and returns the type with the given name
        //     let findQuery = `SELECT id FROM types WHERE name = "${type}";`;
            
        //     // Execute the query
        //     var results =  await GetQueryResultAsync(findQuery);  
        //     console.log(results.toString())  
        // });

        // Set the body of the response
        res.status(200).json(points);

    } 
    catch(e) {
        console.log('Error:', e.stack);
    }

};


 