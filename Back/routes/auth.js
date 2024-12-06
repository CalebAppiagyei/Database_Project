const express = require('express');
const router = express.Router();
const connection = require("../connection");


const bodyParser = require("body-parser");
router.use(bodyParser.json());

const path = require("path");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey";

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required!!" });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  
      connection.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: "Error creating user" });
        }
  
        // Use result.insertId to get the ID of the newly created user
        const token = jwt.sign(
          { userId: result.insertId, email }, // Use result.insertId and email
          SECRET_KEY,
          { expiresIn: "9h" }
        );
  
        console.log("Signup successful, token generated:", token);
        res.status(201).json({ message: "User created successfully", token });
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

router.post('/login', (req, res) => {
  console.log("Request body:", req.body); 
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `SELECT * FROM users WHERE email = ?`;
  connection.query(sql, [email], async (err, results) => {
    console.log("Database results:", results); 
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    console.log("user: ", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "9h" });
    console.log("Login successful, token generated:", token); 
    res.status(200).json({ message: "Login success :)", token });
  });
});

router.get("/name-email", (req, res) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const userId = decoded.userId; // Extract userId from token
  
      const sql = `SELECT name, email FROM users WHERE id = ?`;
      connection.query(sql, [userId], (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
  
        res.status(200).json(results[0]); // Send name and email
      });
    } catch (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }
  });

  router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({message: "logout successful from backend"});
  });

  router.post('/create-new-user', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    connection.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating user" });
      }
      res.status(201).json({ message: "User created successfully" });
    });
  });

  router.post('/change-password', async (req, res) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // gets the token
    const token = authHeader.split(" ")[1];
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const userId = decoded.userId;
      const { oldPassword, newPassword } = req.body;
  
      if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Old and new passwords are required" });
      }
    
      const sql = `SELECT * FROM users WHERE id = ?`;
      connection.query(sql, [userId], async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
    
        if (results.length === 0) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const user = results[0];
        const isMatch = await bcrypt.compare(oldPassword, user.password);
    
        if (!isMatch) {
          return res.status(401).json({ message: "Old password is incorrect" });
        }
    
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = `UPDATE users SET password = ? WHERE id = ?`
    
        connection.query(updateSql, [hashedPassword, userId], (updateErr) => {
          if (updateErr) {
            console.error("Error updating password:", updateErr);
            return res.status(500).json({ message: "Failed to update password" });
          }
    
          res.status(200).json({ message: "Password changed successfully" });
        });
      });
  
    } 
    catch(err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }
  });
  
module.exports = router;