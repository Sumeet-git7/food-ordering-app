const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "mydb.cyfkg82oink0.us-east-1.rds.amazonaws.com",   // e.g. foodapp-db.xxxx.ap-south-1.rds.amazonaws.com
  user: "admin",
  password: "sumeet123",
  database: "foodapp"
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err);
  } else {
    console.log("✅ Connected to RDS MySQL");
  }
});

module.exports = db;