// const fs = require("fs").promises;

const GetQueryResultAsync = require('../config/db');

const Type = require('../models/Type');
const Coordinate = require('../models/Coordinate');
const TimeSpent = require('../models/TimeSpent');
/**
 * Uploads a file and passes its POI data to the data base
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

 exports.GetFile = async (req,res,next) =>{

    try {
        var fs = require('fs');

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
        var allCoordinatesList = allCoordinates.map(x => {x.lat, x.lng});

        // The query to get all the timespents in the data base
        var getAllTimeSpentQuery = TimeSpent.GetAll();
        // Calls the data base and gets all the timespents
        var allTimeSpents = await GetQueryResultAsync(getAllTimeSpentQuery);
        // Gets the names of all the timespents
        var allTimeSpentsList = [];
        
        // For each time spent pair...
        allTimeSpents.forEach(x => {
            // Create an array with the min and max values
            var array = [x.minValue, x.maxValue];
            // Adds it to the list
            allTimeSpentsList.push(array);
        });

        // Reads the path from the request's body as a text
        var data = await fs.readFile(req.body.path, 'utf8');
        // Parses it to JSON
        var jsonData = JSON.parse(data);

        jsonData.forEach(async x => {
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
            if(allCoordinatesList.includes({lat, lng}) === false)
            {
                // Adds the lat lng pair to the list
                allCoordinatesList.push({lat, lng});
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
                if(allTimeSpentsList.includes(valueData) === false)
                {
                    // Adds the minValue and maxValue pair to the list
                    allTimeSpentsList.push(valueData);
                    // Creates the timespent model
                    let timeSpentModel = new TimeSpent(valueData[0],valueData[1]);
                    // Gets the query to create an instance in the data base
                    let timeSpentQuery = timeSpentModel.Create();
                    // Execute the query
                    var result = await GetQueryResultAsync(timeSpentQuery);
                }
            }

        });
        // Set the body of the response

        res.status(200).json(jsonData);

    } 
    catch(e) {
        console.log('Error:', e.stack);
    }

};


 