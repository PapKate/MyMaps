const { Route } = require("react-router-dom");

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
   ** The route to a user
   ** /myMaps/users/2
   */
  static LoginRoute = Routes.HomeRoute + "/login";

  /**
   ** The points' route
   ** /myMaps/points
   */
  static PointsRoute = Routes.HomeRoute + "/points";

  /**
   ** The route to a pointTypes
   ** /myMaps/points/types
   */
  static PointTypesRoute = Routes.PointsRoute + "/types";

  /**
   ** The route to a point
   ** /myMaps/point/2
   */
  static PointRoute = Routes.PointsRoute + "/:id";

  /**
   ** The point and types' route
   ** /myMaps/point and types
   */
  static PointAndTypesRoute = Routes.HomeRoute + "/pointAndTypes";

  /**
   ** The route to a point and type
   ** /myMaps/pointAndType/2
   */
  static PointAndTypeRoute = Routes.PointAndTypesRoute + "/:id";

  /**
   ** The point check ins' route
   ** /myMaps/pointCheckIns
   */
   static PointCheckIns = Routes.HomeRoute + "/pointCheckIns";

   /**
    ** The route to a point check in
    ** /myMaps/pointCheckIns/2
    */
   static PointCheckIn = Routes.PointAndTypesRoute + "/:id";

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
   ** The confirmed cases' route
   ** /myMaps/confirmedCases
   */
  static ConfirmedCasesRoute = Routes.HomeRoute + "/confirmedCases";

    /**
   ** The confirmed cases' route
   ** /myMaps/confirmedCases/caseWasHere
   */
   static ConfirmedCasesCaseWasHere = Routes.ConfirmedCasesRoute + "/caseWasHere";

  /**
   ** The route to a confirmedCase
   ** /myMaps/confirmedCase/2
   */
  static ConfirmedCaseRoute = Routes.ConfirmedCasesRoute + "/:id";

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
   ** The route to a file
   ** /myMaps/file
   */
  static FileRoute = Routes.HomeRoute + "/file";

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
   ** The timeSpents' route
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
