
import React, { useState, useEffect } from "react";
import "../AdminView.css"; // Create a separate CSS file if needed.
import PlayerAdminView from "./AdminViewComponents/PlayerAdminView";


// coaches you can currently specify an id (its supposed to be autoincrement)
// adds in the wrong order for game
// doesn't id for player
// doesn't actually route to backend!!! <- big one

const AdminView = ({ data, setData }) => {
    return (
      <PlayerAdminView/>
    )
}


export default AdminView;
