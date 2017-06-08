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
    var promisesArray = []
    for (var i = 0; i < req.body.movies.length; i++) {
        promisesArray.push(serverUtils.checkQuantity(req.body.movies[i].movie_id, req.body.movies[i].quantity_for_sale));
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
                serverUtils.addNewOrderLine(count,req.body.movies[i].movie_id,req.body.movies[i].quantity_for_sale,req.body.movies[i].price_dollar,req);
               serverUtils.updateStock(req.body.movies[i].movie_id,req.body.movies[i].quantity_for_sale);

            }
        }).then(function (value) {res.send({message: 'Successfully ordered'});})
    .catch(function (error) { res.send(error); console.log(err)})
});


router.get('/ordersReport', function (req, res) {
    var query= "SELECT * FROM Orders"
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) { res.send(error); console.log(err)})
});
module.exports = router;