const GetQueryResultAsync = require('../config/db');
const ControllerHelpers = require('../helpers/ControllerHelpers');

const ConfirmedCase = require('../models/ConfirmedCase');



// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");

 exports.GetAllConfirmedCases = async (req, res, next) => {

    let query = ConfirmedCase.GetAll();

    // Execute the query
    var result = await GetQueryResultAsync(query);

    // if(result.length == 0) {
    //     return next(new ErrorResponse(`ERROR 404: Not found.`, 404));
    // }

    // Set the body of the response
    res.status(200).json(result);
};

exports.GetAllConfirmedCasesCaseWasHere = async (req, res, next) => {

    let query = ConfirmedCase.GetAllConfirmedCasesCaseWasHere(req.query);

    var result = await GetQueryResultAsync(query);

    // if(result.length == 0) {
    //     return next(new ErrorResponse(`ERROR 404: Not found.`, 404));
    // }

    // Set the body of the response
    res.status(200).json(result);
};

 exports.GetAllConfirmedCasesTypes = async (req, res, next) => {
    let query = ConfirmedCase.GetAllConfirmedCasesTypes();

    var result = await GetQueryResultAsync(query);

    // Set the body of the response
    res.status(200).json(result); 
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
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
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 exports.GetConfirmedCaseById = (async (req, res, next) => {

    let query = ConfirmedCase.GetById(req.params.id);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The confirmed case with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(result[0]);
});

/*
exports.GetConfirmedCaseByUserId = (async (req, res, next) => {

    let query = ConfirmedCase.GetByUserId(req.params.id);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The confirmed case with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(result[0]);
});
*/

 exports.UpdateConfirmedCaseById = (async (req, res, next) => {
    
    let query = ConfirmedCase.UpdateById(req.params.id, req.body.date);
    
    var result = await GetQueryResultAsync(query);

    let query2 = ConfirmedCase.GetById(req.params.id);

    var result2 = await GetQueryResultAsync(query2);

    if(result2.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The confirmed case with id ${req.params.id} was not found.`, 404));
    }

    res.status(201).json(result2);

});

/**
 * TODO Delete 
 */
exports.DeleteConfirmedCaseById = (async (req, res, next) => {
    
    let query = ConfirmedCase.DeleteById(req.params.id);
    var result = await GetQueryResultAsync(query);

    if(!result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The confirmed case with id ${req.params.id} was not found.`, 404));
    }


    res.status(200).json(ConfirmedCase);

});

