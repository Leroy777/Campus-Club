//--------------UNIVERSIAL STATIC------------------------------------------------------
const express = require('express'),
	parser = require('body-parser'),
	mysql = require('mysql'),
	request = require('request'),
	path = require('path'),
	morgan = require('morgan'),
	bcrypt = require('bcryptjs'),
	cookie = require('cookie-parser'),
	expressValidator = require('express-validator'),
	fs = require('fs'),
	cors = require('cors'),
	dotenv = require('dotenv'),
	http = require('http');
//---------------UNIVERSIAL CONFIG-------------------------------------------------------
var app = express(),
	port = process.env.PORT || 8080,
	pubdir = require('path').join(__dirname,'/public'),
	mode = 'Normal';
dotenv.config(); //read .env file inputs
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended:false}));
app.use(cookie());
app.use(expressValidator());
app.use(cors());
app.use(express.static(pubdir));
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});
//uncomment the followings for static webpages
/*
app.set('view engine', 'ejs'); 
app.set('views', __dirname+"/views");
*/
//-------------MYSQL CONNECTION----------------------------------------------------------
var con1 = mysql.createConnection({
  host: "remotemysql.com",
  user: "TZTlsnw5NV",
  password: "TazDgAUSGq",
  database: "TZTlsnw5NV"
});
var con2 = mysql.createConnection({
	host: "remotemysql.com",
	user: "6uA66CWH2H",
	password: "3u5ww9YRzI",
	database: "6uA66CWH2H"
})
con1.connect(function(err){
	if (err) throw err;
	else{console.log("DB1 Connected!");}
});
con2.connect(function(err){
	if (err) throw err;
	else{console.log("DB2 Connected!");}
});

//--------------ROUTING ACTIONS----------------------------------------------------------
var authRoutes = require('./routes/authRoutes');
var schedRoutes = require('./routes/schedRoutes');

//--------------UNIVERSIAL ERROR CHECKER & DEBUGGER--------------------------------------
app.get("*", function(req,res){
	res.send("404 Not Found");
})
//--------------ENV RUNNING--------------------------------------------------------------
app.listen(port, ()=>{
	console.log("Running Serverside Framework in [" + mode + "] Mode ... on [PORT " + app.get('port') + "]");
});