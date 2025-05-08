const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err);
    process.exit(1);
  } else {
    console.log("Connected to MySQL RDS.");
  }
});


app.get("/api/transactions", (req, res) => {
  db.query("SELECT * FROM transactions ORDER BY date DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/api/transactions", (req, res) => {
    const { description, amount, category, date } = req.body;
    console.log("Received POST:", req.body); // 👈 add this
  
    const query = "INSERT INTO transactions (description, amount, category, date) VALUES (?, ?, ?, ?)";
    db.query(query, [description, amount, category, date], (err, result) => {
      if (err) {
        console.error("Insert error:", err); // 👈 log error
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: result.insertId });
    });
  });
  


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
