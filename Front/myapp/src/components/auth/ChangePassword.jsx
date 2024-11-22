import React, { useState } from 'react';

const ChangePassword = () => {
    const [showForm, setShowForm] = useState(false);
    const [passwordData, setPasswordData] = useState({oldPassword: "", newPassword: ""});

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        // get jwt token from local storage
        const token = localStorage.getItem("token");
        if (!token) {
            alert("please log in");
            return;
        }
        try {
            const response = await fetch("/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    oldPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("password change successful");
                setShowForm(false);
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("an unexpected error??");
        }
        
    };
  return (
    <div>
        <button 
        className="submit-button"
        onClick= {() => setShowForm(true)}>
        Change Password</button>
        {showForm && (
        <div>
        <h2>Change Password</h2>
        <form onSubmit ={handlePasswordChange} className="inputs">
            <div className="input">
            <input
                type= "password"
                placeholder="old password"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                required
            />
            </div>
            <div className="input">
            <input
                type= "password"
                placeholder="new password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                required
                className="inputs"
            />
            </div>
            <div className="submit-container">
            <button className="submit-button">Submit :D</button>
            <button type="button"
            onClick={() => setShowForm(false)}
            className="submit-button">Cancel</button>
            </div>
        </form>
        
        </div>
        )}
    </div>
  )};

export default ChangePassword;