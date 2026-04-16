const db = require('../config/db');

// Place Order
exports.placeOrder = (req, res) => {
  const { user_id, item_id, quantity } = req.body;

  const query = "INSERT INTO orders (user_id, item_id, quantity) VALUES (?, ?, ?)";

  db.query(query, [user_id, item_id, quantity], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Order placed successfully" });
  });
};

// Get Orders
exports.getOrders = (req, res) => {
  const query = `
    SELECT orders.id, users.name, menu.item_name, orders.quantity
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN menu ON orders.item_id = menu.id
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};