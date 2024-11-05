const express = require('express');
const router = express.Router();
const { searchArticles } = require('../controllers/articleController');

// Route to handle search requests
router.get('/api/search', searchArticles);

module.exports = router;
