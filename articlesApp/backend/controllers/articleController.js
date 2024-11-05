const Article = require('../models/Article');

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.findAll({
      order: [['date', 'DESC']]
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching articles.' });
  }
};

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the article.' });
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, summary, thumbnail, date } = req.body;
    const newArticle = await Article.create({ title, summary, thumbnail, date });
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while creating the article.' });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, thumbnail, date } = req.body;
    
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    article.title = title;
    article.summary = summary;
    article.thumbnail = thumbnail;
    article.date = date;

    await article.save();
    res.json(article);
  } catch (error) {
    res.status(400).json({ error: 'An error occurred while updating the article.' });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    await article.destroy();
    res.json({ message: 'Article deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the article.' });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
};
