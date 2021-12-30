const express = require('express');

const userControllers = require('../controllers/UserControllers');
const pointandtypeControllers = require('../controllers/PointAndTypeControllers');
const pointControllers = require('../controllers/PointControllers');
const coordinateControllers = require('../controllers/CoordinateControllers');
const confirmedcaseControllers = require('../controllers/ConfirmedCaseControllers');

const router = express.Router();

const Routes = require('./Routes');

/**
 * @route GET and POST route -> /users/
 */
router
    .route(Routes.UsersRoute)
    .get(userControllers.GetAllUsers)
    .post(userControllers.CreateNewUser);

    
/**
 * @route GET and POST route -> /users/:id
 */
router
    .route(Routes.UserRoute)
    .get(userControllers.GetUserById)
    .put(userControllers.UpdateUserById)
    .delete(userControllers.DeleteUserById);

/**
 * @route GET and POST route -> /points/
 */
 router
 .route(Routes.PointsRoute)
 .get(pointControllers.GetAllPoints)
 .post(pointControllers.CreateNewPoint);

 
/**
* @route GET and POST route -> /points/:id
*/
router
 .route(Routes.PointRoute)
 .get(pointControllers.GetPointById)
 .put(pointControllers.UpdatePointById)
 .delete(pointControllers.DeletePointById);

 /**
 * @route GET and POST route -> /pointandtypes/
 */
  router
  .route(Routes.PointAndTypesRoute)
  .get(pointandtypeControllers.GetAllPointAndTypes)
  .post(pointandtypeControllers.CreateNewPointAndType);
 
  
 /**
 * @route GET and POST route -> /pointandtypes/:id
 */
 router
  .route(Routes.PointAndTypeRoute)
  .get(pointandtypeControllers.GetPointAndTypeById)
  .put(pointandtypeControllers.UpdatePointAndTypeById)
  .delete(pointandtypeControllers.DeletePointAndTypeById);
 
   /**
 * @route GET and POST route -> /coordinates/
 */
    router
    .route(Routes.CoordinatesRoute)
    .get(coordinateControllers.GetAllCoordinates)
    .post(coordinateControllers.CreateNewCoordinate);
   
    
   /**
   * @route GET and POST route -> /coordinates/:id
   */
   router
    .route(Routes.CoordinateRoute)
    .get(coordinateControllers.GetCoordinateById)
    .delete(coordinateControllers.DeleteCoordinateById);
 
   /**
 * @route GET and POST route -> /confirmedcases/
 */
    router
    .route(Routes.ConfirmedCasesRoute)
    .get(confirmedcaseControllers.GetAllConfirmedCases)
    .post(confirmedcaseControllers.CreateNewConfirmedCase);
   
    
   /**
   * @route GET and POST route -> /coordinates/:id
   */
   router
    .route(Routes.ConfirmedCaseRoute)
    .get(confirmedcaseControllers.GetConfirmedCaseById)
    .delete(confirmedcaseControllers.DeleteConfirmedCaseById);
     
module.exports = router;