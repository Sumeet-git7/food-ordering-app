const db = require('../config/db');

// Add item
exports.addItem = (req, res) => {
  const { item_name, price } = req.body;

  const query = "INSERT INTO menu (item_name, price) VALUES (?, ?)";

  db.query(query, [item_name, price], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Item added successfully" });
  });
};

// Get menu
exports.getMenu = (req, res) => {
  const query = "SELECT * FROM menu";

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};