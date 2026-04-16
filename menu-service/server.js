const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const menuRoutes = require('./routes/menuRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/menu', menuRoutes);

app.get('/', (req, res) => {
  res.send("Menu Service Running");
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Menu Service running on port ${PORT}`);
});