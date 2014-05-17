
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config'); 

var app = express();

var db = mongoose.connect(config.database.url);
//Models
require('./models/models')();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', './public/views');
app.set ('view engine', 'ejs');
app.use(express.favicon('./public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routes
require('./controllers/routes')(app);

//Start Server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});