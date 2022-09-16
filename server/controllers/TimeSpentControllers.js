const GetQueryResultAsync = require('../config/db');

const ControllerHelpers = require('../helpers/ControllerHelpers');

const TimeSpent = require('../models/TimeSpent');

// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");

/**
 * Get all
 */
 exports.GetAllTimeSpents = async (req, res, next) => {

    var query = `SELECT * FROM timespent`;

    // Execute the query
    var results = await GetQueryResultAsync(query);

    // Set the body of the response
    res.status(200).json(results);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.CreateNewTimeSpent =  async (req, res, next) => {
    let timeSpent = new TimeSpent(req.body.minValue, req.body.maxValue);
    
    // Gets the sql query for creating the timeSpent
    let query = timeSpent.Create();
    
    // Execute the query
    var result = await GetQueryResultAsync(query);
    
    res.status(201).json(result);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.GetTimeSpentById = (async (req, res, next) => {

    let query = TimeSpent.GetById(req.params.id);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The timeSpent with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(result[0]);
});

/**
 * Update  
 */
exports.UpdateTimeSpentById = (async (req, res, next) => {
    
    let query = TimeSpent.UpdateById(req.params.id, req.body.minValue, req.body.maxValue);
    var result = await GetQueryResultAsync(query);
    let query2 = TimeSpent.GetById(req.params.id);
    var result2 = await GetQueryResultAsync(query2);

    if(result2.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The timeSpent with id ${req.params.id} was not found.`, 404));
    }
    res.status(201).json(result2);
});

/**
 * Delete 
 */
 exports.DeleteTimeSpentById = (async (req, res, next) => {
    
    let query = TimeSpent.DeleteById(req.params.id);
    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The timeSpent with id ${req.params.id} was not found.`, 404));
    }


    res.status(200).json(TimeSpent);

});

