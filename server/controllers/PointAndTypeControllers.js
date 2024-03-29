const GetQueryResultAsync = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');
const Point = require('../models/Point');

const PointAndType = require('../models/PointAndType');

// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");

 exports.GetAllPointAndTypes = async (req, res, next) => {

    let query = PointAndType.GetAll();

    // Execute the query
    var result = await GetQueryResultAsync(query);

    // Set the body of the response
    res.status(200).json(result);
};

/**
 ** Creates a new point and type pair
 */
 exports.CreateNewPointAndType =  async (req, res, next) => {
    let pointandtype = new PointAndType(req.body.pointId, req.body.typeId);
    
    // Gets the sql query for creating the user
    let query = pointandtype.Create();
    
    // Execute the query
    var result = await GetQueryResultAsync(query);
    
    res.status(201).json(result);
};

/**
 ** Gets the point and type pair by the given id
 */
 exports.GetPointAndTypeById = (async (req, res, next) => {

    let query = PointAndType.GetById(req.params.id);

    var result = await GetQueryResultAsync(query);

    res.status(200).json(result[0]);
});

/**
 ** Updates the point and type pair by the given id
 */
 exports.UpdatePointAndTypeById = (async (req, res, next) => {
    
    let query = PointAndType.UpdateById(req.params.id, req.body.pointId, req.body.typeId);
    
    var result = await GetQueryResultAsync(query);

    let query2 = PointAndType.GetById(req.params.id);

    var result2 = await GetQueryResultAsync(query2);

    res.status(201).json(result2);
});

/**
 ** Deletes the pair
 */
exports.DeletePointAndType = (async (req, res, next) => {
    
    let query = PointAndType.DeleteById(req.params.pointId);
    var result = await GetQueryResultAsync(query);

    res.status(200).json(PointAndType);
});

