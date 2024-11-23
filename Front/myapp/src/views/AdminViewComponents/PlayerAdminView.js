import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import CustomTable from './CustomPlayerTable.js';
import AddForm from './AddPlayerForm.js'
import EditForm from "./EditPlayerForm.js";
const routes = require('../../routes.js');

function PlayerAdminView(){
     // States
     const [rows, setRows] = useState([]);
     const [filteredRows, setFilteredRows] = useState([]);
     const [playerData, setPlayerData] = useState([]);
     const [addModalVisible, setAddModalVisible] = useState(false);
     const [editModalVisible, setEditModalVisible] = useState(false);
     const [editObj, setEditObj] = useState({});
     const [searchQuery, setSearchQuery] = useState("");
 
     /**
      * Initally fetch all of the players from the database
      */
     useEffect(() => {
         async function fetchAndSaveAllData() {
             const players = await routes.getAllPlayers();
             setPlayerData(players);
         }
         fetchAndSaveAllData();
     }, []);
 
     useEffect(() => {
         const newRows = playerData.map((player) =>
             createData(player.player_id, player.name, player.position, player.team)
         );
         setRows(newRows);
         setFilteredRows(newRows); // Initialize filteredRows with all rows
     }, [playerData]);
 
     useEffect(() => {
         // Update filtered rows based on search query
         const lowerCaseQuery = searchQuery.toLowerCase();
         const filtered = rows.filter(
             (row) =>
                 row.name.toLowerCase().includes(lowerCaseQuery) ||
                 row.pos.toLowerCase().includes(lowerCaseQuery) ||
                 row.team.toLowerCase().includes(lowerCaseQuery)
         );
         setFilteredRows(filtered);
     }, [searchQuery, rows]);
 
     const handleDelete = (id) => {
         // Update the table
         setRows((prevRows) => prevRows.filter((row) => row.id !== id));
 
         // Remove the value from playerData
         const updatedPlayerData = playerData.filter((player) => player.player_id !== id);
 
         // Update the database
         routes.deletePlayer(id);
 
         // Save the new playerData
         setPlayerData(updatedPlayerData);
     };
 
     const handleAdd = (formData) => {
         const name = formData["name"];
         const pos = formData["position"];
         const team = formData["team"];
 
         // Add the player to the db
         const newID = routes.addPlayer(name, pos, team);
 
         // Add the new row to the table
         setRows((prevRows) => [
             ...prevRows,
             createData(newID, name, pos, team),
         ]);
 
         // Update the players
         const newPlayer = { name: name, player_id: newID, position: pos, team: team };
         const updatedPlayerData = [...playerData, newPlayer];
         setPlayerData(updatedPlayerData);
     };
 
     const handleEdit = (id, formData) => {
         const name = formData["name"] || "";
         const pos = formData["position"] || "";
         const team = formData["team"] || "";
 
         try {
             // Update the player in the database
             routes.updatePlayer(id, name, pos, team);
             console.log(id, name, pos, team);
 
             // Update the rows (table data)
             const updatedRows = rows.map((row) => {
                 if (row.id === id) {
                     return { ...row, name, pos, team };
                 }
                 return row;
             });
             setRows(updatedRows);
 
             // Update the players (original data source)
             const updatedPlayerData = playerData.map((player) => {
                 if (player.player_id === id) {
                     return { ...player, name, position: pos, team };
                 }
                 return player;
             });
             setPlayerData(updatedPlayerData);
         } catch (err) {
             console.error("Error updating player:", err);
             alert("Failed to update the player. Please try again.");
         }
     };
 
     const createData = (id, name, pos, team) => {
         return { id, name, pos, team };
     };
 
     const openAdd = () => {
         setAddModalVisible(true);
     };
 
     const openEdit = (obj) => {
         setEditObj(obj);
         setEditModalVisible(true);
     };
 
     const closeEdit = () => {
         setEditObj(-1);
         setEditModalVisible(false);
     };
 
     return (
         <div className="AdminView">
             {addModalVisible && (
                 <AddForm handleAdd={handleAdd} setAddModalVisible={setAddModalVisible} />
             )}
             {editModalVisible && (
                 <EditForm editObj={editObj} handleEdit={handleEdit} closeEdit={closeEdit} />
             )}
             {!addModalVisible && !editModalVisible && (
                 <>
                     <Box
                         component="form"
                         sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
                         noValidate
                         autoComplete="off"
                     >
                         <TextField
                             id="outlined-basic"
                             label="Player Search"
                             variant="outlined"
                             sx={{ backgroundColor: "white" }}
                             value={searchQuery}
                             onChange={(e) => setSearchQuery(e.target.value)}
                         />
                     </Box>
 
                     <Button
                         sx={{ width: "10vw", height: "5vh", margin: "10px", marginBottom: "16px" }}
                         onClick={openAdd}
                     >
                         Add Player
                     </Button>
 
                     <CustomTable rows={filteredRows} deleteHandler={handleDelete} openEdit={openEdit} />
                 </>
             )}
         </div>
     );
}

export default PlayerAdminView;