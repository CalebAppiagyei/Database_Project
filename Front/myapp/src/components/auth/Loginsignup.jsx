import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import './loginsignup.css';

import user from '../assets/user.png';
import email from '../assets/email.png';
import password from '../assets/password.png';
import LogoutButton from './logoutButton';

const Loginsignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [name, setName] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    // const handleLogout = async () => {
    //     try {
    //         const response = await fetch("/logout", { method: "POST", credentials: "include"});
    
    //         if (response.ok) {
    //             setIsLoggedIn(false);
    //             alert("Log out successful!");
    //         } else {
    //             console.error("logout failed");
    //         }
    //     } catch (error) {
    //         console.error("error during logout: ", error);
    //     }
    // };

    const handleSubmit = async () => {
        const endpoint = action === "Sign Up" ? "/signup" : "/login";
        const payload = action === "Sign Up"
            ? { name, email: emailInput, password: passwordInput }
            : { email: emailInput, password: passwordInput };
    
        console.log("Submitting to endpoint:", endpoint);
        console.log("Payload:", payload);
    
        try {
            const response = await axios.post(endpoint, payload);
            console.log("Response data:", response.data); // Log the response
            setMessage(response.data.message);
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                setIsLoggedIn(true);
                navigate("/admin");
            }
        } catch (err) {
            console.error("Error:", err.response?.data || err.message);
            setMessage(err.response?.data?.message || "Error occurred");
        }
    };

  return (
    
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
            <div className="underline"></div>
      </div>
      <div className="submit-container">
        <div className={action==="Login" ? "submit gray" : "submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
        <div className={action==="Sign Up" ? "submit gray" : "submit"} onClick={()=>{setAction("Login")}}>Login</div>
      </div>
      <text className="text">or</text>
        <button className="guest-button" onClick={() => navigate("/user")}>Continue as Guest</button>
      <div className="inputs">
        {action==="Login"?<div></div>:<div className="input">
            <img src={user} alt="" className='icon'/>
            <input 
                type="text" 
                placeholder='Name' 
                value = {name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>}
        
        <div className="input">
            <img src={email} alt="" className='icon'/>
            <input 
                type="text" 
                placeholder='Email' 
                value = {emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
            />
        </div>

        <div className="input">
            <img src={password} alt="" className='icon'/>
            <input 
                type="text" 
                placeholder='Password' 
                value = {passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
            />
        </div>
      </div>
      {action==="Sign Up"?<div></div> : <div className="forgot-password">Forgot password? <span><b>Click here!</b></span></div>}


      <button className="submit-button" onClick={() => { alert("Button clicked"); handleSubmit(); }}>
        Finish
    </button>

    </div>
  );
};

export default Loginsignup;