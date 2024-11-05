const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// GET all articles
router.get('/articles', articleController.getAllArticles);

// GET a single article by ID
router.get('/articles/:id', articleController.getArticleById);

// POST a new article
router.post('/articles', articleController.createArticle);

// PUT update an existing article
router.put('/articles/:id', articleController.updateArticle);

// DELETE an article
router.delete('/articles/:id', articleController.deleteArticle);

module.exports = router;
