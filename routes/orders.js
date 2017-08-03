/**
 * Created by Simo on 02/06/2017.
 */
var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
var dateFormat = require('dateformat');


router.post('/addOrder', function (req, res) {
    var count = 0;
    var movie;
    var promisesArray = [];
    for (var i = 0; i < req.body.movies.length; i++) {
        promisesArray.push(serverUtils.checkQuantity(req.body.movies[i].movie_id, req.body.movies[i].amount));
    }
    Promise.all(promisesArray)
        .then(serverUtils.CheckForNextOrderID)
        .then(serverUtils.nextOrderId)
        .then(function (value) {
            count = value;
            var a=serverUtils.addNewOrder(req.body.client_id, value, req.body.date_of_purchase, req.body.date_of_shipment, req.body.total_cost_dollar, req)
        })
        .then(function () {

            for (var i = 0; i < req.body.movies.length; i++)
            {
                serverUtils.addNewOrderLine(count,req.body.movies[i].movie_id,req.body.movies[i].amount,req.body.movies[i].price_dollars,req);
               serverUtils.updateStock(req.body.movies[i].movie_id,req.body.movies[i].amount);

            }
        }).then(function (value) {res.send(JSON.stringify(count));})
    .catch(function (error) { res.send(error); console.log(err)})
});


router.get('/ordersReport', function (req, res) {
    var query= "SELECT * FROM Orders"
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) { res.send(error); console.log(err)})
});

router.get('/OrderDetails', function (req, res) {
    var query = "SELECT Movies.name,Movies.movie_id,A.quantity_for_sale,A.price_dollar FROM Movies INNER JOIN (SELECT * FROM Order_Line WHERE Order_Line.order_id="+req.query.order_id+")as A ON Movies.movie_id=A.movie_id"
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err);res.send(error)})
});

router.get('/previousOrders', function (req, res) {
    var query = "SELECT order_id,date_of_purchase,date_of_shipment,total_cost_dollar FROM Orders Where Orders.client_id="+req.query.client_id
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err);res.send(error)})
});

router.get('/getOrder', function (req, res) {
    var query= "SELECT * FROM Orders Where Orders.order_id="+req.query.order_id
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) { res.send(error); console.log(err)})
});



module.exports = router;