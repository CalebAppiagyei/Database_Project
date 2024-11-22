import React from "react";
import { Link } from "react-router-dom";
import home from './assets/home.png';

const HomeButton = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#649673" }}>
      <Link to="/home" style={{ textDecoration: "none", color: "black" }}>
        <img
          src={home} // Replace with your profile icon
          alt="Profile Icon"
          style={{ width: "40px", height: "40px", cursor: "pointer" }}
        />
      </Link>
    </nav>
  );
};

export default HomeButton;