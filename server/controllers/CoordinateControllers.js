const GetQueryResultAsync = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');

const Coordinate = require('../models/Coordinate');

// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");

/**
 ** Gets all the coordinates 
 */
 exports.GetAllCoordinates = async (req, res, next) => {

    let query =  Coordinate.GetAll();

    // Execute the query
    var result = await GetQueryResultAsync(query);

    // Set the body of the response
    res.status(200).json(result);
};

/**
 ** Creates a new coordinate and adds it to the database
 */
 exports.CreateNewCoordinate =  async (req, res, next) => {

    let  coordinate = new Coordinate(req.body.lat, req.body.lng);
    
    // Gets the sql query for creating the user
    let query = coordinate.Create();
    
    // Execute the query
    var result = await GetQueryResultAsync(query);
    
    res.status(201).json(result);
};

/**
 ** Gets the coordinates with the given id 
 */
 exports.GetCoordinateById = (async (req, res, next) => {

    let query = Coordinate.GetById(req.params.id);

    var result = await GetQueryResultAsync(query);

    res.status(200).json(result[0]);
});

/**
 ** Updates the coordinate with the id 
 */
 exports.UpdateCoordinateById = async (req, res, next) => {
    
    let query = Coordinate.UpdateById(req.params.id, req.body.lat, req.body.lng);
    
    var result = await GetQueryResultAsync(query);

    let query2 = Coordinate.GetById(req.params.id);

    var result2 = await GetQueryResultAsync(query2);

    if(result2.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The coordinate with id ${req.params.id} was not found.`, 404));
    }

    res.status(201).json(result2);
};

/**
 ** Deletes the coordinate with the given id
 */
 exports.DeleteCoordinateById = (async (req, res, next) => {
    
    let query = Coordinate.DeleteById(req.params.id);
    var result = await GetQueryResultAsync(query);

    if(!result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The coordinate with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(Coordinate);
});

