import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import axios from 'axios';
import Swal from 'sweetalert2';
import './loginsignup.css';
import user from '../assets/user.png';
import email from '../assets/email.png';
import password from '../assets/password.png';

const Loginsignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Toggle password visibility
  const [isLoading, setIsLoading] = useState(false); // Prevent duplicate submissions
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (isLoading) return; // Prevent duplicate requests
    setIsLoading(true);
  
    const endpoint = action === "Sign Up" ? "/signup" : "/login";
    const payload = action === "Sign Up"
      ? { name, email: emailInput, password: passwordInput }
      : { email: emailInput, password: passwordInput };
  
    console.log("Submitting to:", endpoint);
    console.log("Payload:", payload);
  
    try {
      const response = await axios.post(endpoint, payload);
      console.log("Response data:", response.data);
  
      if (response.data.token) {
        console.log("Signup/Login successful, token received.");
  
        localStorage.setItem("token", response.data.token);
  
        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: `${action} was successful!`,
          confirmButtonColor: '#649673',
        }).then(() => {
          console.log("Navigating to /admin");
          navigate("/compare");
        });
      } else {
        console.log("No token in response:", response.data);
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'An error occurred. Please try again.',
        confirmButtonColor: '#d33',
      });
    } finally {
      setIsLoading(false); // Reset loading state
      console.log("Finished handling submit");
    }
  };
  

  return (
    <div className="container">
      {/* Animated Header */}
      <motion.h1
        className="header-title"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2 }}
        style={{
          fontSize: "3rem",
          color: "#649673",
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
          textShadow: "1.5px 1.5px #09431F",
        }}
      >
        Football Finder
      </motion.h1>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
      <text className="text">or</text>
      <button className="guest-button" onClick={() => navigate("/user")}>
        Continue as Guest
      </button>
      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={user} alt="" className="icon" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <img src={email} alt="" className="icon" />
          <input
            type="text"
            placeholder="Email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password} alt="" className="icon" />
          <input
            type={passwordVisible ? "text" : "password"} // Toggle password visibility
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="password-toggle-button"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              marginLeft: '10px',
            }}
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {action === "Sign Up" || (
        <div className="forgot-password">
          Forgot password? <span><b>Click here!</b></span>
        </div>
      )}

      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={isLoading} // Disable button when loading
        style={isLoading ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
      >
        {isLoading ? 'Processing...' : 'Finish'}
      </button>
    </div>
  );
};

export default Loginsignup;
