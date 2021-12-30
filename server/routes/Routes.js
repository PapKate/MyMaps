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

    /**
     ** The admins' route
     ** /myMaps/admins
     */
     static AdminsRoute = Routes.HomeRoute + "/admins";

    /**
     ** The route to an admin
     ** /myMaps/admins/2
     */
     static AdminRoute = Routes.AdminsRoute + "/:id";

    /**
     ** The popularTimes' route
     ** /myMaps/popularTimes
     */
     static PopularTimesRoute = Routes.HomeRoute + "/popularTimes";

    /**
     ** The route to a popularTime
     ** /myMaps/popularTimes/2
     */
     static PopularTimeRoute = Routes.PopularTimesRoute + "/:id";

     /**
     ** The types' route
     ** /myMaps/types
     */
     static TypesRoute = Routes.HomeRoute + "/types";

    /**
     ** The route to a type
     ** /myMaps/types/2
     */
     static TypeRoute = Routes.TypesRoute + "/:id";

    /**
     ** The timespents' route
     ** /myMaps/timeSpents
     */
     static TimeSpentsRoute = Routes.HomeRoute + "/timeSpents";

    /**
     ** The route to a timeSpent
     ** /myMaps/timeSpents/2
     */
     static TimeSpentRoute = Routes.TimeSpentsRoute + "/:id";

}

module.exports = Routes;
