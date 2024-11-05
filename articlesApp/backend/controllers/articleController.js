// articlesApp/backend/controllers/articleController.js

const Article = require('../models/Article');

// Function to handle search request and return articles based on query
const searchArticles = async (req, res) => {
  try {
    const query = req.query.query || '';

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required.' });
    }

    const articles = await Article.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`
        }
      },
      attributes: ['title', 'summary', 'url']
    });

    return res.json({ articles });
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while searching for articles.' });
  }
};

module.exports = {
  searchArticles
};
