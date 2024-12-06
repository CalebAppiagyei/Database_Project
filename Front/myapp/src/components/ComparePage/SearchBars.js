import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

function SearchBars(props) {
    const [searchQuery1, setSearchQuery1] = useState("");
    const [searchQuery2, setSearchQuery2] = useState("");



    return (
        <>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                    Player 1:
                    <TextField
                        id="outlined-basic"
                        label="Player Search"
                        variant="outlined"
                        sx={{
                            backgroundColor: "white",
                            width: "80%",
                            alignSelf: "center"
                        }}
                        value={searchQuery1}
                        onChange={(e) => {props.setPlayer1Name(e.target.value); setSearchQuery1(e.target.value)}}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "column", width: "50%" }}>
                    Player 2:
                    <TextField
                        id="outlined-basic"
                        label="Player Search"
                        variant="outlined"
                        sx={{
                            backgroundColor: "white",
                            width: "80%",
                            alignSelf: "center"
                        }}
                        value={searchQuery2}
                        onChange={(e) => {props.setPlayer2Name(e.target.value); setSearchQuery2(e.target.value)}}
                    />
                </div>
            </div>
        </>
    );
}

export default SearchBars;
