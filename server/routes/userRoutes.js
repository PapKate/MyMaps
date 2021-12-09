
const express = require('express');

const userControllers = require('../controllers/userControllers');

const router = express.Router();

const Routes = require('../routes/Routes');


/**
 * @route GET and POST route -> /posts/
 */
router.route(Routes.UsersRoute).get(postControllers.GetAllUsers).post(postControllers.CreateNewUser);

router.route(Routes.UserRoute).get(postControllers.GetUserById);

module.exports = router;
