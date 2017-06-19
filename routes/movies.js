/**
 * Created by Simo on 31/05/2017.
 */
var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
var TYPES = require('tedious').TYPES;
var dateFormat = require('dateformat');
/* GET home page. */

router.get('/getMovies', function (req, res) {
    var query2 = "SELECT movie_id, name, price_dollars, added_date, ranking, category FROM Movies";
    serverUtils.Select(query2).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err);res.send(error)})
});

router.get('/getNextMovies', function (req, res) {
    var query = "WITH MyCte AS (SELECT movie_id, name, price_dollars, ranking, added_date, category, RowNum = row_number() OVER (ORDER BY (SELECT 0)) FROM Movies WHERE category='"+req.query.category + "') SELECT TOP " +req.query.limit + " movie_id, name, price_dollars, added_date,ranking, category FROM MyCte WHERE RowNum >="+req.query.rownum;
    serverUtils.Select(query)
        .then(function (value) {res.send(value);})
        .catch(function (error) {  console.log(err);res.send(error)})
});

router.get('/moviesReport', function (req, res) {
    var query2 = "SELECT * FROM Movies";
    serverUtils.Select(query2).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err);res.send(error)})

});

router.get('/movieDescription', function (req, res) {
    var query = "SELECT description FROM Movies WHERE Movies.movie_id="+req.query.movie_id;
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err);res.send(error)})
});

router.get('/bestFive', function (req,res) {
    var date = new Date();
    var currentDay = date.getDate();
    var weekAgoDate = new Date();
    weekAgoDate.setDate(currentDay - 31);
    var dateString = dateFormat(weekAgoDate,"yyyy-mm-dd");
   // var query = "Select * SUM (quantity_for_sale) AS total_for_sale FROM Order_Line WHERE order_id IN (Select order_id FROM orders WHERE date_of_purchase > Convert(datetime, '"+dateString+"' )) GROUP BY movie_id ORDER BY total_for_sale";
    var query= "(SELECT TOP 5 Movies.ranking, Movies.added_date, Movies.movie_id, Movies.price_dollars, Movies.name, A.total_for_sale FROM Movies INNER JOIN (SELECT movie_id ,SUM (quantity_for_sale) AS total_for_sale FROM Order_Line WHERE order_id IN (Select order_id FROM orders WHERE date_of_purchase > Convert(datetime, '"+dateString+"' )) GROUP BY movie_id)as A ON Movies.movie_id=A.movie_id ) ORDER BY total_for_sale DESC";
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err);res.send(error)})
})

router.get('/newMovies', function (req,res) {
    var date = new Date();
    var currentDay = date.getDate();
    var weekAgoDate = new Date();
    weekAgoDate.setDate(currentDay - 7);
    var dateString = dateFormat(weekAgoDate,"yyyy-mm-dd");
    var query = "SELECT movie_id, name, price_dollars, ranking, added_date FROM Movies WHERE added_date > Convert(datetime, '"+dateString+"' )";
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err);res.send(error)})
});

router.delete('/deleteMovie', function (req, res) {
    var query = "DELETE FROM Movies WHERE movie_id="+req.query.movie_id;
    serverUtils.Delete(query).then(function (value) {res.send(value);}).catch(function (error) {console.log(err);res.send(error)})
});

router.post('/addNewMovie', function (req, res) {

    var query ="INSERT INTO Movies (movie_id , name, quantity_in_stock, description, added_date, category, price_dollars) VALUES (@movie_id , @name, @quantity_in_stock, @description, @added_date, @category, @price_dollars)"

    serverUtils.InsertMovie(query, req).then(function (value) {res.send(value);}).catch(function (error) {console.log(error);res.send(error)})
});

router.put('/updateMovieQuantity', function (req, res) {

    var query ="UPDATE Movies SET quantity_in_stock = quantity_in_stock + "+ req.query.quantity +" WHERE movie_id = "+req.query.movie_id;

    serverUtils.Update(query, req).then(function (value) {res.send(value);}).catch(function (error) {console.log(err);res.send(error)})
});

module.exports = router;