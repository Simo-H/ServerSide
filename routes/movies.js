/**
 * Created by Simo on 31/05/2017.
 */
var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
var TYPES = require('tedious').TYPES;

var dateFormat = require('dateformat');
/* GET home page. */

router.get('/getAll', function (req, res) {
    var query2 = "SELECT * FROM Movies";
    //res.send('hello world');
    serverUtils.Select(query2).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});

router.get('/movieDescription', function (req, res) {
    var query = "SELECT description FROM Movies WHERE Movies.movie_id="+req.query.movie_id;
    //res.send('hello world');
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});

router.get('/bestFive', function (req,res) {
    var date = new Date();
    var currentDay = date.getDate();
    var weekAgoDate = new Date();
    weekAgoDate.setDate(currentDay - 31);
    var dateString = dateFormat(weekAgoDate,"yyyy-mm-dd");
    var query = "Select * SUM (quantity_for_sale) AS total_for_sale FROM Order_Line WHERE order_id IN (Select order_id FROM orders WHERE date_of_purchase > Convert(datetime, '"+dateString+"' )) GROUP BY movie_id ORDER BY total_for_sale";
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
})
router.get('/newMovies', function (req,res) {
    var date = new Date();
    var currentDay = date.getDate();
    var weekAgoDate = new Date();
    weekAgoDate.setDate(currentDay - 7);
    var dateString = dateFormat(weekAgoDate,"yyyy-mm-dd");
    var query = "SELECT * FROM Movies WHERE added_date > Convert(datetime, '"+dateString+"' )";
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