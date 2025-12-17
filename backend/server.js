const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(express.json());

// Database
const db = new sqlite3.Database("data.db");

// Tạo bảng
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`);

// API test
app.get("/", (req, res) => {
  res.send("Backend + Database running OK");
});

// API lấy dữ liệu
app.get("/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    res.json(rows);
  });
});

// API thêm dữ liệu
app.post("/users", (req, res) => {
  const { name } = req.body;
  db.run("INSERT INTO users (name) VALUES (?)", [name]);
  res.send("User added");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("Server running on port " + PORT)
);
