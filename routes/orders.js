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
    console.log("test");
    // for (var i = 0; i < req.body.movies.length; i++) {
    //     serverUtils.checkQuantity2(req.body.movies[i].movie_id, req.body.movies[i].quantity_for_sale).then(function (value) {
    //         if (value) {
    //             count++;
    //         }
    //         else {
    //             //movie.add(req.body.movies[i]);
    //         }
    //     });
    // }
    for (var i = 0; i < req.body.movies.length; i++) {
        serverUtils.checkQuantity(req.body.movies[i].movie_id, req.body.movies[i].quantity_for_sale).then(function (value) {
            if (value) {
                count++;
            }
            else {
                //movie.add(req.body.movies[i]);
            }
        });
    }


});
//
//         if(serverUtils.checkQuantity(req.body.movies[i].movie_id ,req.body.movies[i].quantity_for_sale)){
//             count++;
//         }
//         else{
//             movie.add(req.body.movies[i]);
//         }
//     }
//     if (count==req.body.movies.length){
//
//         var id= nextOrderId();
//         // add order
//         addNewOrder(req.body['client_id'], id, req.body['date_of_purchase'], req.body['date_of_shipment'],req.body['total_cost_dollar'])
//         //add to order lines
//         for(var i=0 ; i< req.body.products.length; i++){
//             addNewOrderLine(id, req.body.movie[i].movie_id, req.body.movie[i].quantity_for_sale,req.body.movie[i].price_dollar);
//         }
//         //update amounts
//     }
//     serverUtils.InsertClient(query, req).then(function (value) {res.send(value);}).catch(function (error) {console.log(err)})
// });

router.get('/ordersReport', function (req, res) {
    var query= "SELECT * FROM Orders"
    serverUtils.Select(query).then(function (value) {res.send(value);}).catch(function (error) { res.send(error); console.log(err)})
});
module.exports = router;