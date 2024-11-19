const express = require("express");
const config = require('./config.json');
const cors = require('cors');
const app = express();
const connection = require("./db");

const BACKENDPORT = 5000

// CORS stuff
const allowedOrigins = [`http://localhost:${config.Frontend.port}`];

app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));

// What the app will use to parse json bodies from requests
app.use(express.json());


// Start listening to the port
app.listen(BACKENDPORT, function(){
  console.log(`Listening on ${config.Backend.port}`)
});

// This endpoint gets called on every rerender of the frontend
app.get("/", async (req, res) => {
  console.log("This endpoint works /")
});

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

app.get('/getAllPlayers', async function(req, res){
    console.log('Grabbing all players');
    const sql = `
        SELECT * FROM player
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

app.get('/getAllGames', async function(req, res){
  console.log('Grabbing all games');
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

app.get('/getAllCoaches', async function(req, res) {
  console.log('Grabbing all coaches');
  const sql = `
      SELECT * FROM coach
  `;

  connection.query(sql, function(err, results) {
      if (err) {
          console.error('Error getting coaches from database:', err);
          return res.status(500).json({ error: 'Error getting coaches' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Coaches not found' });
      }
    
      res.status(200).json({ 
          message: 'Coaches retrieved successfully', 
          coaches: results
      });
  });
})

app.get('/getAllTeams', async function(req, res) {
  console.log('Grabbing all teams');
  const sql = `
      SELECT * FROM team
  `;

  connection.query(sql, function(err, results) {
      if (err) {
          console.error('Error getting teams from database:', err);
          return res.status(500).json({ error: 'Error getting teams' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'teams not found' });
      }
    
      res.status(200).json({ 
          message: 'teams retrieved successfully', 
          teams: results
      });
  });
})

app.get('/getAllSeasons', async function(req, res) {
  console.log('Grabbing all seasons');
  const sql = `
      SELECT * FROM season
  `;

  connection.query(sql, function(err, results) {
      if (err) {
          console.error('Error getting seasons from database:', err);
          return res.status(500).json({ error: 'Error getting seasons' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'seasons not found' });
      }
    
      res.status(200).json({ 
          message: 'seasons retrieved successfully', 
          seasons: results
      });
  });
})

app.get('/getAFC', async function(req, res) {
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

app.get('/getNFC', async function(req, res) {
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

// Routes for each table excluding Conference and Position (These should be pre populated)

/*
  Game routes
*/

app.post('/addGame', async function(req, res) {
  const { year, team_away, team_home } = req.body;
  console.log('Adding a game to database with params:', req.body);

  if (!year || !team_away || !team_home) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `INSERT INTO game (year, team_away, team_home) VALUES (?, ?, ?)`
  connection.query(query, [year, team_away, team_home], function(err, results) {
    if (err) {
      console.error('Error inserting game into database:', err);
      return res.status(500).json({ error: 'Error adding game'});
    }
    res.status(200).json({
      message: 'Game added successfully',
      gameId: results.insertId
    });
  }); 
})

app.put('/updateGame/:gameID', async function(req, res){
  // We'll need to ensure that the request passes in every column
  // even if there's only a change to one
  const { game_id, year, team_away, team_home } = req.body;
  console.log('Updating a game in the database with params:', req.body);

  if (!game_id || !year || !team_away || !team_home) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `UPDATE game SET year = ?, team_away = ?, team_home = ? WHERE game_id = ?`
  connection.query(query, [year, team_away, team_home, game_id], function(err, results) {
    if (err) {
      console.error("Error updating game in database:", err);
      return res.status(500).json({ error: 'Error updating game'})
    }
    res.status(200).json({
      message: 'Game updated successfully'
    });
  });
})

app.get('/getGame/:gameID', async function(req, res) {
    const id = req.params.gameID
    console.log('Grabbing game with game_id:', id);
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

app.get('/deleteGame/:gameID', async function(req, res){
    const id = req.params.gameID;
    console.log('Deleting game with game_id:', id);
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

/*
  Player routes
*/

app.post('/addPlayer', async function(req, res){
    //Unpack all of the fields sent in the request from the front end
    const { Name, position, team } = req.body;
    console.log('Adding player with params:', req.body);
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

app.get('/getPlayer/:playerID', async function(req, res){
    const id = req.params.playerID
    console.log('Grabbing player with player_id:', id);
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

app.put('/updatePlayer/:playerID', async function(req, res){
    const id = req.params.playerID;
    const { Name, position, team } = req.body;
    console.log('Updating player with params:', req.body);
    if (!Name || !position || !team) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const position_id = position_to_id(position);
    const sql = `UPDATE player SET position_id = ? Name = ?, position = ?, team = ? WHERE player_id = ?`;

    connection.query(sql, [position_id, Name, position, team, id], function(err, results) {
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

app.delete('/deletePlayer/:playerID', async function(req, res){
    const id = req.params.playerID;
    console.log('Deleting player with player_id:', id);
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

/*
  Coach routes
*/
app.post('/addCoach', async function(req, res){
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

app.get('/getCoach/:coachID', async function(req, res){
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

app.put('/updateCoach/:coachID', async function(req, res){
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

app.delete('/deleteCoach/:coachID', async function(req, res){
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

/*
   Team routes
*/
app.post('/addTeam', async function(req, res){
  //Unpack all of the fields sent in the request from the front end
  const { year, coach_id, conference_id, name, WL_pct } = req.body;
  console.log('Adding team with params:', req.body);
  if (!year || !coach_id || !conference_id || !name || !WL_pct) {
      return res.status(400).json({ error: "Missing required fields" });
  }

  //Get data ready for SQL insert
  const extra = ''
  const sql = `
      INSERT INTO team (year, coach_id, conference_id, name, WL_pct)
      VALUES (?, ?, ?, ?, ?);
  `;

  //Add data to the table
  connection.query(sql, [year, coach_id, conference_id, name, WL_pct, extra], function(err, results) {
      if (err) {
          console.error('Error inserting team into database:', err);
          return res.status(500).json({ error: 'Error adding team' });
      }
      res.status(200).json({ 
          message: 'team added successfully', 
          teamId: results.insertId
      });
  });
})

app.get('/getTeam/:teamID', async function(req, res){
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

app.put('/updateTeam/:teamID', async function(req, res){
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

app.delete('/deleteTeam/:teamID', async function(req, res){
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

/*
   Game stats routes
*/
app.post('/addGameStats', async function(req, res) {
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

app.get('/getGameStats/:gameID', async function(req, res){
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

app.put('/updateGameStats/:gameID', async function(req, res){
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

app.delete('/deleteGameStats/:gameID', async function(req, res){
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


/*
   Player stats routes
*/
app.post('/addPlayerStats', async function(req, res) {
  const { player_id, game_id, team_id, passing_yds, rushing_yds, receiving_yds,
     passing_tds, rushing_tds, receiving_tds, misc_tds, pass_attempts, completions, 
     rush_attempts, targets, receptions, turnovers } = req.body;
  console.log('Adding player stats with params:', req.body);

  if (!player_id || !game_id) {
      return res.status(400).json({ error: "Missing required fields" });
  }

  const sql = `
      INSERT INTO player_stats (player_id, game_id, team_id, passing_yds, rushing_yds, receiving_yds,
       passing_tds, rushing_tds, receiving_tds, misc_tds, pass_attempts, completions, rush_attempts, 
       targets, receptions, turnovers)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  // Add data to the table
  connection.query(sql, [player_id, game_id, team_id, passing_yds, rushing_yds, receiving_yds, 
    passing_tds, rushing_tds, receiving_tds, misc_tds, pass_attempts, completions, rush_attempts, 
    targets, receptions, turnovers], function(err, results) {
      if (err) {
          console.error('Error inserting player stats into database:', err);
          return res.status(500).json({ error: 'Error adding player stats' });
      }
      res.status(200).json({ 
          message: 'Player stats added successfully'
      });
  });
});

