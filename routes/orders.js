/**
 * Created by Simo on 02/06/2017.
 */
var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
/* GET users listing. */

var serverUtils = require('../Server.js');
var dateFormat = require('dateformat');
/* GET home page. */

router.post('/login', function (req, res) {
    var query= "SELECT first_name, last_name FROM Clients WHERE email_address = '"+ req.body['email_address'] +"' AND password = '"+req.body['password']+"'";
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});
router.post('/restorePassword', function (req, res) {
    var query= "SELECT password FROM Clients WHERE email_address = '"+ req.body['email_address'] +"' AND security_answer = '"+req.body['security_answer']+"'";
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) { res.send(error); console.log(err)})
});


module.exports = router;