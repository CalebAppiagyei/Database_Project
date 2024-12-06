import React, { useState, useEffect } from "react";
import "../AdminView.css"; // Create a separate CSS file if needed.
import Profile from "../components/Profile";
import Navbar from "../components/Navbar";


// coaches you can currently specify an id (its supposed to be autoincrement)
// adds in the wrong order for game
// doesn't id for player
// doesn't actually route to backend!!! <- big one

const AdminView = ({ data, setData }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [action, setAction] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetchPlayers();
    fetchPlayerStats();
    fetchGames();
    fetchGameStats()
    fetchCoach();
    fetchTeam();
  }, []);

  const fetchPlayers = async () => {
    try {
        const response = await fetch(`http://localhost:5000/getAllPlayers`);
        const result = await response.json();
        if (response.ok) {
          setData({ Player: result.players });
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching players:", error);
      }
  };

  const fetchPlayerStats = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getAllPlayerStats`);
      const result = await response.json();
      if (response.ok) {
        setData({ PlayerStats: result.playerStats });
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  const fetchGames = async () => {
    try {
        const response = await fetch(`http://localhost:5000/getAllGames`);
        const result = await response.json();
        if (response.ok) {
            setData({ Game: result.games });
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error("Error fetching games:", error);
    }
  };

  const fetchGameStats = async () => {
    try {
        const response = await fetch(`http://localhost:5000/getAllGameStats`);
        const result = await response.json();
        if (response.ok) {
            setData({ GameStats: result.gameStats });
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error("Error fetching games: ", error);
    }
  }

  const fetchCoach = async () => {
    try {
        const response = await fetch(`http://localhost:5000/getAllCoachs`);
        const result = await response.json();
        if (response.ok) {
            setData({ Coach: result.coachs })
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error("Error fetching coachs: ", error);
    }
  }

  const fetchTeam = async () => {
    try {
        const response = await fetch(`http://localhost:5000/getAllTeams`);
        const result = await response.json();
        if (response.ok) {
            setData({ Team: result.teams })
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error("Error fetching teams: ", error);
    }
  }



  const openModal = (table, actionType, row = null) => {
    setSelectedTable(table);
    setAction(actionType);
    setFormData(row || {});
    setModalVisible(true);
    setSelectedRow(row);
  };

  const handleAdd = (table) => openModal(table, "add");

  const handleEdit = (table, row) => openModal(table, "edit", row);


  const handleDelete = async (table, row) => {
    // Update the state by filtering out the deleted record
    const updatedTable = data[table].filter((r) => r !== row);
    setData({ ...data, [table]: updatedTable });
    try {
      let endpoint = "";
      let idField = "";
  
      // Determine the endpoint and ID field based on the table
      if (table === "Player") {
        endpoint = `http://localhost:5000/deletePlayer/${row.Player_id}`;
        idField = "Player_id";
      } else if (table === "PlayerStats") {
        endpoint = `http://localhost:5000/deletePlayerStats/${row.Player_id}`;
        idField = "Player_id"
      }else if (table === "Game") {
        endpoint = `http://localhost:5000/deleteGame/${row.Game_id}`;
        idField = "Game_id";
      } else if (table === "GameStats") {
        endpoint = `http://localhost:5000/deleteGameStats/${row.Game_id}`;
        idField = "Game_id";
      } else if (table === "Coach") {
        endpoint = `http://localhost:5000/deleteCoach/${row.Coach_id}`;
        idField = "Coach_id";
      } else if (table === "Team") {
        endpoint = `http://localhost:5000/deleteTeam/${row.Team_id}`;
        idField = "Team_id";
      }
  
      // Call the backend API to delete the record
      const response = await fetch(endpoint, { method: "DELETE" });
  
      if (!response.ok) {
        throw new Error(`Failed to delete from ${table}.`);
      }
  
  
      console.log(`${table} record deleted successfully.`);
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleSubmit = async (table, formData) => {
    try {
      let endpoint = "";
      let method = action === "add" ? "POST" : "PUT"; // Use POST for add, PUT for edit
  
      // Determine the endpoint based on the table
      if (table === "Player") {
        endpoint = action === "add"
          ? "http://localhost:3001/addPlayer"
          : `http://localhost:3001/updatePlayer/${formData.Player_id}`;
      } else if (table === "PlayerStats") {
        endpoint = action === "add"
        ? "http://localhost:3001/addPlayerStats"
        : `http://localhost:3001/updatePlayerStats/${formData.Player_id}`;
      } else if (table === "Game") {
        endpoint = action === "add"
          ? "http://localhost:3001/addGame"
          : `http://localhost:3001/updateGame/${formData.Game_id}`;
      } else if (table === "GameStats") {
        endpoint = action === "add"
          ? "http://localhost:3001/addGameStats"
          : `http://localhost:3001/updateGameStats/${formData.Game_id}`;
      } else if (table === "Coach") {
        endpoint = action === "add"
          ? "http://localhost:3001/addCoach"
          : `http://localhost:3001/updateCoach/${formData.Coach_id}`;
      } else if (table === "Team") {
        endpoint = action === "add"
        ? "http://localhost:3001/addTeam"
        : `http://localhost:3001/updateTeam/${formData.Team_id}`;
     }
  
      // Make the API call to add or update the record
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to ${action} record in ${table}.`);
      }
  
      const result = await response.json();
  
      // Update the state with the modified data
      const updatedTable =
        action === "add"
            ? [...data[selectedTable], result]  // Add the new entry to the table
            : data[selectedTable].map((item) => {
                let idField;
                if (selectedTable === "Player") {
                idField = "Player_id";
                } else if (selectedTable === "PlayerStats") {
                idField = "Player_id"
                } else if (selectedTable === "Game") {
                idField = "Game_id";
                } else if (selectedTable === "GameStats") {
                idField = "Game_id";
                } else if (selectedTable === "Coach") {
                idField = "Coach_id";  
                } else if (selectedTable === "Team") {
                idField = "Team_id";     
                }

                return item[idField] === formData[idField]
                ? result  // Update the existing entry
                : item;
      });
  
      setData({ ...data, [table]: updatedTable });
  
      console.log(`Record ${action}ed successfully in ${table}.`);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let updatedTable;
    if (action === "add") {
      const newEntry = { ...formData };
      if (selectedTable === "Game") {
        const highestId = Math.max(...data.Game.map((item) => item.Game_id), 0);
        newEntry.Game_id = highestId + 1;
      } else if (selectedTable === "Player") {
        const highestId = Math.max(...data.PlayerStats.map((item) => item.Player_id), 0);
        newEntry.Player_id = highestId + 1;
      } else if (selectedTable === "PlayerStats") {
        const highestId = Math.max(...data.PlayerStats.map((item) => item.Player_id), 0);
        newEntry.Player_id = highestId + 1;
      } else if (selectedTable === "GameStats") {
        const highestId = Math.max(...data.GameStats.map((item) => item.Game_id), 0);
        newEntry.Game_id = highestId + 1;
      } else if (selectedTable === "Coach") {
        const highestId = Math.max(...data.Coach.map((item) => item.Coach_id), 0);
        newEntry.Coach_id = highestId + 1;
      } else if (selectedTable === "Team") {
        const highestId = Math.max(...data.Team.map((item) => item.Team_id), 0);
        newEntry.team_id = highestId + 1;
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
    await handleSubmit(selectedTable, formData);
    setModalVisible(false); 
  };
  

  const renderField = (field, value) => {
    if (field === "Game_id" || field === "Player_id" || field === "Coach_id" || field === "Team_id") {
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

  return (
    <div className="AdminView">
      <Navbar/>
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
                    <button onClick={() => handleEdit(table, row)}>Edit</button>
                    <button onClick={() => handleDelete(table, row)}>Delete</button>
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
            <form onSubmit={handleFormSubmit}>
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
  );
};

export default AdminView;