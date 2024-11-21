const express = require('express');
const router = express.Router();
const connection = require("../connection");

/* ----------------------- Coach Routes ----------------------- */

router.post('/addCoach', async function(req, res){
    //Unpack all of the fields sent in the request from the front end
    const { first_name, last_name} = req.body;
    console.log('Adding coach with params:', req.body);
    if (!first_name || !last_name) {
        return res.status(400).json({ error: "Missing required fields" });
    }
  
    //Get data ready for SQL insert
    const extra = ''
    const sql = `
        INSERT INTO coach (first_name, last_name)
        VALUES (?, ?);
    `;
  
    //Add data to the table
    connection.query(sql, [first_name, last_name, extra], function(err, results) {
        if (err) {
            console.error('Error inserting coach into database:', err);
            return res.status(500).json({ error: 'Error adding coach' });
        }
        res.status(200).json({ 
            message: 'Coach added successfully', 
            coachId: results.insertId
        });
    });
  })

  router.get('/getAllCoachs', async function(req, res){
    const sql = `
        SELECT * FROM coach
    `;
  
    connection.query(sql, function(err, results) {
        if (err) {
            console.error('Error getting coachs from database:', err);
            return res.status(500).json({ error: 'Error getting coachs' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Coachs not found' });
        }
  
        res.status(200).json({ 
            message: 'Coachs retrieved successfully', 
            games: results
        });
    });
  })
  
  router.get('/getCoach/:coachID', async function(req, res){
    const id = req.params.coachID
    console.log('Grabbing coach with coach_id:', id);
    const sql = `
        SELECT * FROM coach WHERE coach_id = ?
    `;
  
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error getting coach from database:', err);
            return res.status(500).json({ error: 'Error getting coach' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'coach not found' });
        }
  
        res.status(200).json({ 
            message: 'coach retrieved successfully', 
            coach: results[0]
        });
    });
  
  })
  
  router.put('/updateCoach/:coachID', async function(req, res){
    const id = req.params.coachID;
    const { first_name, last_name} = req.body;
    console.log('Updating coach with params:', req.body);
    if (!coach_id || !first_name || !last_name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
  
  
    const sql = `UPDATE coach SET first_name = ?, last_name = ? WHERE coach_id = ?`;
  
    connection.query(sql, [first_name, last_name, id], function(err, results) {
        if (err) {
            console.error('Error updating a coach in the database:', err);
            return res.status(500).json({ error: 'Error updating a coach' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'coach not found' });
        }
  
        res.status(200).json({ 
            message: 'coach updated successfully', 
        });
    })
  })
  
  router.delete('/deleteCoach/:coachID', async function(req, res){
    const id = req.params.coachID;
    console.log('Deleting coach with coach_id:', id);
    const sql = `DELETE FROM coach WHERE coach_id = ?`;
  
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error deleting a coach from database:', err);
            return res.status(500).json({ error: 'Error deleting a coach' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'coach not found' });
        }
  
        res.status(200).json({ 
            message: 'coach deleted successfully', 
        });
    })
  })

module.exports = router;