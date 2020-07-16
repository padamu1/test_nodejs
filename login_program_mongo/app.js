var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");
var mongoose = require('mongoose');

app.set('views', __dirname + '/views'); // views where?
app.set('view engine', 'ejs'); //views working format
app.engine('html', require('ejs').renderFile); //ejs -> HTML




//app.use(express.static('public')); //design form

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
	secret: '@#@$MYSIGN#@$#$',
	resave: false,
	saveUninitialized: true
})); // session setting

// port config
var port = process.env.PORT || 8080;

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/userinfo');

var Userinfo = require('./models/user');

var router = require('./router/router')(app, Userinfo); // this code work on bodyParser next

var server = app.listen(port, function(){
	console.log("Express server has started on port 8080")
}); //server create
