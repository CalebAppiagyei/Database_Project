import { useState, useEffect } from "react";
import SearchBars from "./ComparePage/SearchBars";
import CustomTable from "./ComparePage/CustomTable.js";
import CompareTable from "./ComparePage/CompareTable.js";
import Button from "@mui/material/Button"

const routes = require('../routes.js');
function ComparePage(){
    const [player1Name, setPlayer1Name] = useState("");
    const [player2Name, setPlayer2Name] = useState("");
    const [playerData, setPlayerData] = useState([]);
    const [rows1, setRows1] = useState([]);
    const [rows2, setRows2] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);
    const [player1, setPlayer1] = useState({});
    const [player2, setPlayer2] = useState({});

    return (
        <>
            <SearchBars setPlayer1Name={setPlayer1Name} setPlayer2Name={setPlayer2Name}/>
            <div className="TablesWrapper" style={{display: "flex", flexDirection: "row"}}>
                <div style={{width:"45%", margin: "2.5%"}}>
                    Click a row to add the Player to the table:
                    <CustomTable rows={rows1} searchQuery={player1Name} setPlayer={setPlayer1}/>
                </div>
                <div style={{width:"45%", margin: "2.5%"}}>
                    Click a row to add the Player to the table:
                    <CustomTable rows={rows2} searchQuery={player2Name} setPlayer={setPlayer2}/>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "row", width: "100%", justifyContent: "center"}}>
                <Button sx={{margin: "20px", width: "160px"}}>Download Table</Button>
                <Button sx={{margin: "20px", width: "160px"}}>Download Graph</Button>
            </div>
            
            Player game average:
            <div className="CompareTablesWrapper" style={{width: "100%", marginTop: "30px"}}>
                <CompareTable player1={player1} player2={player2}/>
            </div>
            
        </>
    );
}

export default ComparePage;