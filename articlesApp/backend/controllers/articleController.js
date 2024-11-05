const Article = require('../models/Article');

// Fetch all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
};

// Fetch a single article by ID
exports.getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
};

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.create({ title, content });
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create article' });
  }
};

// Update an existing article
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const article = await Article.findByPk(id);
    if (article) {
      article.title = title;
      article.content = content;
      await article.save();
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update article' });
  }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (article) {
      await article.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
};