app.get('/getPlayerStats/:playerID/:gameID', async function(req, res) {
  const { playerID, gameID } = req.params;
  console.log('Grabbing player stats with player_id: ' + playerID + ' and game_id: ' + gameID);
  
  const sql = `
      SELECT * FROM player_stats WHERE player_id = ? AND game_id = ?
  `;

  connection.query(sql, [playerID, gameID], function(err, results) {
      if (err) {
          console.error('Error getting player stats from database:', err);
          return res.status(500).json({ error: 'Error getting player stats' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Player stats not found' });
      }

      res.status(200).json({ 
          message: 'Player stats retrieved successfully', 
          playerStats: results
      });
  });
});

app.put('/updatePlayerStats/:playerID/:gameID', async function(req, res) {
  const { playerID, gameID } = req.params;
  const { team_id, passing_yds, rushing_yds, receiving_yds, passing_tds, rushing_tds, receiving_tds, 
    misc_tds, pass_attempts, completions, rush_attempts, targets, receptions, turnovers } = req.body;
  console.log('Updating player stats with params:', req.body);

  // Check for required fields
  if (!playerID || !gameID) {
      return res.status(400).json({ error: 'Missing required fields' });
  }

  // Prepare SQL update statement
  const sql = `
      UPDATE player_stats 
      SET team_id = ?, passing_yds = ?, rushing_yds = ?, receiving_yds = ?, passing_tds = ?, 
      rushing_tds = ?, receiving_tds = ?, misc_tds = ?, pass_attempts = ?, completions = ?, 
      rush_attempts = ?, targets = ?, receptions = ?, turnovers = ?
      WHERE player_id = ? AND game_id = ?
  `;

  // Update data in the table
  connection.query(sql, [team_id, passing_yds, rushing_yds, receiving_yds, passing_tds, 
    rushing_tds, receiving_tds, misc_tds, pass_attempts, completions, rush_attempts, 
    targets, receptions, turnovers, playerID, gameID], function(err, results) {
      if (err) {
          console.error('Error updating player stats in the database:', err);
          return res.status(500).json({ error: 'Error updating player stats' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Player stats not found' });
      }

      res.status(200).json({ 
          message: 'Player stats updated successfully'
      });
  });
});

app.delete('/deletePlayerStats/:playerID/:gameID', async function(req, res) {
  const { playerID, gameID } = req.params;
  console.log('Deleting player stats with player_id:', playerID, 'and game_id:', gameID);
  
  const sql = `DELETE FROM player_stats WHERE player_id = ? AND game_id = ?`;

  connection.query(sql, [playerID, gameID], function(err, results) {
      if (err) {
          console.error('Error deleting player stats from database:', err);
          return res.status(500).json({ error: 'Error deleting player stats' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Player stats not found' });
      }

      res.status(200).json({ 
          message: 'Player stats deleted successfully'
      });
  });
});

/*
   Season routes
*/
app.post('/addSeason', async function(req, res) {
  // Unpack all of the fields sent in the request from the front end
  const { year, total_games } = req.body;
  console.log('Adding season with params:', req.body);

  // Check for required fields
  if (!year) {
      return res.status(400).json({ error: "Missing required fields" });
  }

  // Prepare SQL insert statement
  const sql = `
      INSERT INTO season (year, total_games)
      VALUES (?, ?);
  `;

  // Add data to the table
  connection.query(sql, [year, total_games || 0], function(err, results) {
      if (err) {
          console.error('Error inserting season into database:', err);
          return res.status(500).json({ error: 'Error adding season' });
      }
      res.status(200).json({ 
          message: 'Season added successfully', 
          seasonId: results.insertId
      });
  });
});

app.delete('/deleteSeason/:seasonID', async function(req, res) {
  const seasonID = req.params.seasonID;
  console.log('Deleting season with year:', seasonID);

  const sql = `DELETE FROM season WHERE year = ?`;

  connection.query(sql, [seasonID], function(err, results) {
      if (err) {
          console.error('Error deleting season from database:', err);
          return res.status(500).json({ error: 'Error deleting season' });
      }
      if (results.affectedRows === 0) {
          return res.status(404).json({ message: 'Season not found' });
      }

      res.status(200).json({ 
          message: 'Season deleted successfully'
      });
  });
});

module.exports = app;