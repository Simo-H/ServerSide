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
    Promise.all(promisesArray).then(function (value)
    {
        serverUtils.nextOrderId().then(function (value2)
        {
            serverUtils.addNewOrder(req.body.client_id,value2)
                .then(function (value3) {for (var i = 0; i < req.body.movies.length; i++) {

                }
                });
        });
    });
});


router.get('/ordersReport', function (req, res) {
    var query= "SELECT * FROM Orders"
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) { res.send(error); console.log(err)})
});
module.exports = router;