/**
 * Created by Simo on 31/05/2017.
 */
var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
var dateFormat = require('dateformat');
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
router.get('/bestFive', function (req,res) {
    var date = new Date();
    var currentDay = date.getDate();
    var weekAgoDate = new Date();
    weekAgoDate.setDate(currentDay - 7);
    var dateString = dateFormat(weekAgoDate,"yyyy-mm-dd");
    var query = "Select movie_id, SUM (quantity_for_sale) AS total_for_sale FROM Order_Line WHERE order_id IN (Select order_id FROM orders WHERE date_of_purchase > Convert(datetime, '"+dateString+"' )) GROUP BY movie_id ORDER BY total_for_sale";
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
})


module.exports = router;