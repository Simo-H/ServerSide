/**
 * Created by Simo on 31/05/2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var appDir = path.dirname(require.main.filename);
var serverUtils = require('F:\\Apps\\Git Respository\\ServerSide\\Server');
/* GET home page. */

router.get('/getAll', function (req, res) {
    var query2 = "SELECT * FROM Movies";
    //res.send('hello world');
    serverUtils.Select(query2).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});

router.get('/movieID', function (req, res) {
    var query = "SELECT Movies.detail FROM Movies WHERE Movies.movie_id Like"+ req.body.movie_id;
    //res.send('hello world');
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});


module.exports = router;