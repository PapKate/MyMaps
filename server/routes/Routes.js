class Routes {
    
    /**
     ** The home route
     ** /myMaps 
     */
    static HomeRoute = "/myMaps";

    /**
     ** The users' route
     ** /myMaps/users
     */
     static UsersRoute = Routes.HomeRoute + "/users";

    /**
     ** The route to a user
     ** /myMaps/users/2
     */
     static UserRoute = Routes.UsersRoute + "/:id";
    
}

module.exports = Routes;
