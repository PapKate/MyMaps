const express = require('express');

const userControllers = require('../controllers/UserControllers');

const fileController = require('../controllers/FileController');

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

router 
    .route("/myMaps/file")
    .post(fileController.GetFile);

    
module.exports = router;