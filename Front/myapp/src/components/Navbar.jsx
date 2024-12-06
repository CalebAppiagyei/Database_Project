import React from "react";
import { Link } from "react-router-dom";
import profile from './assets/user.png';

const Navbar = () => {
  const imgStyle = {
    width: "40px",
    height: "40px",
    cursor: "pointer",
    background: "#659673",
    transition: "transform 0.3s ease", // Add smooth transition
  };

  const imgHoverStyle = {
    transform: "scale(1.2)", // Slightly increase the size on hover
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#649673" }}>
      <Link to="/profile" style={{ textDecoration: "none", color: "black" }}>
        <img
          src={profile}
          alt="Profile Icon"
          style={imgStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = imgHoverStyle.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        />
      </Link>
    </nav>
  );
};

export default Navbar;
