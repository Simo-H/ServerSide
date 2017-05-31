/**
 * Created by Simo on 31/05/2017.
 */
var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
/* GET home page. */



router.get('/help', function (req, res) {
    var query2 = "SELECT * FROM Movies";
    //res.send('hello world');
    serverUtils.Select(query2).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});



module.exports = router;