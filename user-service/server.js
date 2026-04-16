const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send("User Service Running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});