const CoordinatesControllers = require('../controllers/CoordinateControllers');
const GetQueryResultAsync = require('../config/db');
const Coordinate = require('../models/Coordinate');

const fs = require("fs").promises;

/**
 * Uploads a file and passes its POI data to the data base
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
  exports.GetFile = async(req,res,next) =>
 {
    // "C:/json/generic.json"
    try {
        // Reads the path from the request's body as a text
        var data = await fs.readFile(req.body.path, 'utf8');
        // Parses it to JSON
        var jsonData = JSON.parse(data);

            jsonData.forEach(x => {
         //     var id = x.id;
          //    var name = x.name;
          //    var address = x.address  

          //    var types = x.types;
          //    types.forEach(type =>{
                    // Get all types 
          //    var typeName = type;
              // Check if type exists in types...
                // if not ...
               // Call the database to create a new type
          //       });

             var coordinates = x.coordinates;
             var lat = x.coordinates.lat;
             var lng = x.coordinates.lng;
            
            
             res.status(200).json(jsonData);
               
         //    var rating = x.rating;
            
          //   var rating_n = x.rating_n;
 
         //    var current_popularity = x.current_popularity;
 
         //    var populartimes = x.populartimes;
         //    populartimes.forEach(populartime =>{
          //       var populartimesName = populartime.name;
          //       var populartimesDatas = populartime.data;
            //         populartimesDatas.forEach(populartimesData =>{
             //            var populartimesHour = populartimesData;
             //        })
           //  });
 
           //  var time_spents = x.time_spent;
            // time_spents.forEach(time_spent => {
           //      var values = time_spent;
            // });

       });

        // Return the json array
         // Set the body of the response
        res.status(200).json(jsonData);

    } 
    catch(e) {
        console.log('Error:', e.stack);
    }
}

 exports.UpdateDatabase = (jsonData) =>
{
    // types
    // coordinates
    // timeSpent
} 

 