import React, { useState, useEffect } from 'react';
import './SavedArticlesPage.css';
import axios from 'axios';

const SavedArticlesPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://articlesApp-backend.cloud-stacks.com/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Failed to fetch articles');
      }
    };
    fetchArticles();
  }, []);

  const toggleSaveArticle = async (id) => {
    try {
      const article = articles.find(article => article.id === id);
      const updatedArticle = { ...article, saved: !article.saved };
      await axios.put(`https://articlesApp-backend.cloud-stacks.com/api/articles/${id}`, updatedArticle);
      setArticles(articles.map(article => 
        article.id === id ? updatedArticle : article
      ));
    } catch (error) {
      console.error('Failed to update article');
    }
  };

  return (
    <div className="saved-articles-page">
      <header className="header">
        <div className="logo">Logo</div>
        <input type="text" placeholder="Search articles..." className="search-field" />
        <div className="user-profile">Profile</div>
      </header>
      <nav className="navigation-tabs">
        <button>Category 1</button>
        <button>Category 2</button>
        <button>Category 3</button>
      </nav>
      <main className="articles-section">
        {articles.map(article => (
          <div key={article.id} className="article">
            <h2>{article.title}</h2>
            <button 
              className={`save-button ${article.saved ? 'saved' : ''}`}
              onClick={() => toggleSaveArticle(article.id)}
            >
              {article.saved ? 'Unsave' : 'Save'}
            </button>
          </div>
        ))}
      </main>
      <footer className="footer">
        <a href="/reading-list">Reading List</a>
        <a href="/settings">Settings</a>
        <a href="/other">Other</a>
      </footer>
    </div>
  );
};

export default SavedArticlesPage;
