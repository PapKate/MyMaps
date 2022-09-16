const GetQueryResultAsync = require('../config/db');

const ControllerHelpers = require('../helpers/ControllerHelpers');

const PopularTime = require('../models/PopularTime');

// Imports the custom error response 
const ErrorResponse = require("../utils/errorResponse");

/**
 * TODO Call the method from the Model with the return query
 */
 exports.GetAllPopularTimes = async (req, res, next) => {

   var query = PopularTime.GetAll();

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
 exports.CreateNewPopularTime =  async (req, res, next) => {
    let popularTime = new PopularTime(req.body.name, req.body.hour00, req.body.hour01, req.body.hour02, req.body.hour03, req.body.hour04, req.body.hour05, req.body.hour06, req.body.hour07, req.body.hour08, req.body.hour09, req.body.hour10, req.body.hour11, req.body.hour12, req.body.hour13, req.body.hour14, req.body.hour15, req.body.hour16, req.body.hour17, req.body.hour18, req.body.hour19, req.body.hour20, req.body.hour21, req.body.hour22, req.body.hour23, req.body.pointId);
    
    // Gets the sql query for creating the user
    let query = popularTime.Create();
    
    // Execute the query
    var result = await GetQueryResultAsync(query);
    
    res.status(201).json(result);
};

 exports.DeletePopularTimes = async (req, res, next) => {
   let query = PopularTime.DeleteAll();
   var result = await GetQueryResultAsync(query);

   
   if(!result.length == 0) {
   return next(new ErrorResponse(`ERROR 404: Not found. The point and type with id ${req.params.id} was not found.`, 404));
  }


  res.status(200).json(PopularTime);
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
 exports.GetPopularTimeById = (async (req, res, next) => {

    let query = PopularTime.GetById(req.params.id);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The popular time with id ${req.params.id} was not found.`, 404));
    }

    res.status(200).json(result[0]);
});

 exports.GetPopularTimeByPointId = (async (req, res, next) => {

    let query = PopularTime.GetByPointId(req.params.pointId);

    var result = await GetQueryResultAsync(query);

    if(result.length == 0) {
        return next(new ErrorResponse(`ERROR 404: Not found. The popular time with id ${req.params.pointId} was not found.`, 404));
    }

    res.status(200).json(result[0]);
});

/**
 * TODO Update  
 */
 exports.UpdatePopularTimeById = (async (req, res, next) => {
    
   let query = PopularTime.UpdateById(req.params.id, req.body.name, req.body.hour00, req.body.hour01, req.body.hour02, req.body.hour03, req.body.hour04, req.body.hour05, req.body.hour06, req.body.hour07, req.body.hour08, req.body.hour09, req.body.hour10, req.body.hour11, req.body.hour12, req.body.hour13, req.body.hour14, req.body.hour15, req.body.hour16, req.body.hour17, req.body.hour18, req.body.hour19, req.body.hour20, req.body.hour21, req.body.hour22, req.body.hour23, req.body.pointId);
   var result = await GetQueryResultAsync(query);
   let query2 = PopularTime.GetById(req.params.id);
   var result2 = await GetQueryResultAsync(query2);

   if(result2.length == 0) {
      return next(new ErrorResponse(`ERROR 404: Not found. The popular time with id ${req.params.id} was not found.`, 404));
   }

   res.status(201).json(result2);

});

/**
 * TODO Delete 
 */
 exports.DeletePopularTimeById = (async (req, res, next) => {
    
   let query = PopularTime.DeleteById(req.params.pointId);
   var result = await GetQueryResultAsync(query);

   res.status(200).json(PopularTime);
});

