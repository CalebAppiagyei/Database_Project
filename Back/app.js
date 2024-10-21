const express = require("express");
const config = require('./config.json');
const app = express();
const connection = require("./db");

app.get('/', function(req, res) {
  const sql = `
    SELECT CONCAT('SELECT * FROM ', table_name, ';') AS query
    FROM INFORMATION_SCHEMA.TABLES
    WHERE table_schema = 'football_data';
  `;

  connection.query(sql, function(err, results) {
    if (err) {
      console.error('Error fetching table queries:', err);
      return res.status(500).send('Error fetching table queries');
    }

    let allData = [];

    function executeQuery(index) {
      if (index >= results.length) {
        return res.send(
          `Connected to the database as id ${connection.threadId}! The database contents are as follows:\n ${JSON.stringify(allData, null, 2)}`
        );
      }
    
      const query = results[index].query;
      const table_name = query.split(' ')[3];
    
      connection.query(query, function(err, tableData) {
        if (err) {
          console.error('Error executing query:', query, err);
          return res.status(500).send('Error fetching table data');
        }
        allData.push({ table: table_name, data: tableData });
        executeQuery(index + 1);
      });
    }
    executeQuery(0);
  });
});


// Start the server and connect to the database.
app.listen(config.AppConfig.port, function() {
  console.log(`Server running on port ${config.AppConfig.port}`);
  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
    }
    console.log('Connected to the database');
  });
});

module.exports = app;
