/**
 * Created by Simo on 02/06/2017.
 */
var express = require('express');
var router = express.Router();
/* GET users listing. */

var serverUtils = require('../Server.js');
var dateFormat = require('dateformat');
/* GET home page. */

router.get('/previousOrders', function (req, res) {
    var query= "SELECT * FROM Orders WHERE client_id="+req.query.client_id;
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});
router.get('/orderDetails', function (req, res) {
    var query= "SELECT * FROM Order_Line WHERE order_id="+req.query.order_id;
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) { res.send(error); console.log(err)})
});

router.get('/ordersReport', function (req, res) {
    var query= "SELECT * FROM Orders"
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) { res.send(error); console.log(err)})
});
module.exports = router;