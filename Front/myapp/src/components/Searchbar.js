import React, {useEffect, useState} from "react";
import "./Searchbar.css";

function Searchbar({placeholder, data, searchType}) {
    const [filteredData, setFilteredData] = useState([]);

     /**
     * Parse the player names from a collection of player objects
     * @returns An array of player names where the each index corresponds to the same
     * index of the player in PlayerData (i.e. the player at names[0] corresponds to 
     * the player at PlayerData[0])
     */
    // function parseNamesFromPlayerData(){
    //     dataLoadFunction()
    //     const names = [];
        
    //     players.map((elem) => {
    //         names.push(elem.name);
    //     })
    //     return names;
    // }

    const handleFilter = (event) => {
        const searchWord = event.target.value;
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
                        return <a className="dataItem" href={value.link}>
                            <p>{value.title}</p>
                            </a>;
                    })}
                </div>
            )}
        </div>
    )
}

export default Searchbar