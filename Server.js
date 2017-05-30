/**
 * Created by Simo on 29/05/2017.
 */
var express=require('express');
var Connection = require('tedious').Connection;
// Create connection to database
var config = {
    userName: 'simohanouna', // update me
    password: 'simoSTAV1', // update me
    server: 'dbserverside.database.windows.net', // update me
    options: {
        database: 'ServerSide' //update me
    }
}
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    if (err) {
        console.error('error connecting' +err.stack);
        return;
    }
    console.error('Connected Azure');
});
