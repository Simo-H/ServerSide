var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
/* GET users listing. */

var serverUtils = require('../Server.js');
var dateFormat = require('dateformat');
/* GET home page. */

router.get('/login', function (req, res) {
    var query2 = "SELECT * FROM Clients WHERE email_adress="+req.body +"AND password="+ req;
    serverUtils.Select(query2).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});



module.exports = router;
