class Routes {
    
    /**
     ** The home route
     ** /myMaps 
     */
    static HomeRoute = "myMaps";

    /**
     ** The users' route
     ** /myMaps/users
     */
     static UsersRoute = HomeRoute + "/users";

    /**
     ** The route to a user
     ** /myMaps/users/2
     */
     static UserRoute = PostsRoute + "/:id";

     /**
     ** The route to a post
     ** /myMaps/users/2
     */
     static UserRoute = PostsRoute + "/:id";
}

module.exports = Routes;
