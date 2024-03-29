const GetQueryResultAsync = require('../config/db');
const Point = require('../models/Point');
// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");

/**
 ** Gets all the points
 */
 exports.GetAllPoints = async (req, res, next) => {
    let query = Point.GetAll();
    
    // Execute the query
    var result = await GetQueryResultAsync(query);

    // Set the body of the response
    res.status(200).json(result);
};

/**
 ** Gets the point and types
 */
 exports.GetPointTypes = async(req, res, next) => {
    let query = Point.GetPointTypes();

    // Execute the query
    var result = await GetQueryResultAsync(query);

    // Set the body of the response
    res.status(200).json(result);
};

/**
 ** Deletes all the points
 */
 exports.DeleteAllPoints = async (req, res, next) => {

    let query = Point.DeleteAll();

    // Execute the query
    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found.`, 404));
    }

    // Set the body of the response
    res.status(200).json(result);
};

/**
 ** Creates a new point
 */
 exports.CreateNewPoint =  async (req, res, next) => {
    let point = new Point(req.body.id, req.body.name, req.body.address, req.body.coordinatesId, req.body.rating, req.body.ratingNumber, req.body.currentPopularity, req.body.timespentId);
    
    // Gets the sql query for creating the user
    let query = point.Create();
    
    // Execute the query
    var result = await GetQueryResultAsync(query);
    
    res.status(201).json(result);
};

/**
 ** Gets the point with the given id from the database
 */
 exports.GetPointById = async (req, res, next) => {

    let query = Point.GetById(req.params.id);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The user with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(result[0]);
};

/**
 ** Updates the point with the given id
 */
 exports.UpdatePointById = async (req, res, next) => {
    
    let query = Point.UpdateById(req.params.id, req.body.name, req.body.address, req.body.coordinatesId, req.body.rating, req.body.ratingNumber, req.body.currentPopularity, req.body.timespentId);
    
    var result = await GetQueryResultAsync(query);

    let query2 = Point.GetById(req.params.id);

    var result2 = await GetQueryResultAsync(query2);

    if(result2.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The point with id ${req.params.id} was not found.`, 404));
    }

    res.status(201).json(result2);
};

/**
 ** Deletes the point with the given id
 */
 exports.DeletePointById = async (req, res, next) => {
    
    let query = Point.DeleteById(req.params.id);
    var result = await GetQueryResultAsync(query);

    if(!result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The point with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(Point);
};
