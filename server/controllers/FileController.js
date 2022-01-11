
/**
 * Uploads a file and passes its POI data to the data base
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 exports.GetFile = (req,res,next) =>
 {
    var fs = require('fs');
 
    try {
        // Reads the path from the request's body as a text
        var data = fs.readFileSync(req.body.path, 'utf8');
        // Parses it to JSON
        var jsonData = JSON.parse(data);

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

 