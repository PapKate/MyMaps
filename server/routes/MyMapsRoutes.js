const express = require('express');

const userControllers = require('../controllers/UserControllers');
const pointControllers = require('../controllers/PointControllers');
const pointAndTypeControllers = require('../controllers/PointAndTypeControllers');
const pointCheckInControllers = require('../controllers/PointCheckInControllers');
const coordinateControllers = require('../controllers/CoordinateControllers');
const confirmedCaseControllers = require('../controllers/ConfirmedCaseControllers');
const adminControllers = require('../controllers/AdminControllers');
const popularTimeControllers = require('../controllers/PopularTimeControllers');
const typeControllers = require('../controllers/TypeControllers');
const timeSpentControllers = require('../controllers/TimeSpentControllers');
const fileController = require('../controllers/FileController');
const databaseController = require('../controllers/DatabaseControllers');

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
 * @route GET and POST route -> /file
 */
router 
    .route(Routes.FileRoute)
    .post(fileController.GetFile);

/**
 * @route GET and POST route -> /database
 */
 router 
    .route(Routes.DatabaseRoute)
    .post(databaseController.AddData);    

/**
 * @route GET and POST route -> /points/
 */
router
    .route(Routes.PointsRoute)
    .get(pointControllers.GetAllPoints)
    .post(pointControllers.CreateNewPoint)
    .delete(pointControllers.DeleteAllPoints);

/**
 * @route GET route -> /points/types
 */   
 router
    .route(Routes.PointTypesRoute)
    .get(pointControllers.GetPointTypes);

/**
* @route GET and POST route -> /points/:id
*/
router
    .route(Routes.PointRoute)
    .get(pointControllers.GetPointById)
    .put(pointControllers.UpdatePointById)
    .delete(pointControllers.DeletePointById);

/**
 * @route GET and POST route -> /pointAndTypes/
 */
router
    .route(Routes.PointAndTypesRoute)
    .get(pointAndTypeControllers.GetAllPointAndTypes)
    .post(pointAndTypeControllers.CreateNewPointAndType)
    .delete(pointAndTypeControllers.DeletePointAndType);

/**
 * @route GET and POST route -> /pointAndTypes/:id
 */
router
    .route(Routes.PointAndTypeRoute)
    .get(pointAndTypeControllers.GetPointAndTypeById)
    .put(pointAndTypeControllers.UpdatePointAndTypeById);


/**
 * @route GET, POST and DELETE route -> /pointCheckIns/
 */
router
    .route(Routes.PointCheckIns)
    .get(pointCheckInControllers.GetAllPointCheckIns)
    .post(pointCheckInControllers.CreateNewPointCheckIn)
    .delete(pointCheckInControllers.DeleteAllPointCheckIns);

/**
 * @route GET route -> /pointCheckIns/points
 */
 router
 .route(Routes.PointCheckInAndPoints)
    .get(pointCheckInControllers.GetAllPointCheckInAndPoints);

/**
 * @route GET route -> /pointCheckIns/points
 */
router
    .route(Routes.PointCheckInsTypes)
        .get(pointCheckInControllers.GetAllPointCheckInsTypes);


/**
 * @route GET route -> /pointCheckIns/confirmedCases
 */
 router
    .route(Routes.PointCheckInAndCases)
        .get(pointCheckInControllers.GetAllPointCheckInAndCases);

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
    .put(coordinateControllers.UpdateCoordinateById)
    .delete(coordinateControllers.DeleteCoordinateById);

/**
 * @route GET and POST route -> /confirmedCases/
 */
router
    .route(Routes.ConfirmedCasesRoute)
    .get(confirmedCaseControllers.GetAllConfirmedCases)
    .post(confirmedCaseControllers.CreateNewConfirmedCase);

/**
 * @route GET and POST route -> /confirmedCases/types
 */
router
    .route(Routes.ConfirmedCasesTypes)
    .get(confirmedCaseControllers.GetAllConfirmedCasesTypes);
/**
 * @route GET and POST route -> /confirmedCases/caseWasHere
 */
router
    .route(Routes.ConfirmedCasesCaseWasHere)
    .get(confirmedCaseControllers.GetAllConfirmedCasesCaseWasHere)

/**
 * @route GET and POST route -> /confirmedCases/:id
 */
router
    .route(Routes.ConfirmedCaseRoute)
    .get(confirmedCaseControllers.GetConfirmedCaseById)
    .put(confirmedCaseControllers.UpdateConfirmedCaseById)
    .delete(confirmedCaseControllers.DeleteConfirmedCaseById);

/**
 * @route GET and POST route -> /admins/
 */
router
    .route(Routes.AdminsRoute)
    .get(adminControllers.GetAllAdmins)
    .post(adminControllers.CreateNewAdmin);

/**
 * @route GET and POST route -> /admins/:id
 */
router
    .route(Routes.AdminRoute)
    .get(adminControllers.GetAdminById)
    .put(adminControllers.UpdateAdminById)
    .delete(adminControllers.DeleteAdminById);

/**
 * @route GET and POST route -> /popularTimes/
 */
router
    .route(Routes.PopularTimesRoute)
    .get(popularTimeControllers.GetAllPopularTimes)
    .post(popularTimeControllers.CreateNewPopularTime)
    .delete(popularTimeControllers.DeletePopularTimes);
/**
 * @route GET and POST route -> /popularTimes/:id
 */
router
    .route(Routes.PopularTimeRoute)
    .get(popularTimeControllers.GetPopularTimeById)
    .get(popularTimeControllers.GetPopularTimeByPointId)
    .put(popularTimeControllers.UpdatePopularTimeById)
    .delete(popularTimeControllers.DeletePopularTimeById);

/**
 * @route GET and POST route -> /types/
 */
router
    .route(Routes.TypesRoute)
    .get(typeControllers.GetAllTypes)
    .post(typeControllers.CreateNewType);

/**
 * @route GET and POST route -> /types/:id
 */
router
    .route(Routes.TypeRoute)
    .get(typeControllers.GetTypeById)
    .put(typeControllers.UpdateTypeById)
    .delete(typeControllers.DeleteTypeById);

/**
 * @route GET and POST route -> /timeSpents/
 */
router
    .route(Routes.TimeSpentsRoute)
    .get(timeSpentControllers.GetAllTimeSpents)
    .post(timeSpentControllers.CreateNewTimeSpent);

/**
 * @route GET and POST route -> /timeSpents/:id
 */
router
    .route(Routes.TimeSpentRoute)
    .get(timeSpentControllers.GetTimeSpentById)
    .put(timeSpentControllers.UpdateTimeSpentById)
    .delete(timeSpentControllers.DeleteTimeSpentById);


module.exports = router;