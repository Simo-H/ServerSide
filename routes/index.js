var express = require('express');
var router = express.Router();


var serverUtils = require('../Server.js');
/* GET home page. */



router.get('/', function (req, res) {
    var query2 = "SELECT * FROM Movies";
    //res.send('hello world');
    //console.log(path.dirname(require.main.filename));
    serverUtils.Select(query2).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
    });



module.exports = router;