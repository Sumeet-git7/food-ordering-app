const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "mydb.cyfkg82oink0.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "sumeet123",
  database: "foodapp"
});

db.connect((err) => {
  if (err) console.error(err);
  else console.log("Menu Service DB Connected");
});

module.exports = db;