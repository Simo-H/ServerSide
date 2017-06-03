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

    for (var i = 0; i < req.body.movies.length; i++) {
        serverUtils.checkQuantity(req.body.movies[i].movie_id, req.body.movies[i].quantity_for_sale,function (value, function(value){

        }) {
            if (value) {
                count++;
            }
            else {
                movie.add(req.body.movies[i]);
            }
        });

    }
    if(count==req.body.movies.length)
    {
        var id= serverUtils.nextOrderId();
    }


});


router.get('/ordersReport', function (req, res) {
    var query= "SELECT * FROM Orders"
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) { res.send(error); console.log(err)})
});
module.exports = router;