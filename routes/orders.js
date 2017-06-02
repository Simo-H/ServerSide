/**
 * Created by Simo on 02/06/2017.
 */
var express = require('express');
var router = express.Router();
var serverUtils = require('../Server.js');
/* GET users listing. */

var dateFormat = require('dateformat');
/* GET home page. */
router.post('/addClient', function (req, res) {

    var count;
    var movie;
    for(var i=0 ; i< req.body.products.length; i++){
        if(chackQuantity(req.body.products[i],req.body.quantities[i])==true){
            count++;

        }
        else{
            movie.add(req.body.products[i]);

        }
    }
    if (count==req.body.products.length){
        //add update data for all movies
        // add to client order
        //add to order lines
    }
    serverUtils.InsertClient(query, req).then(function (value) {res.send(value);}).catch(function (error) {console.log(err)})
});


module.exports = router;