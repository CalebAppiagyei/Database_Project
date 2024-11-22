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
  const { name, email, password} = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required!!"});
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

router.post('/login', (req, res) => {
  console.log("Request body:", req.body); // Log the incoming request body
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `SELECT * FROM users WHERE email = ?`;
  connection.query(sql, [email], async (err, results) => {
    console.log("Database results:", results); // Log the query results
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
    console.log("Login successful, token generated:", token); // Log the generated token
    res.status(200).json({ message: "Login success :)", token });
  });
});

module.exports = router;