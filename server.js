var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const crypto = require("crypto");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true
}));

// default route
app.get('/', function (req, res) {
return res.send({ error: true, message: 'default' })
});

// connection configurations
var dbConn = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'muppa_sario'
});

// connect to database
dbConn.connect(); 

// Retrieve all users 
app.get('/muppasario', function (req, res) {
dbConn.query('SELECT * FROM muppa_sario ORDER BY score DESC', function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results, message: 'muppa_sario list.' });
});
});

// Add a new user 
app.post('/muppasario/post', function (req, res) {
//var id = crypto.randomBytes(16).toString("hex")
res.send("Hello" + req.body.name)
dbConn.query("INSERT INTO muppa_sario (`name`, `score`) VALUES ('"+req.body.name+"','"+req.body.score+"')");
});

// set port
app.listen(3001, function () {
console.log('Node app is running on port 3001');
});
module.exports = app;