const express = require('express');

const userControllers = require('../controllers/UserControllers');

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

module.exports = router;