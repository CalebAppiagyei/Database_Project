import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const routes = require('../../routes.js');

function CompareTable(props){
    const [rows, setRows] = useState([])
    const [player1Stats, setPlayer1Stats] = useState({})
    const [player2Stats, setPlayer2Stats] = useState({})

    function averageStats(statsArray) {
        if (!Array.isArray(statsArray) || statsArray.length === 0) {
            console.error("Invalid stats array");
            return {};
        }

        const statSums = {};
        const statCounts = statsArray.length;

        statsArray.forEach((gameStats) => {
            Object.entries(gameStats).forEach(([key, value]) => {
                if (typeof value === "number") {
                    if (!statSums[key]) {
                        statSums[key] = 0;
                    }
                    statSums[key] += value;
                }
            });
        });

        const statAverages = {};
        Object.entries(statSums).forEach(([key, total]) => {
            statAverages[key] = total / statCounts;
        });

        return statAverages;
    }

    useEffect(() => {
        async function updatePlayer1() {
            if (props.player1?.id) {
                const p1 = await routes.getPlayerStats(props.player1.id);
                const averagedStats = averageStats(p1);
                setPlayer1Stats(averagedStats);
            }
        }
        updatePlayer1();
    }, [props.player1]);

    useEffect(() => {
        async function updatePlayer2() {
            if (props.player2?.id) {
                const p2 = await routes.getPlayerStats(props.player2.id);
                const averagedStats = averageStats(p2);
                setPlayer2Stats(averagedStats);
            }
        }
        updatePlayer2();
    }, [props.player2]);

    return (
        <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center" sx={{ width: "4vw"}}>Stats</TableCell>
                    <TableCell align="center" sx={{ width: "8vw"}}>{props.player1?.name || "Player 1"}</TableCell>
                    <TableCell align="center" sx={{ width: "8vw"}}>{props.player2?.name || "Player 2"}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {Object.keys(player1Stats).map((key) => {
                if (key !== "player_id" && key !== "game_id" && key !== "team_id") {
                    if (player1Stats[key] > player2Stats[key]){
                        return (
                            <TableRow key={key}>
                                <TableCell align="center">{key}</TableCell>
                                <TableCell align="center" sx={{backgroundColor:"greenyellow"}}>{player1Stats[key]}</TableCell>
                                <TableCell align="center">{player2Stats[key]}</TableCell>
                            </TableRow>
                        )
                    }
                    else if (player1Stats[key] < player2Stats[key]){
                        return (
                            <TableRow key={key}>
                                <TableCell align="center">{key}</TableCell>
                                <TableCell align="center">{player1Stats[key]}</TableCell>
                                <TableCell align="center" sx={{backgroundColor:"greenyellow"}}>{player2Stats[key]}</TableCell>
                            </TableRow>
                        )
                    }
                    else {
                        return (
                            <TableRow key={key}>
                                <TableCell align="center">{key}</TableCell>
                                <TableCell align="center">{player1Stats[key]}</TableCell>
                                <TableCell align="center">{player2Stats[key]}</TableCell>
                            </TableRow>
                        );
                    }
                }
                return null; // Ensure that a fallback is returned if the condition is not met
            })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CompareTable;