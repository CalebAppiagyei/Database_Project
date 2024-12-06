import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function PlayerDataTable(playerData) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player ID</TableCell>
            <TableCell align="right">Game</TableCell>
            <TableCell align="right">Team</TableCell>
            <TableCell align="right">Pass Yds</TableCell>
            <TableCell align="right">Rush Yds</TableCell>
            <TableCell align="right">Receiving Yds</TableCell>
            <TableCell align="right">Pass Tds</TableCell>
            <TableCell align="right">Rush Tds</TableCell>
            <TableCell align="right">Receiving Tds</TableCell>
            <TableCell align="right">Miscellaneous Tds</TableCell>
            <TableCell align="right">Pass Attempts</TableCell>
            <TableCell align="right">Completions</TableCell>
            <TableCell align="right">Rush Attempts</TableCell>
            <TableCell align="right">Targets</TableCell>
            <TableCell align="right">Receptions</TableCell>
            <TableCell align="right">Turnovers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerData.map((game) => (
            <TableRow
              key={game.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell>{game.gameDescription}</TableCell> 
            <TableCell align="right">{game.teamName}</TableCell> 
            <TableCell align="right">{game.passingYards}</TableCell> 
            <TableCell align="right">{game.rushingYards}</TableCell> 
            <TableCell align="right">{game.receivingYards}</TableCell> 
            <TableCell align="right">{game.passingTDs}</TableCell> 
            <TableCell align="right">{game.rushingTDs}</TableCell> 
            <TableCell align="right">{game.receivingTDs}</TableCell> 
            <TableCell align="right">{game.miscTDs}</TableCell> 
            <TableCell align="right">{game.passAttempts}</TableCell> 
            <TableCell align="right">{game.completions}</TableCell> 
            <TableCell align="right">{game.rushAttempts}</TableCell> 
            <TableCell align="right">{game.targets}</TableCell> 
            <TableCell align="right">{game.receptions}</TableCell> 
            <TableCell align="right">{game.turnovers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}