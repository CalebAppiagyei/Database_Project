import React, { useState, useEffect } from "react";
import "../AdminView.css"; // Create a separate CSS file if needed.
const routes = require('../routes.js');

const AdminView = ({ loadData, saveData }) => {
    const PlayerData = useState(loadData("PlayerData"));

    const [formData, setFormData] = useState({});
    const [selectedRow, setSelectedRow] = useState(null);
    const [action, setAction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = (table, actionType, row = null) => {
        setAction(actionType);
        setFormData(row || {});
        setModalVisible(true);
        setSelectedRow(row);
    };

    const handleAdd = async (table) => {
        openModal(table, "add")
    };

    const handleEdit = async (table, row) => {
        openModal(table, "edit", row)
    };

    const handleDelete = async (data, id, type) => {
        //Update the table
        data.filter((e) => e.id != id);
        saveData("PlayerData", data);
        PlayerData = data;

        //Update the database
        routes.deletePlayer(id);
    }

    const handleSubmit = async (newData, type) =>{
        if (type === "add"){
            //Add the player to the DB
            routes.addPlayer(newData.name, newData.position, newData.team);
            
            //Get the new DB table and save locally
            const data = await routes.getAllPlayers();
            saveData("PlayerData", data);
            PlayerData = data;
        } else if (type === "edit"){
            routes.editPlayer(newData.id, newData.name, newData.position, newData.team)
        
            //Get the new DB table and save locally
            const data = await routes.getAllPlayers();
            saveData("PlayerData", data);
            PlayerData = data;
        }
    }
    
    console.log(PlayerData)
    return (
      <div className="AdminView">
        {   
            PlayerData[0].map((e) => (
                <div>{e.name}</div>
            ))
        }
      </div>
    );
}

export default AdminView;