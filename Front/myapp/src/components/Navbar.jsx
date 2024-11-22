import React from "react";
import { Link } from "react-router-dom";
import profile from './assets/user.png';

const Navbar = () => {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#649673" }}>
      <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
        <img
          src={profile} // Replace with your profile icon
          alt="Profile Icon"
          style={{ width: "40px", height: "40px", borderRadius: "50%", cursor: "pointer" }}
        />
      </Link>
    </nav>
  );
};

export default Navbar;
