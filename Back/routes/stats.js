const express = require('express');
const router = express.Router();
const connection = require("../connection");

/* ----------------------- Stat Routes ----------------------- */

router.get('/getAllPlayerStats/:playerID', async function(req, res){
    const playerID = req.params.playerID;
    // const sql = `SELECT 
    // ps.player_id,
    // CONCAT(ta.name, ' vs ', th.name, ' (', g.year, ')') AS game_description,
    // t.name AS team_name,
    // ps.passing_yds,
    // ps.rushing_yds,
    // ps.receiving_yds,
    // ps.passing_tds,
    // ps.rushing_tds,
    // ps.receiving_tds,
    // ps.misc_tds,
    // ps.pass_attempts,
    // ps.completions,
    // ps.rush_attempts,
    // ps.targets,
    // ps.receptions,
    // (ps.interceptions + ps.fumbles) AS turnovers
    // FROM 
    //     football_data.player_stats ps
    // JOIN 
    //     football_data.game g ON ps.game_id = g.game_id
    // JOIN 
    //     football_data.team t ON ps.team_id = t.ID
    // JOIN 
    //     football_data.team ta ON g.team_away = ta.ID
    // JOIN 
    //     football_data.team th ON g.team_home = th.ID
    // WHERE 
    //     ps.player_id = ?;`;
    const sql = `SELECT * FROM player_stats WHERE player_id=?`
  
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


router.get('/getAllGameStats/:gameID', async function(req, res){
    const gameID = req.params.gameID;
    const sql = `SELECT * FROM game_stats WHERE game_id = ?`;
  
    connection.query(sql, [ gameID ], function(err, results) {
      if (err) {
          console.error(`Error getting game's stats from database:`, err);
          return res.status(500).json({ error: 'Error getting game stats' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Game stats not found' });
      }
  
      res.status(200).json({ 
          message: 'Game stats retrieved successfully', 
          stats: results
      });
  });
});


router.post('/addPlayerStats', async function(req, res) {
    // Unpack all of the fields sent in the request from the front end
    const { player_id, game_id, passing_yards, rushing_yards, receiving_yards, passing_tds, rushing_tds, 
        receiving_tds, misc_tds, pass_attempts, completions, rush_attempts, targets, receptions, turnovers} = req.body;
    console.log('Adding player stats with params:', req.body);
    if (!player_id || !game_id || !passing_yards || !rushing_yards || !receiving_yards || !passing_tds ||
        !rushing_tds || !receiving_tds || !misc_tds || !pass_attempts || !completions || !rush_attempts ||
            !targets || !receptions || !turnovers) {
        return res.status(400).json({ error: "Missing required fields" });
    }
  
    const sql = `
        INSERT INTO player_stats (player_id, game_id, passing_yards, rushing_yards, receiving_yards, passing_tds, rushing_tds, 
        receiving_tds, misc_tds, pass_attempts, completions, rush_attempts, targets, receptions, turnovers)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
  
    connection.query(sql, [player_id, game_id, passing_yards, rushing_yards, receiving_yards, passing_tds, rushing_tds, 
        receiving_tds, misc_tds, pass_attempts, completions, rush_attempts, targets, receptions, turnovers], function(err, results) {
        if (err) {
            console.error('Error inserting player stats into database:', err);
            return res.status(500).json({ error: 'Error adding player stats' });
        }
        res.status(200).json({ 
            message: 'Player stats added successfully', 
            gameId: results.insertId
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
  
  router.get('/getPlayerStats/:playerID', async function(req, res){
    const id = req.params.playerID
    console.log('Grabbing player stats with player_id:', id);
    const sql = `
        SELECT * FROM player_stats WHERE player_id = ?
    `;
  
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error getting player stats from database:', err);
            return res.status(500).json({ error: 'Error getting player stats' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Player not found' });
        }
  
        res.status(200).json({ 
            message: 'Player stats retrieved successfully', 
            player: results[0]
        });
    });
  
  })

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

  router.put('/updatePlayerStats/:playerID', async function(req, res){
    const id = req.params.playerID;
    const { player_id, game_id, passing_yards, rushing_yards, receiving_yards, passing_tds, rushing_tds, 
        receiving_tds, misc_tds, pass_attempts, completions, rush_attempts, targets, receptions, turnovers } = req.body;
    console.log('Updating player stats with params:', req.body);
    if (!player_id || !game_id || !passing_yards || !rushing_yards || !receiving_yards || !passing_tds ||
        !rushing_tds || !receiving_tds || !misc_tds || !pass_attempts || !completions || !rush_attempts ||
            !targets || !receptions || !turnovers) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const sql = `UPDATE player_stats SET player_id = ?, game_id = ?, passing_yards = ?, rushing_yards = ?, receiving_yards = ?,
        passing_tds = ? rushing_tds = ?, receiving_tds = ?, misc_tds = ?, pass_attempts = ?, completions = ?, 
        rush_attempts = ?, targets = ?, receptions = ?, turnovers = ? WHERE player_id = ?`;
  
    connection.query(sql, [id, game_id, passing_yards, rushing_yards, receiving_yards, passing_tds, rushing_tds, 
        receiving_tds, misc_tds, pass_attempts, completions, rush_attempts, targets, receptions, turnovers], function(err, results) {
        if (err) {
            console.error('Error updating player stats in the database:', err);
            return res.status(500).json({ error: 'Error updating player stats' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'player not found' });
        }
  
        res.status(200).json({ 
            message: 'Player stats updated successfully', 
        });
    })
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

    
  router.delete('/deletePlayerStats/:playerID', async function(req, res){
    const id = req.params.playerID;
    console.log('Deleting player stats with player_id:', id);
    const sql = `DELETE FROM player_stats WHERE player_id = ?`;
  
    connection.query(sql, [id], function(err, results) {
        if (err) {
            console.error('Error deleting player stats from database:', err);
            return res.status(500).json({ error: 'Error deleting player stats' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Player not found' });
        }
  
        res.status(200).json({ 
            message: 'Player  stats deleted successfully', 
        });
    })
  })
  
  
module.exports = router;