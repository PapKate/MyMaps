const GetQueryResultAsync = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');

const ConfirmedCase = require('../models/ConfirmedCase');

// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");

/**
 ** Gets all the confirmed cases
 */
 exports.GetAllConfirmedCases = async (req, res, next) => {

    let query = ConfirmedCase.GetAll();

    // Execute the query
    var result = await GetQueryResultAsync(query);

    // Set the body of the response
    res.status(200).json(result);
};

/**
 ** Gets all the check in of a user with id the given id that are +-2 hours from a confirmed case's check in 
 ** That are up to 7 days before the given date
 */
 exports.GetAllConfirmedCasesCaseWasHere = async (req, res, next) => {

    let query = ConfirmedCase.GetAllConfirmedCasesCaseWasHere(req.query);

    var result = await GetQueryResultAsync(query);

    // Set the body of the response
    res.status(200).json(result);
};

/**
 ** Gets all the types of the confirmed cases check ins'
 */
 exports.GetAllConfirmedCasesTypes = async (req, res, next) => {
    let query = ConfirmedCase.GetAllConfirmedCasesTypes();

    var result = await GetQueryResultAsync(query);

    // Set the body of the response
    res.status(200).json(result); 
};

/**
 ** Creates a new confirmed case
 */
 exports.CreateNewConfirmedCase =  async (req, res, next) => {
    let confirmedCase = new ConfirmedCase(req.body.userId, req.body.date);
    
    // Gets the sql query for creating the confirmed case
    let query = confirmedCase.Create();
    
    // Execute the query
    var result = await GetQueryResultAsync(query);
    
    res.status(201).json(result);
};

/**
 ** Gets a confirmed case by id 
 */
 exports.GetConfirmedCaseById = (async (req, res, next) => {

    let query = ConfirmedCase.GetById(req.params.id);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The confirmed case with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(result[0]);
});

/**
 ** Updates the confirmed case with the given id 
 */
 exports.UpdateConfirmedCaseById = (async (req, res, next) => {
    
    let query = ConfirmedCase.UpdateById(req.params.id, req.body.date);
    var result = await GetQueryResultAsync(query);

    res.status(201).json(result2);
});

/**
 ** Deletes a confirmed case with the given id
 */
 exports.DeleteConfirmedCaseById = (async (req, res, next) => {
    
    let query = ConfirmedCase.DeleteById(req.params.id);
    var result = await GetQueryResultAsync(query);
    
    res.status(200).json(ConfirmedCase);
});