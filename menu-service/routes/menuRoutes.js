const express = require('express');
const router = express.Router();

const { addItem, getMenu } = require('../controllers/menuController');

router.post('/add', addItem);
router.get('/', getMenu);

module.exports = router;