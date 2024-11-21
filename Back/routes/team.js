const express = require('express');
const router = express.Router();
const connection = require("../connection");

/* ----------------------- Team Routes ------------------------ */

router.get('/getAllTeams', async function(req, res){
    const sql = `
        SELECT * FROM team
    `;
  
    connection.query(sql, function(err, results) {
        if (err) {
            console.error('Error getting teams from database:', err);
            return res.status(500).json({ error: 'Error getting teams' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Teams not found' });
        }
  
        res.status(200).json({ 
            message: 'TEams retrieved successfully', 
            games: results
        });
    });
  })

router.get('/getTeam/:teamID', async function(req, res){
    const id = req.params.teamID
    console.log('Grabbing team with team_id:', id);
    const sql = `
        SELECT * FROM team WHERE team_id = ?
    `;
  
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error getting team from database:', err);
            return res.status(500).json({ error: 'Error getting team' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'team not found' });
        }
  
        res.status(200).json({ 
            message: 'team retrieved successfully', 
            team: results[0]
        });
    });
  
  })
  
  router.put('/updateTeam/:teamID', async function(req, res){
    const id = req.params.teamID;
    const { year, coach_id, conference_id, name, WL_pct } = req.body;
    console.log('Updating team with params:', req.body);
    if (!year || !coach_id || !conference_id || !name || !WL_pct) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const sql = `UPDATE team SET year = ? coach_id = ?, conference_id = ?, name = ?, WL_pct = ? WHERE team_id = ?`;
  
    connection.query(sql, [year, coach_id, conference_id, name, WL_pct, id], function(err, results) {
        if (err) {
            console.error('Error updating a team in the database:', err);
            return res.status(500).json({ error: 'Error updating a team' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'team not found' });
        }
  
        res.status(200).json({ 
            message: 'team updated successfully', 
        });
    })
  })


  router.post('/addTeam', async function(req, res) {
    // Unpack all of the fields sent in the request from the front end
    const { year, coach_id, conference_id, name, WL_pct } = req.body;
    console.log('Adding team with params:', req.body);
    if (!year || !coach_id || !conference_id || !name || !WL_pct) {
        return res.status(400).json({ error: "Missing required fields" });
    }
  
    const sql = `
        INSERT INTO team (year, coach_id, conference_id, name, WL_pct)
        VALUES (?, ?, ?, ?, ?);
    `;
  
    connection.query(sql, [year, coach_id, conference_id, name, WL_pct], function(err, results) {
        if (err) {
            console.error('Error inserting team into database:', err);
            return res.status(500).json({ error: 'Error adding team' });
        }
        res.status(200).json({ 
            message: 'Team added successfully', 
            gameId: results.insertId
        });
    });
  });
  
  router.delete('/deleteTeam/:teamID', async function(req, res){
    const id = req.params.teamID;
    console.log('Deleting team with team_id:', id);
    const sql = `DELETE FROM team WHERE team_id = ?`;
  
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error deleting a team from database:', err);
            return res.status(500).json({ error: 'Error deleting a team' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'team not found' });
        }
  
        res.status(200).json({ 
            message: 'team deleted successfully', 
        });
    })
  })

  module.exports = router;