const express = require("express");
const config = require('./config.json');
const app = express();
const connection = require("./db");

const BACKENDPORT = 5000
// Start the server and connect to the database.
app.listen(BACKENDPORT, function(){
  console.log(`Listening on ${config.Backend.port}`)
});

app.get("/", async (req, res) => {
  console.log("This endpoint works /")
});


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

//Add a game to the database or edit a game in the database
app.post('/addGame', function(req, res) {
  //const { Name, position, team } = req.body;

  // const Name = "Test"
  // const position = "Test"
  // const position_id = 7
  // const team = "Test"
  // //Random column
  // const extra = ''
  // const sql = `
  //   INSERT INTO players (position_id, Name, position, team, extra)
  //   VALUES (?, ?, ?, ?, ?);
  // `;

  // connection.query(sql, [position_id, Name, position, team, extra], function(err, results) {
  //   if (err) {
  //     console.error('Error inserting player into database:', err);
  //     return res.status(500).send('Error adding player');
  //   }

  //   res.status(201).send({ message: 'Player added successfully', playerId: results.insertId });
  // });
  console.log("REERE")
})

app.get('/getGame', async function(req, res) {
  console.log("REc");
})

app.get('/getAllGames', function(req, res){

})

app.get('/deleteGame', function(req, res){

})

app.post('addPlayer', function(req, res){
    
})

app.get('/getPlayer', function(req, res){

})

app.get('/getAllPlayers', function(req, res){

})

app.delete('/deletePlayer', function(req, res){

})

module.exports = app;