const GetQueryResultAsync = require('../config/db');

const ControllerHelpers = require('../helpers/ControllerHelpers');

const User = require('../models/User');

// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");

 exports.GetAllUsers = async (req, res, next) => {

    let query = User.GetAll();

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
 exports.CreateNewUser =  async (req, res, next) => {
    let user = new User(req.body.username, req.body.email, req.body.password);
    
    // Gets the sql query for creating the user
    let query = user.Create();
    
    // Execute the query
    var result = await GetQueryResultAsync(query);
    
    res.status(201).json(result);
};

/**
 * Gets a user with id the specified id
 */
 exports.GetUserById = async (req, res, next) => {

    let query = User.GetById(req.params.id);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The user with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(result[0]);
};

 exports.GetLoginUser = async (req, res, next) => {

    let query = User.LoginUser(req.body.username, req.body.password);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The user with username ${req.body.username} was not found.`, 404));
    }

    res.status(201).json(result);
};
 

/**
 * 
 * TODO Update  
 */
 exports.UpdateUserById = async (req, res, next) => {
    
    let query = User.UpdateById(req.params.id, req.body.username, req.body.password);
    
    var result = await GetQueryResultAsync(query);

    let query2 = User.GetById(req.params.id);

    var result2 = await GetQueryResultAsync(query2);

    if(result2.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The username with id ${req.params.id} was not found.`, 404));
    }

    res.status(201).json(result2);
};

/**
 * 
 */
 exports.DeleteUserById = async (req, res, next) => {
    
    let query = User.DeleteById(req.params.id);
    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The username with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(User);
};