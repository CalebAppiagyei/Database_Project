import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function CustomTable(props){
    return (
        <TableContainer component={Paper}>
        <Table sx={{ width: "90vw" }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="left" sx={{ width: "8vw"}}>ID</TableCell>
                    <TableCell align="left" sx={{ width: "8vw"}}>Name</TableCell>
                    <TableCell align="left" sx={{ width: "8vw"}}>Position</TableCell>
                    <TableCell align="left" sx={{ width: "8vw"}}>Team</TableCell>
                    <TableCell align="left" sx={{ width: "8vw"}}>Row Delete</TableCell>
                    <TableCell align="left" sx={{ width: "8vw"}}>Row Edit</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.rows.map((row) => (
                    <TableRow key={row.id}>
                    <TableCell component="th" scope="row" align="left"> {row.id} </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.pos}</TableCell>
                    <TableCell align="left">{row.team}</TableCell>
                    <TableCell align="left">
                        {
                            <button
                            onClick={() => props.deleteHandler(row.id)}
                            style={{
                                color: 'white',
                                backgroundColor: 'red',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                cursor: 'pointer',
                            }}
                            >
                                Delete
                            </button>
                        }
                    </TableCell>
                    <TableCell align="left">
                    {
                            <button
                            onClick={() => props.openEdit(row)}
                            style={{
                                color: 'white',
                                backgroundColor: "#1b5e20",
                                border: 'none',
                                borderRadius: '5px',
                                padding: '5px 10px',
                                cursor: 'pointer',
                            }}
                            >
                                Edit
                            </button>
                        }
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

export default CustomTable;