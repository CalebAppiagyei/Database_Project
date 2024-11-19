const express = require('express');
const router = express.Router();
const connection = require("../connection");

/* ----------------------- Stat Routes ----------------------- */

router.get('/getAllPlayerStats/:playerID', async function(req, res){
    const playerID = req.params.playerID;
    const sql = `SELECT * FROM player_stats WHERE player_id = ?`;
  
    connection.query(sql, [ playerID ], function(err, results) {
      if (err) {
          console.error(`Error getting player's stats from database:`, err);
          return res.status(500).json({ error: 'Error getting player stats' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Players stats not found' });
      }
  
      res.status(200).json({ 
          message: 'Players stats retrieved successfully', 
          stats: results
      });
  });
});

router.post('/addGameStats', async function(req, res) {
    // Unpack all of the fields sent in the request from the front end
    const { game_id, team_id, total_yards, total_tds, total_fgs, turnovers } = req.body;
    console.log('Adding game stats with params:', req.body);
    if (!game_id || !team_id || !total_yards || !total_tds || !total_fgs || !turnovers) {
        return res.status(400).json({ error: "Missing required fields" });
    }
  
    const sql = `
        INSERT INTO game_stats (game_id, team_id, total_yards, total_tds, total_fgs, turnovers)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
  
    connection.query(sql, [game_id, team_id, total_yards, total_tds, total_fgs, turnovers], function(err, results) {
        if (err) {
            console.error('Error inserting game stats into database:', err);
            return res.status(500).json({ error: 'Error adding game stats' });
        }
        res.status(200).json({ 
            message: 'Game stats added successfully', 
            gameId: results.insertId
        });
    });
  });
  
  router.get('/getGameStats/:gameID', async function(req, res){
    const id = req.params.gameID
    console.log('Grabbing game stats with game_id:', id);
    const sql = `
        SELECT * FROM game_stats WHERE game_id = ?
    `;
  
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error getting game stats from database:', err);
            return res.status(500).json({ error: 'Error getting game stats' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Game not found' });
        }
  
        res.status(200).json({ 
            message: 'Game stats retrieved successfully', 
            player: results[0]
        });
    });
  
  })
  
  router.put('/updateGameStats/:gameID', async function(req, res){
    const id = req.params.gameID;
    const { game_id, team_id, total_yards, total_tds, total_fgs, turnovers } = req.body;
    console.log('Updating game stats with params:', req.body);
    if (!game_id || !team_id || !total_yards || !total_tds || !total_fgs || !turnovers) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const sql = `UPDATE game_stats SET team_id = ?, total_yards = ?, total_tds = ?, total_fgs = ?, turnovers = ? WHERE game_id = ?`;
  
    connection.query(sql, [team_id, total_yards, total_tds, total_fgs, turnovers, game_id], function(err, results) {
        if (err) {
            console.error('Error updating game stats in the database:', err);
            return res.status(500).json({ error: 'Error updating game stats' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Game not found' });
        }
  
        res.status(200).json({ 
            message: 'Game stats updated successfully', 
        });
    })
  })
  
  router.delete('/deleteGameStats/:gameID', async function(req, res){
    const id = req.params.gameID;
    console.log('Deleting game stats with game_id:', id);
    const sql = `DELETE FROM game_stats WHERE game_id = ?`;
  
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error deleting game stats from database:', err);
            return res.status(500).json({ error: 'Error deleting game stats' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Game not found' });
        }
  
        res.status(200).json({ 
            message: 'Game stats deleted successfully', 
        });
    })
  })
  
module.exports = router;