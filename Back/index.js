const express = require("express");
const config = require('./config.json');
const app = express();
const connection = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const path = require("path");

// Serve React app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Start the server and connect to the database.
app.listen(config.Backend.port, function() {
    console.log(`Server running on port ${config.Backend.port}`);
    connection.connect(function(err) {
      if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
      }
      console.log('Connected to the database');
    });
  });

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secretkey";

app.post('/signup', async (req, res) => {
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

app.post('/login', (req, res) => {
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "9h" });
    console.log("Login successful, token generated:", token); // Log the generated token
    res.status(200).json({ message: "Login success :)", token });
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({message: "logout successful from backend"});

});

app.post('/create-new-user', async (req, res) => {
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

app.post('/change-password', async (req, res) => {
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

app.get("/name-email", (req, res) => {
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
// app.get('/', function(req, res) {
//   const sql = `
//     SELECT CONCAT('SELECT * FROM ', table_name, ';') AS query
//     FROM INFORMATION_SCHEMA.TABLES
//     WHERE table_schema = 'football_data';
//   `;

//   connection.query(sql, function(err, results) {
//     if (err) {
//       console.error('Error fetching table queries:', err);
//       return res.status(500).send('Error fetching table queries');
//     }

//     let allData = [];

//     function executeQuery(index) {
//       if (index >= results.length) {
//         return res.send(
//           `Connected to the database as id ${connection.threadId}! The database contents are as follows:\n ${JSON.stringify(allData, null, 2)}`
//         );
//       }
    
//       const query = results[index].query;
//       const table_name = query.split(' ')[3];
    
//       connection.query(query, function(err, tableData) {
//         if (err) {
//           console.error('Error executing query:', query, err);
//           return res.status(500).send('Error fetching table data');
//         }
//         allData.push({ table: table_name, data: tableData });
//         executeQuery(index + 1);
//       });
//     }
//     executeQuery(0);
//   });
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Front/myapp/build/index.html"));
});
app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../Front/myapp/build/index.html"));
});
//Add a game to the database or edit a game in the database
app.post('/addGame', function(req, res) {

})

app.get('/getGame', function(req, res) {

})

app.get('/deleteGame', function(req, res){

})

app.post('addPlayer', function(req, res){
    
})

app.get('/getPlayer', function(req, res){

})

app.delete('/deletePlayer', function(req, res){

})

module.exports = app;