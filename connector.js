//--------------UNIVERSIAL STATIC------------------------------------------------------
const express = require('express'),
	parser = require('body-parser'),
	mysql = require('mysql'),
	request = require('request'),
	path = require('path'),
	cookie = require('cookie-parser'),
	fs = require('fs'),
	cors = require('cors'),
	dotenv = require('dotenv'),
	http = require('http');
	//httpError = require('http-errors')
//---------------UNIVERSIAL CONFIG-------------------------------------------------------
var app = express(),
	port = process.env.PORT || 8080,
	pubdir = require('path').join(__dirname,'/public'),
	mode = 'Normal';
dotenv.config(); //read .env file inputs
app.use(parser.json());
app.use(parser.urlencoded({extended:false}));
app.use(cookie());
app.use(cors());
app.use(express.static(pubdir));
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized!' });
    }
});
//uncomment the followings when making static webpages
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
}); //DB 1
var showTable = 'show tables;'
var readCustomers = 'select * from customers;'
con1.connect(function(err){
	if (err) throw err;
	else{console.log("DB1 Connected!");}
	con1.query(showTable, function (err, result) {
		if (err) throw err;
		console.log("Result: " + JSON.stringify(result));
	});
	con1.query(readCustomers, function(err, result){
		if (err) throw err;
		console.log("Customers: " + JSON.stringify(result));
	});
});
//--------------ROUTING ACTIONS----------------------------------------------------------
var authRoutes = require('./routes/authRoutes');
var schedRoutes = require('./routes/schedRoutes');
app.use('/', authRoutes);
app.use('/schedule', schedRoutes);
//app.use('/', );
//--------------UNIVERSIAL ERROR CHECKER & DEBUGGER--------------------------------------
app.get("*", function(req,res){
	res.send("404 Not Found");
})
//--------------ENV RUNNING--------------------------------------------------------------
app.listen(port, ()=>{
	console.log("Running Serverside Framework in [" + mode + "] Mode ... on [PORT " + app.get('port') + "]");
});