const GetQueryResultAsync = require('../config/db');
const PointCheckIn = require('../models/PointCheckIn');
// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");

/**
 * Gets all the point check ins from the data base
 */
exports.GetAllPointCheckIns = async (req, res, next) => {

    let query = PointCheckIn.GetAll();
    var home = req.query.checkInDate;
    // Execute the query
    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found.`, 404));
    }

    // Set the body of the response
    res.status(200).json(result);
};

/**
 * Deletes all the point check ins from the data base
 */
exports.DeleteAllPointCheckIns = async (req, res, next) => {

    let query = PointCheckIn.DeleteAll();

    // Execute the query
    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found.`, 404));
    }

    // Set the body of the response
    res.status(200).json(result);
};

/**
 * Creates a new point check in in the data base
 */
exports.CreateNewPointCheckIn =  async (req, res, next) => {
    let pointCheckIn = new PointCheckIn(req.body.id, req.body.userId, req.body.pointId, req.body.customers, req.body.checkInDate);
    
    // Gets the sql query for creating the user
    let query = pointCheckIn.Create();
    
    // Execute the query
    var result = await GetQueryResultAsync(query);
    
    res.status(201).json(result);
};