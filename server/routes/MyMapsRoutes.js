const express = require('express');

const userControllers = require('../controllers/UserControllers');

const adminControllers = require('../controllers/AdminControllers');

const popularTimeControllers = require('../controllers/PopularTimeControllers');

const typeControllers = require('../controllers/TypeControllers');

const timeSpentControllers = require('../controllers/TimeSpentControllers');

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
.post(popularTimeControllers.CreateNewPopularTime);

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