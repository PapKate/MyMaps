
const GetQueryResultAsync = require('../config/db');

const User = require('../models/User');
const Point = require('../models/Point');
const PointCheckIn = require('../models/PointCheckIn');
const ConfirmedCase = require('../models/ConfirmedCase');
const ControllerHelpers = require("../helpers/ControllerHelpers");


 exports.AddData = async (req,res,next) => {
    // Try...
    try 
    {
        // The query to get all the users in the data base
        var getAllUsersQuery = User.GetAll();
        // Calls the data base and gets all the users
        var allUsers = await GetQueryResultAsync(getAllUsersQuery);
        // A list for all the new users
        var newUsers = [];

        var indexStart = req.body.indexStart;
        var indexEnd = req.body.indexEnd;

        // If the database does not contain any users...
        if(allUsers.length === 0)
        {
            let dateTimeNow = "2022-08-01 00:00:00";

            let dateCreated = dateTimeNow;
            let dateModified = dateTimeNow;
            // For 5 times...
            for (let i = indexStart; i < indexEnd; i++) 
            {
                // Creates a new user model
                var userModel = new User(`User${i}`, `user${i}@mail.com`, `user${i}pass`);
    
                // Adds the user model's data to the new users' list
                newUsers.push(`"${userModel.username}", "${userModel.email}", "${userModel.password}", '${dateCreated}', '${dateModified}'`);
            }    
        }

        // If there are new users...
        if(newUsers.length > 0)
        {
            // Creates the values for the bulk insert query
            let userValuesQuery = ControllerHelpers.FormatValuesForBulkInsert(newUsers);
            // Creates the bulk insert query
            let userQuery = User.BulkCreate(userValuesQuery);
            // Executes the query
            await GetQueryResultAsync(userQuery);
        }

        // The query to get all the users in the data base
        getAllUsersQuery = User.GetAll();
        // Calls the data base and gets all the users
        allUsers = await GetQueryResultAsync(getAllUsersQuery);
        
        var allIdUserList = allUsers.map(x => x.id);

        // The query to get all the users in the data base
        getAllPointsQuery = Point.GetAll();
        // Calls the data base and gets all the users
        allPoints = await GetQueryResultAsync(getAllPointsQuery);
        
        var allIdPointList = allPoints.map(x => x.id);        

        // A list for all the new point check in
        var newPointCheckIn = [];

        allIdUserList.forEach(async userId => {
            
            for (let i = 0; i < 20; i++) 
            {
                // Get random customer number 
                let randomCustomers = Math.floor((Math.random() * 100) + 1);
                // Get random date number between August 1st and current date
                var randomDate = ControllerHelpers.RandomDate(new Date(2022, 8, 1), new Date())
                // Get random point id
                var pointId = allIdPointList[Math.floor(Math.random()*allIdPointList.length)];

                // Creates Point Check In Model
                var pointCheckInModel = new PointCheckIn(userId, `${pointId}`, randomCustomers, `${ControllerHelpers.FormatDateTime(randomDate)}` )

                // Adds the point check in model's data to the new point check ins' list
                newPointCheckIn.push(`${pointCheckInModel.userId}, "${pointCheckInModel.pointId}", ${pointCheckInModel.customers}, '${pointCheckInModel.checkInDate}'`);
            }
        })

        // If there are new point check ins...
        if(newPointCheckIn.length > 0)
        {
            // Creates the values for the bulk insert query
            let pointCheckInValuesQuery = ControllerHelpers.FormatValuesForBulkInsert(newPointCheckIn);
            // Creates the bulk insert query
            let pointCheckInQuery = PointCheckIn.BulkCreate(pointCheckInValuesQuery);
            // Executes the query
            await GetQueryResultAsync(pointCheckInQuery);
        }

        var getAllConfirmedCases = ConfirmedCase.GetAll();
        var allConfirmedCases = await GetQueryResultAsync(getAllConfirmedCases);

    } 
    // If there is an error...
    catch (error) 
    {
        // Prints the error...
        console.log('Error:', e.stack);
    }
}