import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";  
import AdminView from "./views/AdminView";
import "./AdminView.css";

function App() {
  const initialData = {
    Game: [
      { Game_id: 1, Year: 2023, Team_away: "Arizona Cardinals", Team_home: "Buffalo Bills" },
      { Game_id: 2, Year: 2022, Team_away: "Baltimore Ravens", Team_home: "Atlanta Falcons" },
    ],
    PlayerStats: [
      { Player_id: 1, Game_id: 1, Passing_yds: 320, Rushing_yds: 50, Receiving_yds: 0, Passing_tds: 3 },
      { Player_id: 2, Game_id: 2, Passing_yds: 200, Rushing_yds: 80, Receiving_yds: 30, Passing_tds: 1 },
    ],
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;