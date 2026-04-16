const db = require('../config/db');

// Register
exports.registerUser = (req, res) => {
  const { name, email, password } = req.body;

  console.log("Incoming data:", name, email, password);

  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      console.error("DB ERROR:", err); // 👈 ADD THIS
      return res.status(500).json(err);
    }
    res.json({ message: "User registered successfully" });
  });
};

// Login
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email=? AND password=?";

  db.query(query, [email, password], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length > 0) {
      res.json({ message: "Login successful", user: result[0] });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
};