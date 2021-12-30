const GetQueryResultAsync = require('../config/db');

const ControllerHelpers = require('../helpers/ControllerHelpers');

const Admin = require('../models/Admin');

// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");


/**
 * TODO Call the method from the Model with the return query
 */
exports.GetAllAdmins = async (req, res, next) => {

    var query = `SELECT * FROM admins`;

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
exports.CreateNewAdmin =  async (req, res, next) => {
    let admin = new Admin(req.body.username, req.body.password);
    
    // Gets the sql query for creating the admin
    let query = admin.Create();
    
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
exports.GetAdminById = (async (req, res, next) => {

    let query = Admin.GetById(req.params.id);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The admin with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(result[0]);
});

/**
 * TODO Update  
 */
exports.UpdateAdminById = (async (req, res, next) => {
    
    let query = Admin.GetById(req.params.id);
    var result = await GetQueryResultAsync(query);

    if(!result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The username with id ${req.params.id} was not found.`, 404));
    }

    let queryProperties = "";

    // username = ${newUsername}

    if(!ControllerHelpers.IsNullOrEmpty(req.body.username))
        queryProperties += `username = ${req.body.username}, `;

    if(!ControllerHelpers.IsNullOrEmpty(req.body.password))
        queryProperties += `password = ${req.body.password}, `;

    res.status(201).json(result);

});

/**
 * TODO Delete 
 */
exports.DeleteAdminById = (async (req, res, next) => {
    
    let query = Admin.GetById(req.params.id);
    var result = await GetQueryResultAsync(query);

    if(!result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The username with id ${req.params.id} was not found.`, 404));
    }


    res.status(200).json(admin);

});

