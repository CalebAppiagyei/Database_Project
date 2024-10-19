var express = require("express");
var config = require('./config.json')
var app = express();

var connection = require("./db");

app.get('/', function(req, res){
  let sql = "SELECT * FROM testtable";
  connection.query(sql, function(err, results){
    if (err) throw err;
    res.send(`Connected to the database as id ${connection.threadId}! The database contents are as follows:\n ${JSON.stringify(results, null, 2)}`);
  })
})
app.listen(config.AppConfig.port, function(){
  console.log(`Connecting to database on port ${config.DatabaseConfig.port}`);
  connection.connect(function(err){
    if(err){
      throw err;
    } 
  })
})

module.exports = app;
