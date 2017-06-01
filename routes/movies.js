/**
 * Created by Simo on 31/05/2017.
 */
var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
/* GET home page. */

router.get('/getAll', function (req, res) {
    var query2 = "SELECT * FROM Movies";
    //res.send('hello world');
    serverUtils.Select(query2).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});

router.get('/movieID', function (req, res) {
    var query = "SELECT Movies.description FROM Movies WHERE Movies.movie_id="+req.headers['movie_id'];

    //res.send('hello world');


    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});


module.exports = router;