const mysql = require('mysql2');
const config = require('./config.json');

// Create a single connection
const connection = mysql.createConnection({
  host: 'back-mysql-1',
  user: 'user',
  password: 'password',
  database: 'football_data'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

// Export the connection for use in other modules
module.exports = connection;
