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

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found.`, 404));
    }

    // Set the body of the response
    res.status(200).json(result);
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
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
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.GetPointAndTypeById = (async (req, res, next) => {

    let query = PointAndType.GetById(req.params.id);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The point and type with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(result[0]);
});

/**
 * 
 */
exports.UpdatePointAndTypeById = (async (req, res, next) => {
    
    let query = PointAndType.UpdateById(req.params.id);
    var result = await GetQueryResultAsync(query);

    if(!result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The point and type with id ${req.params.id} was not found.`, 404));
    }


    res.status(201).json(result[0]);

});

/**
 * TODO Delete 
 */
exports.DeletePointAndTypeById = (async (req, res, next) => {
    
    let query = PointAndType.DeleteById(req.params.id);
    var result = await GetQueryResultAsync(query);

    if(!result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The point and type with id ${req.params.id} was not found.`, 404));
    }


    res.status(200).json(PointAndType);

});

