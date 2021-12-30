const GetQueryResultAsync = require('../config/db');

const ControllerHelpers = require('../helpers/ControllerHelpers');

const Type = require('../models/Type');

// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");

/**
 * TODO Call the method from the Model with the return query
 */
 exports.GetAllTypes = async (req, res, next) => {

    var query = `SELECT * FROM types`;

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
exports.CreateNewType =  async (req, res, next) => {
    let type = new Type(req.body.name);
    
    // Gets the sql query for creating the type
    let query = type.Create();
    
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
exports.GetTypeById = (async (req, res, next) => {

    let query = Type.GetById(req.params.id);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The type with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(result[0]);
});

/**
 * TODO Update  
 */
exports.UpdateTypeById = (async (req, res, next) => {
    
    let query = Type.GetById(req.params.id);
    var result = await GetQueryResultAsync(query);

    if(!result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The type with id ${req.params.id} was not found.`, 404));
    }

    let queryProperties = "";

    if(!ControllerHelpers.IsNullOrEmpty(req.body.name))
        queryProperties += `name = ${req.body.name}, `;

    res.status(201).json(result);

});

/**
 * TODO Delete 
 */
exports.DeleteTypeById = (async (req, res, next) => {
    
    let query = Type.GetById(req.params.id);
    var result = await GetQueryResultAsync(query);

    if(!result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The type with id ${req.params.id} was not found.`, 404));
    }


    res.status(200).json(type);

});

