import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const routes = require('../../routes.js');

function CustomTable(props){
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [playerData, setPlayerData] = useState([]);

    const createData = (id, name, pos, team) => {
        return { id, name, pos, team };
    };

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
         setFilteredRows(newRows);
     }, [playerData]);
 
     useEffect(() => {
         // Update filtered rows based on search query
         const lowerCaseQuery = props.searchQuery.toLowerCase();
         const filtered = rows.filter(
             (row) =>
                 row.name.toLowerCase().includes(lowerCaseQuery) ||
                 row.pos.toLowerCase().includes(lowerCaseQuery) ||
                 row.team.toLowerCase().includes(lowerCaseQuery)
         );
         setFilteredRows(filtered);
     }, [props.searchQuery, rows]);

     function handleRowClick(row){
        props.setPlayer(row)
     }
    return (
        <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left" sx={{ width: "8vw"}}>ID</TableCell>
                    <TableCell align="left" sx={{ width: "8vw"}}>Name</TableCell>
                    <TableCell align="left" sx={{ width: "8vw"}}>Position</TableCell>
                    <TableCell align="left" sx={{ width: "8vw"}}>Team</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredRows.slice(0, 5).map((row) => (
                    <TableRow key={row.id} onClick={() => handleRowClick(row)}>
                    <TableCell component="th" scope="row" align="left"> {row.id} </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.pos}</TableCell>
                    <TableCell align="left">{row.team}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default CustomTable;