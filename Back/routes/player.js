const express = require('express');
const router = express.Router();
const connection = require("../connection");

/* -------------------- Helper Functions --------------------- */

/* Convert the string name of a position to the corresponding position ID */
function position_to_id(position){
    if (position === "QB"){
        return 1;
    }
    else if (position === "RB" || position === "FB"){
        return 2;
    }
    else if (position === "WR"){
        return 3;
    }
    else if (position === "TE"){
        return 4;
    }
    else if (position == "K"){
        return 5;
    }
    return -1;
}

/* -------------------- Player Routes --------------------- */

router.get('/getAllPlayers', async function(req, res){
    const sql = `
        SELECT * FROM player;
    `;
  
    connection.query(sql, function(err, results) {
        if (err) {
            console.error('Error getting players from database:', err);
            return res.status(500).json({ error: 'Error getting players' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Players not found' });
        }
  
        res.status(200).json({ 
            message: 'Players retrieved successfully', 
            players: results
        });
    });
  })
  
  router.post('/addPlayer', async function(req, res){
      //Unpack all of the fields sent in the request from the front end
      const { Name, position, team } = req.body;
      if (!Name || !position || !team) {
          return res.status(400).json({ error: "Missing required fields" });
      }
  
      //Get data ready for SQL insert
      const position_id = position_to_id(position);
      const extra = ''
      const sql = `
          INSERT INTO player (position_id, Name, position, team, extra)
          VALUES (?, ?, ?, ?, ?);
      `;
  
      //Add data to the table
      connection.query(sql, [position_id, Name, position, team, extra], function(err, results) {
          if (err) {
              console.error('Error inserting player into database:', err);
              return res.status(500).json({ error: 'Error adding player' });
          }
          res.status(200).json({ 
              message: 'Player added successfully', 
              playerId: results.insertId
          });
      });
  })
  
  router.get('/getPlayer/:playerID', async function(req, res){
      const id = req.params.playerID;
      
      const sql = `
          SELECT * FROM player WHERE player_id = ?
      `;
  
      connection.query(sql, [id], function(err, results) {
          if (err) {
              console.error('Error getting player from database:', err);
              return res.status(500).json({ error: 'Error getting player' });
          }
          if (results.length === 0) {
              return res.status(404).json({ message: 'Player not found' });
          }
  
          res.status(200).json({ 
              message: 'Player retrieved successfully', 
              player: results[0]
          });
      });
  
  })
  
  router.get('/updatePlayer/:playerID', async function(req, res){
    const id = req.params.playerID;
    const { Name, position, team } = req.body;
  
    if (!Name || !position || !team) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const position_id = position_to_id(position);
    const sql = `UPDATE player SET position_id = ? Name = ?, position = ?, team = ? WHERE player_id = ?`;
  
    connection.query(sql, [id, position_id, Name, position, team], function(err, results) {
        if (err) {
            console.error('Error updating a player in the database:', err);
            return res.status(500).json({ error: 'Error updating a player' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Player not found' });
        }
  
        res.status(200).json({ 
            message: 'Player updated successfully', 
        });
    })
  })
  
  router.delete('/deletePlayer/:playerID', async function(req, res){
    const id = req.params.playerID;
  
    const sql = `DELETE FROM player WHERE player_id = ?`;
  
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error deleting a player from database:', err);
            return res.status(500).json({ error: 'Error deleting a player' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Player not found' });
        }
  
        res.status(200).json({ 
            message: 'Player deleted successfully', 
        });
    })
  })

  module.exports = router;