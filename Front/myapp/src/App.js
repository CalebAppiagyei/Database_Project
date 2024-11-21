import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";  
import AdminView from "./views/AdminView";
import "./AdminView.css";
import Searchbar from "./components/Searchbar";
import CoachCard from "./components/CoachCard";
import PlayerCard from "./components/PlayerCard";
import TeamCard from "./components/TeamCard";
const BookData = require('./Data.json');
const routes = require('./routes.js');

function App() {
  const initialData = {
    Game: [
      { Game_id: 1, Year: 2023, Team_away: "Arizona Cardinals", Team_home: "Buffalo Bills" },
      { Game_id: 2, Year: 2022, Team_away: "Baltimore Ravens", Team_home: "Atlanta Falcons" },
    ],
    GameStats: [
        { Game_id: 2, Team_id: 1, total_yards: 300, total_tds: 4, total_fgs: 2, turnovers: 3 },
    ],
    Player: [
        { Player_id: 1, Position_id: 1, Team_id: 1}
    ],
    PlayerStats: [
      { Player_id: 1, Game_id: 1, Passing_yds: 320, Rushing_yds: 50, Receiving_yds: 0, Passing_tds: 3 },
      { Player_id: 2, Game_id: 2, Passing_yds: 200, Rushing_yds: 80, Receiving_yds: 30, Passing_tds: 1 },
    ],
    Coach: [
        { Coach_id: 1, first_name: "Greg", last_name: "Greg" },
        { Coach_id: 2, first_name: "Stan", last_name: "Stan" }
    ],
    Team: [
        {Team_id: 1, Year: 1999, Coach_id: 1, Conference_id: 2, Name: "Ravens", WL_pct: 0.56},
        {Team_id: 2, Year: 1998, Coach_id: 2, Conference_id: 1, Name: "Bears", WL_pct: 0.87},
        {Team_id: 3, Year: 1997, Coach_id: 2, Conference_id: 1, Name: "Bears", WL_pct: 0.66}
    ]
  };

  /**
   * Load the data into local storage with the given key
   */
  function saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /**
   * Get the data from local storage if data with the key exists
   * @returns The data as an array of objects
   */
  function loadDataFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

 

  useEffect(() => {
    //Initally populate the local data files
    async function fetchAndSaveAllData(){
      const Teams = await routes.getAllTeams();
      const players = await routes.getAllPlayers();
      const coaches = await routes.getAllCoaches();


      saveDataToLocalStorage('PlayerData', players);
      saveDataToLocalStorage('CoachData', coaches);
      saveDataToLocalStorage('TeamData', Teams);
    }
    fetchAndSaveAllData();
  }, [])


  const [data, setData] = useState(initialData);

  return (
    <Router>
      <div className="App">


        {/* Routes */}
        <Routes>
          <Route 
            path="/admin" 
            element={
              <>
                <h1>Admin View</h1>
                <AdminView data={data} setData={setData} />
              </>
            } 
          />
          <Route 
            path="/user" 
            element={
              <>
                <h1>The Fantasy Football Database</h1>
                <div>Search and compare your favorite coachs, teams, and players.</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', marginTop: '10rem' }}>
                  <CoachCard />
                  <PlayerCard />
                  <TeamCard />
                </div>
              </>
            } 
          />

          <Route 
            path="/" 
            element={
              <>
                <h1>Welcome</h1>
                <p>THIS WILL BE LOGIN PAGE???</p>
              </>
            } 
          />
          <Route 
            path="/player" 
            element={
              <>
                <h1>Player Search</h1>
                <Searchbar placeholder="Enter a player" dataLoadFunction={loadDataFromLocalStorage} searchType={"Player"}/>
              </>
            } 
          />
          <Route 
            path="/coach" 
            element={
              <>
                <h1>Coach Search</h1>
                <Searchbar placeholder="Enter a coach" dataLoadFunction={loadDataFromLocalStorage} searchType={"Coach"}/>
              </>
            } 
          />
          <Route 
            path="/team" 
            element={
              <>
                <h1>Team Search</h1>
                <Searchbar placeholder="Enter a team" dataLoadFunction={loadDataFromLocalStorage} searchType={"Team"}/>
              </>
            } 
          />
          <Route 
            path="/compare" 
            element={
              <>
                <h1>Welcome</h1>
                <p>THIS WILL BE COMPARE PAGE???</p>
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;