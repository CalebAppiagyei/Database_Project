const BACKENDPORT = 5000;
const BACKENDURL = `http://localhost:${BACKENDPORT}`
/*---------------------- Auth Routing Functions ----------------------------- */

/* --------------------- Game Routing Functions ----------------------------- */

/**
 * Gets all of the games
 * @returns The games as a collection of objects that need to be unpacked 
 */
async function getAllGames(){
    try {
        //Send the request to the backend
        const response = await fetch(`${BACKENDURL}/getAllGames`);
        const result = await response.json();
        const games = result.games
        console.log(result.message);
        return games;
    } catch (error) {
        console.error('An error occurred while getting all games:', error);
    }
}

/**
 * Add a game
 * @returns The id of the game in the DB
 */
async function addGame(year, away_team, home_team){
    const contents = {
        year: `${year}`,
        away_team: `${away_team}`,
        home_team: `${home_team}`
    };
    try{
        //Send the request to the backend
        const response = await fetch(`${BACKENDURL}/addGame`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(contents),
        });
  
        //Wait for the result from the backend
        const result = await response.json();
        const gameID = result.gameID
        console.log(result.message);
        return gameID;
      } catch (error) {
        console.error('An error occurred while adding a game:', error);
      }
}

/**
 * Updates the given game with the params
 */
async function updateGame(gameID, year, away_team_abr, home_team_abr){
    const contents = {
        year: `${year}`,
        away_team: `${away_team_abr}`,
        home_team: `${home_team_abr}`
    };
    try{
        //Send the request to the backend
        const response = await fetch(`${BACKENDURL}/updateGame/${gameID}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(contents),
        });
  
        //Wait for the result from the backend
        const result = await response.json();
        console.log(result.message);
      } catch (error) {
        console.error('An error occurred while updating a game:', error);
      }
}

/**
 * Gets the game with the given id
 * @returns The game as an object that needs to be unpacked
 */
async function getGame(gameID){
    try {
        //Send the request to the backend
        const response = await fetch(`${BACKENDURL}/getGame/${gameID}`);
        const result = await response.json();

        //Access all of the fields sent by a successful response
        const game = result.game;
        console.log(result.message);
        return game;

    } catch (error) {
        console.error('An error occurred while getting a game:', error);
    }
}

/**
 * Deletes the game with the given id
 */
async function deleteGame(gameID) {
    try{
        //Send the request to the backend
        const response = await fetch(`${BACKENDURL}/deleteGame/${gameID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        });

        //Wait for the result from the backend
        const result = await response.json();
        console.log(result.message);

    } catch (error) {
        console.error('An error occurred while deleting a game:', error);
    }
}

/* --------------------- Player Routing Functions --------------------------- */

/**
 * Gets all of the players
 * @returns The players as an array of formatted objects (player_id, name, position, team)
 */
async function getAllPlayers(){
    try {
        //Send the request to the backend
        const response = await fetch(`${BACKENDURL}/getAllPlayers`);
        const result = await response.json();

        //Map each of the objects to easy-to-read format
        const formattedPlayers = result.players.map(player => ({
            player_id: player.player_id,
            name: player.Name,
            position: player.position,
            team: player.Team
        }));

        //Access all of the fields sent by a successful response
        console.log(result.message);
        return formattedPlayers;

    } catch (error) {
        console.error('An error occurred while getting all players:', error);
    }
}

/**
 * Gets a player's stats for all games
 * @returns The stats as an array of formatted objects
 */
async function getAllPlayerStats(playerID){
    try {
        //Send the request to the backend
        const response = await fetch(`${BACKENDURL}/getAllPlayerStats/${playerID}`);
        const result = await response.json();

        //Map each of the objects to easy-to-read format
        //Undefined/Null values are assigned 0
        const formattedStats = result.stats.map(stats => ({
            gameID: stats.game_id,
            teamID: stats.team_id,
            playerName: stats.name,
            playerTeam: stats.team,
            passingYards: stats.passing_yds || 0,
            rushingYards: stats.rushing_yds || 0,
            receivingYards: stats.receiving_yds || 0,
            passingTDs: stats.passing_tds || 0,
            rushingTDs: stats.rushing_tds || 0,
            receivingTDs: stats.receiving_tds || 0,
            miscTDs: stats.misc_tds || 0,
            passAttempts: stats.pass_attempts || 0,
            completions: stats.completions || 0,
            rushAttempts: stats.rush_attempts || 0,
            targets: stats.targets || 0,
            receptions: stats.receptions || 0,
            interceptions: stats.interceptions || 0,
            fumbles: stats.fumbles || 0
        }));
        console.log(formattedStats)
        return formattedStats;

    } catch (error) {
        console.error('An error occurred while getting all players:', error);
    }
}

/**
 * Adds a player
 * @returns The id of the newly added player
 */
async function addPlayer(name, position, team){
    const contents = {
        Name: `${name}`,
        position: `${position}`,
        team: `${team}`
      };
    try{
      //Send the request to the backend
      const response = await fetch(`${BACKENDURL}/addPlayer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contents),
      });

      //Wait for the result from the backend
      const result = await response.json();
      const playerID = result.playerID;
      console.log(result.message);
      return playerID;
    } catch (error) {
      console.error('An error occurred while adding a player:', error);
    }
  }

/**
 * Gets a player by playerID
 * @returns The details of the player as an object
 */
async function getPlayer(playerID){
    try {
        //Send the request to the backend
        const response = await fetch(`${BACKENDURL}/getPlayer/${playerID}`);
        const result = await response.json();

        //Access all of the fields sent by a successful response
        const player = result.player;
        console.log(result.message);
        return player;

    } catch (error) {
        console.error('An error occurred while getting a player:', error);
    }
};

/**
 * Updates the player with the given id with the params
 */
async function updatePlayer(playerID, name, position, team){
    const contents = {
        Name: `${name}`,
        position: `${position}`,
        team: `${team}`
      };
    try{
        //Send the request to the backend
        const response = await fetch(`${BACKENDURL}/updatePlayer/${playerID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contents),
        });

        //Wait for the result from the backend
        const result = await response.json();

        console.log(result.message);

    } catch (error) {
        console.error('An error occurred while updating a player:', error);
    }
};

/**
 * Deletes the player with the given id
 */
async function deletePlayer(playerID){
    try{
        //Send the request to the backend
        const response = await fetch(`${BACKENDURL}/deletePlayer/${playerID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
        });

        //Wait for the result from the backend
        const result = await response.json();
        console.log(result.message);

    } catch (error) {
        console.error('An error occurred while deleting a player:', error);
    }
};

module.exports = { getAllPlayers, addPlayer, getPlayer, updatePlayer, deletePlayer,
    getAllGames, addGame, updateGame, getGame, deleteGame, getAllPlayerStats
 };
