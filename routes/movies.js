/**
 * Created by Simo on 31/05/2017.
 */
var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
var TYPES = require('tedious').TYPES;

/* GET home page. */

router.get('/getAll', function (req, res) {
    var query2 = "SELECT * FROM Movies";
    //res.send('hello world');
    serverUtils.Select(query2).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});

router.get('/movieID', function (req, res) {
    var query = "SELECT Movies.description FROM Movies WHERE Movies.movie_id="+req.headers['movie_id'];
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});


router.delete('/deleteMovie', function (req, res) {
    var query = "DELETE FROM Movies WHERE movie_id="+req.query.movie_id;
    serverUtils.Delete(query).then(function (value) {res.send(value);}).catch(function (error) {console.log(err)})
});

router.post('/addNewMovie', function (req, res) {

    var query ="INSERT INTO Movies (movie_id , name, quantity_in_stock, description, added_date, category) VALUES (@movie_id , @name, @quantity_in_stock, @description, @added_date, @category)"

    serverUtils.InsertMovie(query, req).then(function (value) {res.send(value);}).catch(function (error) {console.log(err)})
});


module.exports = router;