const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const orderRoutes = require('./routes/orderRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send("Order Service Running");
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});