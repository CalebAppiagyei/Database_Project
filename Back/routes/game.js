const express = require('express');
const router = express.Router();
const connection = require("../connection");

/* -------------------- Helper Functions --------------------- */

/**
 * Turn the string abreviation of a team into the team id in the database.
 * @returns The id of the given team
 */
async function teamNameToID(teamName){
    const sql = `SELECT ID FROM team WHERE abreviation = ?`;
    try {
        const results = await query(sql, [teamName]);
        if (results.length === 0) {
            throw new Error(`Team "${teamName}" not found`);
        }
        return results[0].ID;
    } catch (error) {
        console.error(`Error fetching ID for team "${teamName}":`, error.message);
        return -1;
    }
}

/* -------------------- Game Routes --------------------- */

router.get('/getAllGames', async function(req, res){
    const sql = `
        SELECT * FROM game
    `;
  
    connection.query(sql, function(err, results) {
        if (err) {
            console.error('Error getting games from database:', err);
            return res.status(500).json({ error: 'Error getting games' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Games not found' });
        }
  
        res.status(200).json({ 
            message: 'Games retrieved successfully', 
            games: results
        });
    });
  })
  
  router.post('/addGame', async function(req, res) {
      //Unpack all of the fields sent in the request from the front end
      const { year, away_team, home_team } = req.body;
      if (!year || !away_team || !home_team) {
          return res.status(400).json({ error: "Missing required fields" });
      }
      
      //Wait for the async functions to query the database
      const home_id = await teamNameToID(home_team);
      const away_id = await teamNameToID(away_team);
  
      //Get data ready for SQL insert
      const sql = `
          INSERT INTO game (year, team_away, team_home)
          VALUES (?, ?, ?);
      `;
  
      //Add data to the table
      connection.query(sql, [year, away_id, home_id], function(err, results) {
          if (err) {
              console.error('Error inserting game into database:', err);
              return res.status(500).json({ error: 'Error adding game' });
          }
          res.status(200).json({ 
              message: 'Game added successfully', 
              playerId: results.insertId
          });
      });
  })
  
  router.post('/updateGame/:gameID', async function(req, res){
    //Unpack all of the fields sent in the request from the front end
    const gameID = req.params.gameID
    const { year, away_team, home_team } = req.body;
    if (!year || !away_team || !home_team) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    //Wait for the async functions to query the database
    const home_id = await teamNameToID(home_team);
    const away_id = await teamNameToID(away_team);
  
    //Update the data in the table
    const sql = `UPDATE game SET year = ?, team_away = ?, team_home = ? WHERE game_id = ?`
    connection.query(sql, [year, away_id, home_id, gameID], function(err, results) {
      if (err) {
          console.error('Error inserting game into database:', err);
          return res.status(500).json({ error: 'Error updating game' });
      }
      res.status(200).json({ 
          message: 'Game updated successfully', 
          playerId: results.insertId
      });
    });
  })
  
  router.get('/getGame/:gameID', async function(req, res) {
    const id = req.params.gameID
  
    const sql = `
        SELECT * FROM game WHERE game_id = ?
    `;
  
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error getting game from database:', err);
            return res.status(500).json({ error: 'Error getting game' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Game not found' });
        }
  
        res.status(200).json({ 
            message: 'Game retrieved successfully', 
            game: results[0]
        });
    });
  })
  
  router.get('/deleteGame/:gameID', async function(req, res){
    const id = req.params.gameID;
  
    const sql = `DELETE FROM game WHERE game_id = ?`;
  
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error deleting a game from database:', err);
            return res.status(500).json({ error: 'Error game a player' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Game not found' });
        }
  
        res.status(200).json({ 
            message: 'Game deleted successfully', 
        });
    })
  })

  module.exports = router;