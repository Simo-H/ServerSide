/**
 * Created by Simo on 29/05/2017.
 */
var express = require('express');
var Request = require('tedious').Request;
var Promise = require('promise');
var Connection = require('tedious').Connection;
var TYPES = require('tedious').TYPES;


// Create connection to database
var config = {
    userName: 'simohanouna', // update me
    password: 'simoSTAV1', // update me
    server: 'dbserverside.database.windows.net', // update me
    options: {
        encrypt: true,
        database: 'ServerSide' //update me

    }
}
exports.countAvailableMovies = function (value,count,movie,callback) {
    if (value) {
        count++;
    }
    else {
        movie.add(req.body.movies[i]);
    }
}

exports.checkQuantity = function (movie_id,quantity)
{

        var query = "SELECT movie_id, quantity_in_stock FROM Movies WHERE movie_id="+movie_id+" AND quantity_in_stock <"+ quantity;
        var a = this.SelectQ(query);
        return a;


}

exports.updateStock = function (movie_id,quantity_for_sale)
{
    var query = "UPDATE Movies SET quantity_in_stock = (SELECT quantity_in_stock FROM Movies WHERE movie_id ="+movie_id+")-"+quantity_for_sale+"WHERE movie_id ="+movie_id
    var a = this.Insert(query)
    return a;
}

exports.nextOrderId = function (value)
{
        // var query = "SELECT order_id FROM Orders WHERE order_id=(SELECT max(order_id) FROM Orders)"
        // var a = this.Select(query)
    return new Promise(function (resolve, reject) {
                    if (value.length > 0) {
                        var a = value[0];
                        var b = JSON.parse(a);
                        var c = b.order_id;

                            resolve(c + 1);
                    }
                    else
                            resolve(1);

    });

}

exports.addNewOrderLine = function (order_id,movie_id,quantity_for_sale,price_dollar,req)
{
    var query = "INSERT INTO Order_Line (order_id, movie_id, quantity_for_sale,price_dollar) VALUES ("+order_id+","+ movie_id+", "+quantity_for_sale+",'"+price_dollar+"'"+")"
    var a = this.InsertOrderLine(query,req)
    return a;
}

exports.addNewOrder= function (client_id, order_id, date_of_purchase, date_of_shipment,total_cost_dollar,req)
{
        var query = "INSERT INTO Orders (client_id, order_id, date_of_purchase, date_of_shipment,total_cost_dollar) VALUES (" + client_id + "," + order_id + ", '" + date_of_purchase + "','" + date_of_shipment + "'," + total_cost_dollar + ")"
        var a = this.Insert(query,req)
        return a;

}

exports.Select = function (query) {
    // Read all rows from table
// Attempt to connect and execute queries if connection goes through
if(query == "SELECT order_id FROM Orders WHERE order_id=(SELECT max(order_id) FROM Orders)")
    console.log("1")
    return new Promise(function (resolve, reject) {
        console.log("2");
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
                // connection.close();
            }
            var RS = [];
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        // connection.close();
                    }
                    //callback(null,RS);
                    //was here
                });
            request.on('row', function (columns) {
                var row = {};
                columns.forEach(function (column) {
                    if (column.isNull) {
                        row[column.metadata.colName] = null;
                    } else {
                        row[column.metadata.colName] = column.value;
                    }
                });
                RS.push(row);
            });
            request.on('requestCompleted',function () {
                RSJSON = [];
                RS.forEach(function (x) {
                    RSJSON.push(JSON.stringify(x));
                })

                resolve(RSJSON);

            })
            connection.execSql(request);
        });
    });

}
exports.Insert = function (query) {
    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
            }
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        //return callback(err);
                    }
                });
            connection.execSql(request);
        });
    });
}
exports.InsertOrderLine = function (query) {
    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
            }
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        //return callback(err);
                    }
                });
            connection.execSql(request);
        });
    });
}
exports.Delete = function (query) {
    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
            }
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        //return callback(err);
                    }
                    resolve({ message: 'Successfully deleted' });

                });

            connection.execSql(request);


        });
    });
}
exports.Update = function (query) {
    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
            }
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        //return callback(err);
                    }
                    resolve({ message: 'Successfully updated' });
                });
            connection.execSql(request);
        });
    });
}
exports.InsertMovie = function (query ,req) {
    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
            }
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        //return callback(err);
                    }
                    resolve({ message: 'Successfully insert' });

                });

            request.addParameter('movie_id', TYPES.Int	,req.body['movie_id'] );
            request.addParameter('name', TYPES.VarChar,req.body['name'] );
            request.addParameter('quantity_in_stock', TYPES.Int,req.body['quantity_in_stock'] );
            request.addParameter('description', TYPES.Text,req.body['description'] );
            request.addParameter('added_date', TYPES.DateTime2,req.body['added_date'] );
            request.addParameter('category', TYPES.VarChar,req.body['category'] );
            request.addParameter('price_dollars', TYPES.Money,req.body['price_dollars'] );
            connection.execSql(request);


        });
    });
}

