import React, { useEffect, useState } from 'react';
import Searchbar from '../components/Searchbar';

const PlayerView = () => {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getAllPlayers');
        const data = await response.json();

        console.log('API response:', data);

        // Check if the data is an array
        if (Array.isArray(data)) {
          setPlayerData(data);
        } else {
          console.error('Expected an array but got:', data);
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    };

    fetchPlayerData();
  }, []); 

  return (
    <>
      <h1>Player Search</h1>
      <Searchbar placeholder="Enter a player" data={playerData} />
    </>
  );
};

export default PlayerView;
