import React, { useState } from "react";
import "../AdminView.css"; // Create a separate CSS file if needed.

const AdminView = ({ data, setData }) => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [action, setAction] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  const openModal = (table, actionType, row = null) => {
    setSelectedTable(table);
    setAction(actionType);
    setFormData(row || {});
    setModalVisible(true);
    setSelectedRow(row);
  };

  const handleAdd = (table) => openModal(table, "add");

  const handleEdit = (table, row) => openModal(table, "edit", row);

  const handleDelete = (table, row) => {
    const updatedTable = data[table].filter((r) => r !== row);
    setData({ ...data, [table]: updatedTable });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedTable;
    if (action === "add") {
      const newEntry = { ...formData };
      if (selectedTable === "Game") {
        const highestId = Math.max(...data.Game.map((item) => item.Game_id), 0);
        newEntry.Game_id = highestId + 1;
      } else if (selectedTable === "PlayerStats") {
        const highestId = Math.max(...data.PlayerStats.map((item) => item.Player_id), 0);
        newEntry.Player_id = highestId + 1;
      }
      updatedTable = [...data[selectedTable], newEntry];
    } else if (action === "edit") {
      updatedTable = data[selectedTable].map((item) =>
        item === selectedRow ? formData : item
      );
    }
    setData({ ...data, [selectedTable]: updatedTable });
    setModalVisible(false);
    setFormData({});
  };

  const renderField = (field, value) => {
    if (field === "Game_id" || field === "Player_id") {
      return <span>{value || "Auto-assigned"}</span>;
    }

    return (
      <input
        type="text"
        name={field}
        value={value || ""}
        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
      />
    );
  };

  return (
    <div className="AdminView">
      {Object.keys(data).map((table) => (
        <div key={table} className="section">
          <h2>{table}</h2>
          <button onClick={() => handleAdd(table)}>Add {table}</button>
          <table>
            <thead>
              <tr>
                {Object.keys(data[table][0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data[table].map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((val, idx) => (
                    <td key={idx}>{val}</td>
                  ))}
                  <td>
                    <button onClick={() => handleEdit(table, row)}>Edit</button>
                    <button onClick={() => handleDelete(table, row)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {modalVisible && (
        <>
          <div className="overlay" onClick={() => setModalVisible(false)} />
          <div className="modal">
            <h2>{action === "add" ? `Add to ${selectedTable}` : `Edit ${selectedTable}`}</h2>
            <form onSubmit={handleSubmit}>
              {Object.keys(data[selectedTable][0]).map((field) => (
                <div key={field}>
                  <label>{field}:</label>
                  {renderField(field, formData[field])}
                </div>
              ))}
              <button type="submit">{action === "add" ? "Insert" : "Update"}</button>
              <button type="button" onClick={() => setModalVisible(false)}>Cancel</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminView;