import React, {useEffect, useState} from "react";
import "./Searchbar.css";
import PlayerDataTable from "./PlayerDataTable";
const routes = require('../routes');


function Searchbar({placeholder, data, searchType}) { 
    const [filteredData, setFilteredData] = useState([]);
    const [selectedPlayerData, setSelectedPlayerData] = useState(null);

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        console.log(typeof(data));
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData([]);
        }
        else {
            setFilteredData(newFilter);
        }
    }

    async function getValue(value) {
        if (searchType === 'player') {
            const res = await routes.getAllPlayerStats(value.player_id);
            setSelectedPlayerData(res);
        } 
        else if (searchType === 'coach') {

        }
        else {

        }
    }

    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} onChange={handleFilter}/>
                <div className="searchIcon">
                </div>
            </div>
            {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <p key={key} onClick={() =>getValue(value)}>
                                {value.name}
                            </p>
                        );
                    })}
                </div>
            )}
            {selectedPlayerData && (
                <PlayerDataTable playerData={selectedPlayerData}/>
            )}
        </div>
    )
}

export default Searchbar