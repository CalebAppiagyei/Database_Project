import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "./HomeButton";
import LogoutButton from "./auth/logoutButton";
import ChangePassword from "./auth/ChangePassword";

const Profile = () => {
  const [user, setUser] = useState(null); // Example data
  const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login to view profile.");
                navigate("/");
                return;
            }

            try {
                const response = await fetch("/name-email", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    alert("failed to fetch profile");
                }
            } catch(error) {
            }
        };
        fetchUserProfile();
    }, [navigate]);

  const handleCreateNewUser = () => {
    navigate("/create-new-user");
  };

  return (
    <div><HomeButton />
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <LogoutButton/>
      <button onClick={handleCreateNewUser} className="submit-button">
        Create New User
      </button>
    <ChangePassword/>
    </div>
    </div>
  );
};

export default Profile;