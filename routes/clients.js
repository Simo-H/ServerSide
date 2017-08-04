var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
var dateFormat = require('dateformat');
var app = require('../app');

/* GET users listing. */

var serverUtils = require('../Server.js');
var dateFormat = require('dateformat');
/* GET home page. */

router.post('/login', function (req, res) {
    // console.log(app.locals.token);

    var query= "UPDATE Clients SET token = abs(checksum(NewId()) % 100000) WHERE username = '"+ req.body['username']+"' AND password = '"+req.body['password']+"'; SELECT first_name, last_name,username, token,favourite_catergory,favourite_catergory2 FROM Clients WHERE username = '"+ req.body['username'] +"' AND password = '"+req.body['password']+"'";
    serverUtils.Select(query)
        .then(function (value) {if(value.length<1){res.send(value)}else{app.addToDictionary(value[0].username,value[0].token);res.send(value)};}).catch(function (error) {  console.log(error);res.send(error)})
});

// router.post('/restorePassword', function (req, res) {
//     var query= "SELECT password FROM Clients WHERE email_address = '"+ req.body['email_address'] +"' AND security_answer = '"+req.body['security_answer']+"'";
//     serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) { res.send(error); console.log(error);res.send(error)})
// });
a = function (req) {

    return new Promise(function (resolve, reject) {
        var q = "DELETE FROM Order_Line Where order_id IN (SELECT order_id FROM Orders WHERE client_id =" + req.query.client_id + ")"
        var ans=serverUtils.Delete2(q,function (value) {

            if (value==true){
                resolve(true)
            }
            else{
                reject(ans)
            }
        });
    });
}
router.delete('/deleteClient', function (req, res) {

        a(req)
            .then(function (value) {
                return new Promise(function (resolve, reject) {

                    var q = "DELETE FROM Orders WHERE client_id=" + req.query.client_id
                    var ans = serverUtils.Delete2(q, function (value) {

                        if (value == true) {
                            resolve(true)
                        }
                        else {
                            reject(ans)
                        }
                    });
                });

        })
        .then(function (value) {

            return new Promise(function (resolve, reject) {
                var query = "DELETE FROM Clients WHERE client_id=" + req.query.client_id;
                var ans = serverUtils.Delete2(query, function (value) {

                    if (value == true) {
                        resolve(true)
                    }
                    else {
                        reject(ans)
                    }
                });
            });
        })
        .then(function (value) {res.send(value);}).catch(function (error) {console.log(error);res.send(error)})
});

router.post('/addClient', function (req, res) {

    var query ="INSERT INTO Clients (client_id, first_name, last_name, address, phone_number, email_address, security_answer, favourite_catergory, password, country, favourite_catergory2, username) VALUES (@client_id, @first_name, @last_name, @address, @phone_number, @email_address, @security_answer, @favourite_catergory, @password, @country, @favourite_catergory2, @username)"

    serverUtils.InsertClient(query, req).then(function (value) {res.send(value);})
        .catch(function (error)
        // {console.log(error);res.send(value)})
        {res.status(400).send("Oh uh, something went wrong");})
});

router.get('/getClientDetails', function (req, res) {
    if(!app.checkLogin(req))
    {
        res.send("No access - please log in");
        return;
    }
    var query= "SELECT * FROM Clients WHERE client_id = '"+ req.query.client_id+"'";
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(error);res.send(error)})
});

router.get('/recomendation', function (req, res) {
    var query= "SELECT Movies.name,Movies.movie_id FROM Movies WHERE Movies.category= (SELECT TOP 1 favourite_catergory From Clients WHERE client_id='"+req.query.client_id+"')"
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(error);res.send(error)})
});

router.get('/restorePassword', function (req, res) {
    var query= "SELECT password FROM Clients WHERE username= '"+req.query.username+"' AND security_answer='"+req.query.security_answer+"'";
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) {  console.log(error);res.send(error)})
});
module.exports = router;
