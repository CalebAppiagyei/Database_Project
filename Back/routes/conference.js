const express = require('express');
const router = express.Router();
const connection = require("../connection");

/* -------------------- Conference Routes --------------------- */
router.get('/getAFC', async function(req, res) {
    console.log('Grabbing AFC');
    const sql = `
        SELECT * FROM conference WHERE conference_id = 1
    `;
  
    connection.query(sql, function(err, results) {
        if (err) {
            console.error('Error getting AFC conference from database:', err);
            return res.status(500).json({ error: 'Error getting AFC conference' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Conference not found' });
        }
      
        res.status(200).json({ 
            message: 'Conference retrieved successfully', 
        });
    });
  })
  
  router.get('/getNFC', async function(req, res) {
    console.log('Grabbing NFC');
    const sql = `
        SELECT * FROM conference WHERE conference_id = 2
    `;
  
    connection.query(sql, function(err, results) {
        if (err) {
            console.error('Error getting NFC conference from database:', err);
            return res.status(500).json({ error: 'Error getting NFC conference' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Conference not found' });
        }
      
        res.status(200).json({ 
            message: 'Conference retrieved successfully', 
        });
    });
  })

  module.exports = router;