import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const BACKENDPORT = 5000;
  const BACKENDURL = `http://localhost:${BACKENDPORT}`
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
  const [selectedTable, setSelectedTable] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [action, setAction] = useState(null); // 'add' or 'edit'
  const [formData, setFormData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    // Log data to verify structure
    console.log("Data structure:", data);
  }, [data]);

  const openModal = (table, actionType, row = null) => {
    setSelectedTable(table);
    setAction(actionType);
    setFormData(row || {});
    setModalVisible(true);
    setSelectedRow(row);
  };

  const handleAdd = (table) => openModal(table, "add");

  const handleEdit = (table, row) => openModal(table, "edit", row);

  const handleDelete = (table, row) => {
    const updatedTable = data[table].filter((r) => r !== row);
    setData({ ...data, [table]: updatedTable });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedTable;
    if (action === "add") {
      const newEntry = { ...formData };
      
      // Auto-increment primary keys for tables with unique identifiers
      if (selectedTable === "Game") {
        const highestId = Math.max(...data.Game.map((item) => item.Game_id), 0);
        newEntry.Game_id = highestId + 1;
      } else if (selectedTable === "PlayerStats") {
        const highestId = Math.max(...data.PlayerStats.map((item) => item.Player_id), 0);
        newEntry.Player_id = highestId + 1;
      }

      updatedTable = [...data[selectedTable], newEntry];
    } else if (action === "edit") {
      updatedTable = data[selectedTable].map((item) =>
        item === selectedRow ? formData : item
      );
    }
    setData({ ...data, [selectedTable]: updatedTable });
    setModalVisible(false);
    setFormData({});
  };

  const renderField = (field, value) => {
    // Auto-assign fields like Game_id or Player_id; skip them in the form
    if (field === "Game_id" || field === "Player_id") {
      return <span>{value || "Auto-assigned"}</span>;
    }

    return (
      <input
        type="text"
        name={field}
        value={value || ""}
        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
      />
    );
  };

  
  async function addPlayer(){
    //TODO: Add a function parameter for the player and update contents

    //Update with the contents of the data of the player to be added
    //Only these 3 fields are needed to add a player
    const contents = {
      Name: "Test",
      position: "QB",
      team: "test"
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
      console.log(result);

      //TODO: assign the player ID to the player on the frontend
      //Right now, the backend sends the playerID that was given to the player on DB insertion
      const playerID = result.playerID;

    } catch (error) {
      console.error('An error occurred while adding a player:', error);
    }
  }

  async function getPlayer(playerID){
    try {
      //Send the request to the backend
      const response = await fetch(`${BACKENDURL}/getPlayer/${playerID}`);
      const result = await response.json();

      //Access all of the fields sent by a successful response
      const player = result.player;
      const { player_id, name, team, position, position_id } = player;

      console.log('Player details:', { player_id, name, team, position, position_id });

      // TODO: whatever is needed with the player data

  } catch (error) {
      console.error('An error occurred while getting a player:', error);
  }
  };

  return (
    <Router>
      <div className="App">
      <h1>Sports Database Management</h1>
      {Object.keys(data).map((table) => (
        <div key={table} className="section">
          <h2>{table}</h2>
          <button onClick={() => handleAdd(table)}>Add {table}</button>
          <table>
            <thead>
              <tr>
                {Object.keys(data[table][0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data[table].map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, idx) => (
                    <td key={idx}>{val}</td>
                  ))}
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(table, row)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(table, row)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {modalVisible && (
        <>
          <div className="overlay" onClick={() => setModalVisible(false)} />
          <div className="modal">
            <h2>{action === "add" ? `Add to ${selectedTable}` : `Edit ${selectedTable}`}</h2>
            <form onSubmit={handleSubmit}>
              {Object.keys(data[selectedTable][0]).map((field) => (
                <div key={field}>
                  <label>{field}:</label>
                  {renderField(field, formData[field])}
                </div>
              ))}
              <button type="submit">{action === "add" ? "Insert" : "Update"}</button>
              <button type="button" onClick={() => setModalVisible(false)}>Cancel</button>
            </form>
          </div>
        </>
      )}
    </div>
    </Router>
  );
}

export default App;
