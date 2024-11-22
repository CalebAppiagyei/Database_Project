import React from "react";
import useLogout from "./useLogout"; // Adjust the path to where useLogout is defined

const LogoutButton = () => {
  const handleLogout = useLogout();

  return (
    <button onClick={handleLogout} className="submit-button">
      Logout
    </button>
  );
};

export default LogoutButton;