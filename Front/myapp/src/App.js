import React, { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";  
import AdminView from "./views/AdminView.js";
import "./AdminView.css";
import "./App.css"
import Searchbar from "./components/Searchbar";
import CoachCard from "./components/CoachCard";
import PlayerCard from "./components/PlayerCard";
import TeamCard from "./components/TeamCard";
import Loginsignup from "./components/auth/Loginsignup.jsx";
import Profile from "./components/Profile.jsx";
import CreateNewUser from "./components/CreateNewUser.jsx";
const BookData = require('./Data.json');
const routes = require('./routes.js');

function App() {
import ComparePage from "./components/ComparePage.js";
const routes = require('./routes.js');
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
                <AdminView/>
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
              // <>
              //   <h1>Welcome</h1>
              //   <p>THIS WILL BE LOGIN PAGE???</p>
              // </>
              <Loginsignup/>
            } 
          />
          <Route 
            path="/profile" 
            element={<Profile />}
          />
          <Route 
            path="/create-new-user" 
            element={<CreateNewUser />}
          />
          <Route 
            path="/player" 
            element={
              <>
                <h1>Player Search</h1>
                <button>Download results</button>
              </>
            } 
          />
          <Route 
            path="/coach" 
            element={
              <>
                <h1>Coach Search</h1>
                <button>Download results</button>
              </>
            } 
          />
          <Route 
            path="/team" 
            element={
              <>
                <h1>Team Search</h1>
                <button>Download results</button>
              </>
            } 
          />
          <Route 
            path="/compare" 
            element={
              <>
                <h1>Compare Two Players:</h1>
                {/* <div className="searchbar-container">
                    <Searchbar placeholder="Enter a player" data={loadDataFromLocalStorage('PlayerData')} />
                    <Searchbar placeholder="Enter a player" data={loadDataFromLocalStorage('PlayerData')} />
                </div> */}
                <ComparePage/>
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;