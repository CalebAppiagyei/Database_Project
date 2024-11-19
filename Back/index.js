const express = require("express");
const config = require('./config.json');
const cors = require('cors');
const app = express();
const connection = require("./connection");
const BACKENDPORT = config.Backend.port

//Needs to be used in query chaining
const util = require('util')
const query = util.promisify(connection.query).bind(connection);

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

// Get the routing files
const playerRoutes = require("./routes/player");
const coachRoutes = require("./routes/coach");
const gameRoutes = require("./routes/game");
const conferenceRoutes = require("./routes/conference");
const statsRoutes = require("./routes/stats");
const teamRoutes = require("./routes/team");

//Make the app listen to the endpoints
//Using no prefix so that endpoints stay the same as before
app.use('', playerRoutes);
app.use('', coachRoutes);
app.use('', gameRoutes);
app.use('', conferenceRoutes);
app.use('', statsRoutes);
app.use('', teamRoutes);

module.exports = app;