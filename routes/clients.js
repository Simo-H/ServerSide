var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
var dateFormat = require('dateformat');

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
router.delete('/deleteClient', function (req, res) {
    var query = "DELETE FROM Clients WHERE client_id="+req.query.client_id;
    serverUtils.Delete(query).then(function (value) {res.send(value);}).catch(function (error) {console.log(err)})
});

router.post('/addClient', function (req, res) {

    var query ="INSERT INTO Clients (client_id, first_name, last_name, address, city, phone_number, email_address, credit_card, security_answer, favourite_catergory, password, country) VALUES (@client_id, @first_name, @last_name, @address, @city, @phone_number, @email_address, @credit_card, @security_answer, @favourite_catergory, @password, @country)"

    serverUtils.InsertClient(query, req).then(function (value) {res.send(value);}).catch(function (error) {console.log(err)})
});

router.get('/getClientDetails', function (req, res) {
    var query= "SELECT * FROM Clients WHERE client_id = '"+ req.query.client_id+"'";
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(err)})
});
module.exports = router;