exports.InsertClient = function (query ,req) {
    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
            }
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        //return callback(err);
                    }
                    resolve({ message: 'Successfully insert' });

                });

            request.addParameter('client_id', TYPES.VarChar	,req.body['client_id'] );
            request.addParameter('first_name', TYPES.NVarChar,req.body['first_name'] );
            request.addParameter('last_name', TYPES.NVarChar,req.body['last_name'] );
            request.addParameter('address', TYPES.NVarChar,req.body['address'] );
            request.addParameter('city', TYPES.NVarChar,req.body['city'] );
            request.addParameter('phone_number', TYPES.VarChar,req.body['phone_number'] );
            request.addParameter('email_address', TYPES.NVarChar	,req.body['email_address'] );
            request.addParameter('credit_card', TYPES.NVarChar,req.body['credit_card'] );
            request.addParameter('security_answer', TYPES.NVarChar,req.body['security_answer'] );
            request.addParameter('favourite_catergory', TYPES.NVarChar,req.body['favourite_catergory'] );
            request.addParameter('password', TYPES.VarChar,req.body['password'] );
            request.addParameter('country', TYPES.NVarChar,req.body['country'] );

            connection.execSql(request);


        });
    });
}

exports.SelectQ = function (query) {
    // Read all rows from table
// Attempt to connect and execute queries if connection goes through

    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
                // connection.close();
            }
            var RS = [];
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        // connection.close();
                    }
                    //callback(null,RS);
                    //was here
                });
            request.on('row', function (columns) {
                var row = {};
                columns.forEach(function (column) {
                    if (column.isNull) {
                        row[column.metadata.colName] = null;
                    } else {
                        row[column.metadata.colName] = column.value;
                    }
                });
                RS.push(row);
            });
            request.on('requestCompleted',function () {
                RSJSON = [];

                RS.forEach(function (x) {
                    RSJSON.push(JSON.stringify(x));
                })

                if (RS.length==0){
                    resolve({ message: 'Successfully order' });
                }
                else{
                    reject(RSJSON);
                }
            })
            connection.execSql(request);
        });
    });

}

exports.CheckForNextOrderID = function () {
    // Read all rows from table
// Attempt to connect and execute queries if connection goes through
    var query = "SELECT order_id FROM Orders WHERE order_id=(SELECT max(order_id) FROM Orders)";
    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
                // connection.close();
            }
            var RS = [];
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        // connection.close();
                    }
                    //callback(null,RS);
                    //was here
                });
            request.on('row', function (columns) {
                var row = {};
                columns.forEach(function (column) {
                    if (column.isNull) {
                        row[column.metadata.colName] = null;
                    } else {
                        row[column.metadata.colName] = column.value;
                    }
                });
                RS.push(row);
            });
            request.on('requestCompleted',function () {
                RSJSON = [];
                RS.forEach(function (x) {
                    RSJSON.push(JSON.stringify(x));
                })
                resolve(RSJSON);

            })
            connection.execSql(request);
        });
    });

}

exports.InsertMovie = function (query ,req) {
    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
            }
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        //return callback(err);
                    }
                    resolve({ message: 'Successfully insert' });

                });

            request.addParameter('movie_id', TYPES.Int	,req.body['movie_id'] );
            request.addParameter('name', TYPES.VarChar,req.body['name'] );
            request.addParameter('quantity_in_stock', TYPES.Int,req.body['quantity_in_stock'] );
            request.addParameter('description', TYPES.Text,req.body['description'] );
            request.addParameter('added_date', TYPES.DateTime2,req.body['added_date'] );
            request.addParameter('category', TYPES.VarChar,req.body['category'] );
            request.addParameter('price_dollars', TYPES.Money,req.body['price_dollars'] );
            connection.execSql(request);


        });
    });
}