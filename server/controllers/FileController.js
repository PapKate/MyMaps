const fs = require("fs").promises;

const GetQueryResultAsync = require('../config/db');

const Type = require('../models/Type');
const Coordinate = require('../models/Coordinate');
const TimeSpent = require('../models/TimeSpent');
const PopularTime = require('../models/PopularTime');
const Point = require('../models/Point');
const PointAndType = require('../models/PointAndType');
const ControllerHelpers = require("../helpers/ControllerHelpers");
/**
 ** Uploads a file and passes its POI data to the data base
 */
 exports.GetFile = async (req, res, next) => {
    // Try...
    try 
    {
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
 
        var pointsToUpdate = [];
 
        var getAllPointsQuery = Point.GetAll();

        var allPoints = await GetQueryResultAsync(getAllPointsQuery);

        var allIdPointList = allPoints.map(x => x.id);

        var pointsFromFile = [];

        // Reads the path from the request's body as a text
        var data = await fs.readFile(req.body.path, 'utf8');
        // Parses it to JSON
        var points = JSON.parse(data);

        // For each point of interest...
        points.forEach(async point => {
            // If the point already exist in the data base...
            if((allIdPointList.includes(point.id) === true))
            {
                pointsToUpdate.push(point);
            }
        });

        pointsToUpdate.forEach(async point => 
        {
            let pointAndTypesDeleteQuery = PointAndType.DeleteById(point.id);
            GetQueryResultAsync(pointAndTypesDeleteQuery);
            
            let popularTimesDeleteQuery = PopularTime.DeleteById(point.id);
            await GetQueryResultAsync(popularTimesDeleteQuery);

            let pointsDeleteQuery = Point.DeleteById(point.id);
            await GetQueryResultAsync(pointsDeleteQuery);
        });

        var typesFromFile = [];
        var timeSpentFromFile = [];
        var coordinatesFromFile = [];

        points.forEach(async x => {
            var id = x.id;

            var types = x.types;

            types.forEach(async type => {
                // Check if type does NOT exist in the data base...
                if(allTypesList.includes(type) === false)
                {
                    // Adds the type name to the list
                    allTypesList.push(type);
                    typesFromFile.push(`"${type}"`);
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
                coordinatesFromFile.push(`${coordinatesModel.lat},
                                         ${coordinatesModel.lng}`);
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
                    timeSpentFromFile.push(`${timeSpentModel.minValue}, ${timeSpentModel.maxValue}`);
                }
            }
        });
        
        if(typesFromFile.length > 0)
        {
            let typeValuesQuery = ControllerHelpers.FormatValuesForBulkInsert(typesFromFile);
            let typeQuery = Type.BulkCreate(typeValuesQuery);
            // Execute the query
            await GetQueryResultAsync(typeQuery);
        }

        if(coordinatesFromFile.length > 0)
        {
            // Gets the query to create an instance in the data base
            let coordinateValuesQuery = ControllerHelpers.FormatValuesForBulkInsert(coordinatesFromFile);
            let coordinateQuery = Coordinate.BulkCreate(coordinateValuesQuery);
            // Execute the query
            await GetQueryResultAsync(coordinateQuery);
        }

        if(timeSpentFromFile.length > 0)
        {
            // Gets the query to create an instance in the data base
            let timeSpentValuesQuery = ControllerHelpers.FormatValuesForBulkInsert(timeSpentFromFile);
            let timeSpentQuery = TimeSpent.BulkCreate(timeSpentValuesQuery);
            // Execute the query
            await GetQueryResultAsync(timeSpentQuery);
        }

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

        allPoints = await GetQueryResultAsync(getAllPointsQuery);

        allIdPointList = allPoints.map(x => x.id);

        var pointsFromFile = [];

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
                let dateTimeNow = ControllerHelpers.GetCurrentDateTime();
                let dateCreated = dateTimeNow;
                let dateModified = dateTimeNow;

                // Creates a point model
                var pointModel = new Point( point.id, 
                                            point.name, 
                                            point.address, 
                                            coordinatesId, 
                                            point.rating ?? null, 
                                            point.rating_n ?? null,
                                            point.current_popularity ?? null,
                                            timeSpentId ?? null);
                pointsFromFile.push(`"${pointModel.id}", 
                                    "${pointModel.name}", 
                                    "${pointModel.address}",
                                    ${pointModel.coordinatesId}, 
                                    ${pointModel.rating}, 
                                    ${pointModel.ratingNumber}, 
                                    ${pointModel.currentPopularity}, 
                                    ${pointModel.timespentId},
                                    "${dateCreated}",
                                    "${dateModified}"`);
            }
        });

        if(pointsFromFile.length > 0)
        {
            let pointValuesQuery = ControllerHelpers.FormatValuesForBulkInsert(pointsFromFile);
            let pointQuery = Point.BulkCreate(pointValuesQuery);
            // Execute the query
            await GetQueryResultAsync(pointQuery);
        }

        let pointAndTypesFromFile = [];
        let popularTimesFromFile = [];
        points.forEach(async x => {
            // For each type in the data base...
            allTypes.forEach(async type => {
                
                // If the point of interest's types include the type...
                if(x.types.includes(type.name))
                {
                    if((allPointIdList.includes(x.id) === false) && (allTypeIdList.includes(type.id) === false))
                    {
                        // Creates a new point and type
                        var pointAndType = new PointAndType(x.id, type.id);
                        pointAndTypesFromFile.push(`"${pointAndType.pointId}", ${pointAndType.typeId}`);
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
                        
                    popularTimesFromFile.push(`"${popularTimeModel.name}", ${popularTimeModel.hour00}, ${popularTimeModel.hour01},
                                                ${popularTimeModel.hour02}, ${popularTimeModel.hour03},${popularTimeModel.hour04},
                                                ${popularTimeModel.hour05}, ${popularTimeModel.hour06},${popularTimeModel.hour07},
                                                ${popularTimeModel.hour08}, ${popularTimeModel.hour09},${popularTimeModel.hour10},
                                                ${popularTimeModel.hour11}, ${popularTimeModel.hour12},${popularTimeModel.hour13},
                                                ${popularTimeModel.hour14}, ${popularTimeModel.hour15},${popularTimeModel.hour16},
                                                ${popularTimeModel.hour17}, ${popularTimeModel.hour18},${popularTimeModel.hour19},
                                                ${popularTimeModel.hour20}, ${popularTimeModel.hour21},${popularTimeModel.hour22},
                                                ${popularTimeModel.hour23}, "${popularTimeModel.pointId}"`);
                }
            });
        });
        if(pointAndTypesFromFile.length > 0)
        {
            let pointAndTypeValuesQuery = ControllerHelpers.FormatValuesForBulkInsert(pointAndTypesFromFile);
            let pointAndTypeQuery = PointAndType.BulkCreate(pointAndTypeValuesQuery);
            // Execute the query
            await GetQueryResultAsync(pointAndTypeQuery);
        }
        
        if(popularTimesFromFile.length > 0)
        {
            let popularTimeValuesQuery = ControllerHelpers.FormatValuesForBulkInsert(popularTimesFromFile);
            let popularTimeQuery = PopularTime.BulkCreate(popularTimeValuesQuery);
            // Execute the query
            await GetQueryResultAsync(popularTimeQuery);
        }

        // Set the body of the response
        res.status(200).json(points);
    } 
    catch(e) {
        console.log('Error:', e.stack);
    }
};


 