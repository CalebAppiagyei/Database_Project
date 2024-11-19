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

app.post('/addGame', async function(req, res) {
    
})

app.post('/updateGame/:gameID', async function(req, res){

})

app.get('/getGame/:gameID', async function(req, res) {
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

app.get('/deleteGame/:gameID', async function(req, res){
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

app.post('/addPlayer', async function(req, res){
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

app.get('/getPlayer/:playerID', async function(req, res){
    const id = req.params.playerID

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

app.get('/updatePlayer/:playerID', async function(req, res){
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

app.delete('/deletePlayer/:playerID', async function(req, res){
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

module.exports = app;