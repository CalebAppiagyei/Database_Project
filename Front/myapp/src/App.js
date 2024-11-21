import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";  
import AdminView from "./views/AdminView";
import "./AdminView.css";
import Searchbar from "./components/Searchbar";
const BookData = require('./Data.json')
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
                <h1>Admin Panel</h1>
                <AdminView data={data} setData={setData} />
              </>
            } 
          />
          <Route 
            path="/user" 
            element={
              <>
                <h1>User Panel</h1>
                <div>This is the User View (to be implemented).</div>
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
                <Searchbar placeholder="Enter a player" data={BookData}/>
              </>
            } 
          />
          <Route 
            path="/coach" 
            element={
              <>
                <h1>Coach Search</h1>
                <Searchbar placeholder="Enter a coach" data={BookData}/>
              </>
            } 
          />
          <Route 
            path="/team" 
            element={
              <>
                <h1>Team Search</h1>
                <Searchbar placeholder="Enter a team" data={BookData}/>
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