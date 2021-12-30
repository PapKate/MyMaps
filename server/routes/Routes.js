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
     ** The points' route
     ** /myMaps/points
     */
     static PointsRoute = Routes.HomeRoute + "/points";

    /**
     ** The route to a point
     ** /myMaps/point/2
     */
     static PointRoute = Routes.PointsRoute + "/:id";

     /**
     ** The pointandtypes' route
     ** /myMaps/pointandtypes
     */
     static PointAndTypesRoute = Routes.HomeRoute + "/pointandtypes";

    /**
     ** The route to a pointandtype
     ** /myMaps/pointandtype/2
     */
     static PointAndTypeRoute = Routes.PointAndTypesRoute + "/:id";

     /**
     ** The coordinates' route
     ** /myMaps/coordinates
     */
     static CoordinatesRoute = Routes.HomeRoute + "/coordinates";

    /**
     ** The route to a coordinate
     ** /myMaps/coordinate/2
     */
     static CoordinateRoute = Routes.CoordinatesRoute + "/:id";

     /**
     ** The confirmedcases' route
     ** /myMaps/confirmedcases
     */
     static ConfirmedCasesRoute = Routes.HomeRoute + "/confirmedcases";

    /**
     ** The route to a confirmedcase
     ** /myMaps/confirmedcase/2
     */
     static ConfirmedCaseRoute = Routes.ConfirmedCasesRoute + "/:id";
     
}

module.exports = Routes;
