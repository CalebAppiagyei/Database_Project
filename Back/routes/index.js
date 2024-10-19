var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  db.query('SELECT * FROM some_table', function(err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

module.exports = router;
