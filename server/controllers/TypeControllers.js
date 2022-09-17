const GetQueryResultAsync = require('../config/db');

const Type = require('../models/Type');

// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");

/**
 ** Gets all the types
 */
 exports.GetAllTypes = async (req, res, next) => {

    var query = Type.GetAll();
    // Execute the query
    var results = await GetQueryResultAsync(query);

    // Set the body of the response
    res.status(200).json(results);
};

/**
 ** Creates a new type 
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
 ** Gets the type with the given id 
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
 ** Updates the type with the given id  
 */
 exports.UpdateTypeById = (async (req, res, next) => {
    
    let query = Type.UpdateById(req.params.id, req.body.name);
    var result = await GetQueryResultAsync(query);
    let query2 = Type.GetById(req.params.id);
    var result2 = await GetQueryResultAsync(query2);

    if(result2.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The type with id ${req.params.id} was not found.`, 404));
    }

    res.status(201).json(result2);
});

/**
 ** Deletes the type with the given id 
 */
 exports.DeleteTypeById = (async (req, res, next) => {
    
    let query = Type.DeleteById(req.params.id);
    var result = await GetQueryResultAsync(query);

    res.status(200).json(Type);
});

