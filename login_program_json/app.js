var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var fs = require("fs");
app.set('views', __dirname + '/views'); // views where?
app.set('view engine', 'ejs'); //views working format
app.engine('html', require('ejs').renderFile); //ejs -> HTML



var server = app.listen(8020, function(){
	console.log("Express server has started on port 3000")
}); //server create

//app.use(express.static('public')); //design form

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
	secret: '@#@$MYSIGN#@$#$',
	resave: false,
	saveUninitialized: true
})); // session setting


var router = require('./router/router')(app, fs); // this code work on bodyParser next
