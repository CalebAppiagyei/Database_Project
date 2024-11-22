import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "./HomeButton";

const CreateNewUser = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/create-new-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("User created successfully!");
        navigate("/profile");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div>
        <HomeButton />
    
    <div className="header">
        
      <h1>Create New User</h1>
      <form onSubmit={handleSubmit} className="inputs">
      <div className="input">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="input"
        />
        </div>
        <div className="input">
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="input"
        />
        </div>
        <div className="input">
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
          className="input"
        />
        </div>
        <div className="submit-container">
        <button type="submit" className="submit-button">
          Submit
        </button>
        <button type="button"
            onClick={() => navigate("/profile")}
            className="submit-button">Cancel</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default CreateNewUser;
