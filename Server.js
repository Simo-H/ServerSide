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
exports.checkQuantity = function (movie_id,quantity,callback)
{
    return new Promise(function (resolve,reject) {
        var query = "SELECT movie_id, quantity_in_stock FROM Movies WHERE movie_id="+movie_id+" AND quantity_in_stock>="+ quantity;
        this.Select(query).then(function (value) {
            if(value.length > 0)
                resolve(true);
            else
                resolve(false);
        });
    })
}

this.checkQuantity2 = function (movie_id,quantity,callback) {
    var query = "SELECT movie_id, quantity_in_stock FROM Movies WHERE movie_id="+movie_id+" AND quantity_in_stock>="+ quantity;

    // Read all rows from table
// Attempt to connect and execute queries if connection goes through
    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
                connection.close();
            }
            var RS = [];
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        connection.close();
                    }
                    //callback(null,RS);
                    RSJSON = [];
                    RS.forEach(function (x) {
                        RSJSON.push(JSON.stringify(x));
                    })
                    if(RSJSON.length>1)
                    resolve(true);
                    connection.close();
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
            connection.execSql(request);
        });
    });

}



exports.addNewOrderLine = function (movie_id,order_id,quantity,price_dollar)
{
    var query = "INSERT INTO Order_Line (order_id, movie_id, quantity_for_sale,price_dollar) VALUES ("+order_id+","+ movie_id+", "+quantity_for_sale+","+price_dollar+")"

    insert(query).then(function (value) {

    }).catch(function (error) {  console.log(err)});
}

exports.nextOrderId = function ()
{
    var query="SELECT order_id FROM Orders WHERE order_id=(SELECT max(order_id) FROM Orders)"
    get(query).then(function (value) {
        if(value.length > 0)
            return value+1;
        else
            return 1;
    }).catch(function (error) {  console.log(err)});
}

exports.addNewOrder= function (client_id, order_id, date_of_purchase, date_of_shipment,total_cost_dollar)
{
    var query = "INSERT INTO Orders (client_id, order_id, date_of_purchase, date_of_shipment,total_cost_dollar) VALUES ("+client_id+","+ order_id+", "+date_of_purchase+","+date_of_shipment +","+total_cost_dollar+")"

    Insert(query).then(function (value) {

    }).catch(function (error) {  console.log(err)});
}

this.Select = function (query) {
    // Read all rows from table
// Attempt to connect and execute queries if connection goes through
    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
                connection.close();
            }
            var RS = [];
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        connection.close();
                    }
                    //callback(null,RS);
                    RSJSON = [];
                    RS.forEach(function (x) {
                        RSJSON.push(JSON.stringify(x));
                    })
                    resolve(RSJSON);
                    connection.close();
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
            connection.execSql(request);
        });
    });

}
exports.Select = function (query) {
    // Read all rows from table
// Attempt to connect and execute queries if connection goes through
    return new Promise(function (resolve, reject) {
        var connection = new Connection(config);
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
                connection.close();
            }
            var RS = [];
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        connection.close();
                    }
                    //callback(null,RS);
                    RSJSON = [];
                    RS.forEach(function (x) {
                        RSJSON.push(JSON.stringify(x));
                    })
                    resolve(RSJSON);
                    connection.close();
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






exports.InsertOrder = function (query ,req) {
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

            request.addParameter('order_id', TYPES.Int	,req.body['order_id'] );
            request.addParameter('movie_id', TYPES.Int,req.body['movie_id'] );
            request.addParameter('quantity_for_sale', TYPES.Int,req.body['quantity_for_sale'] );

            connection.execSql(request);


        });
    });
}