var express = require('express');
var path = require('path');
var serverUtils = require('./Server');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Promise = require('promise')
var index = require('./routes/index');
var clients = require('./routes/clients');
var movies=require('./routes/movies');
var orders=require('./routes/orders');
var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.locals.token = {};
var query = "SELECT username,token FROM Clients WHERE token IS NOT NULL";
serverUtils.Select(query).then(function (value)
{for(var i = 0;i < value.length;i++ )
{
    app.locals.token[value[i].username] = value[i].token;
}});
exports.addToDictionary = function (username,token) {
    app.locals.token[username] = token;
}

exports.checkLogin = function (req) {
    var token = req.headers["token"];
    var user = req.headers["username"];
    if (!token || !user)
        return false;
    var validToken = app.locals.token[user];
    if (validToken == token)
        return true;
    else
        return false;
}
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

app.use('/', index);


app.use('/clients', clients);
app.use('/movies',movies);
app.use('/orders',orders);
app.use('/index',index);
app.listen(8888);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.on('error',function(err){ console.error(err)})
module.exports = app;


//serverUtils.Select(query2).then(function (value) { console.log(value) }).catch(function (error) {  console.log(err)})
//function (error,results) {    console.log(results);});
