var mysql = require('mysql2');
var config = require('./config.json')

var connection = mysql.createConnection({
  host: config.DatabaseConfig.host,
  port: config.DatabaseConfig.port,
  user: config.DatabaseConfig.user,
  password: config.DatabaseConfig.password,
  database: config.DatabaseConfig.database
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

module.exports = connection;
