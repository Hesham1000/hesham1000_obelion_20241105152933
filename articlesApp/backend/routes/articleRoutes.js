const express = require('express');
const router = express.Router();
const {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
} = require('../controllers/articleController');

router.get('/api/articles', getAllArticles);
router.get('/api/articles/:id', getArticleById);
router.post('/api/articles', createArticle);
router.put('/api/articles/:id', updateArticle);
router.delete('/api/articles/:id', deleteArticle);

module.exports = router;
