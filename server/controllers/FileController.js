

exports.GetFile = (req,res,next) =>
{
    var fs = require('fs');

    try {
        var data = fs.readFileSync(req.body.path, 'utf8');
        var test = JSON.parse(data);
        console.log(test);    
    } catch(e) {
        console.log('Error:', e.stack);
    }

}
