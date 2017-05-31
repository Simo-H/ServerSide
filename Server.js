/**
 * Created by Simo on 29/05/2017.
 */
var express = require('express');
var Request = require('tedious').Request;
var Promise = require('promise');
var Connection = require('tedious').Connection;
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
var query = "SELECT * FROM Movies";
var connection = new Connection(config);

exports.Select = function (query) {
    // Read all rows from table
// Attempt to connect and execute queries if connection goes through
    return new Promise(function (resolve, reject) {
        connection.on('connect', function (err) {
            if (err) {
                reject(err.message);
            }
            var RS = [];
            var request = new Request(
                query,
                function (err) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                        //return callback(err);
                    }
                    //callback(null,RS);
                    resolve(RS);
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
