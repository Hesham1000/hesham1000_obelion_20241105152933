import React, { useState, useEffect } from 'react';
import './ArticleList.css';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://articlesApp-backend.cloud-stacks.com/api/articles', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        const sortedArticles = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setArticles(sortedArticles);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div className="article-list">
      <header className="header">
        <div className="logo">Website Logo</div>
        <nav className="navigation">
          <ul>
            <li>Home</li>
            <li>Latest Articles</li>
            <li>Technology</li>
            <li>Contact Us</li>
          </ul>
        </nav>
        <input type="text" className="search-field" placeholder="Search articles..." />
      </header>
      <main>
        <div className="articles">
          {articles.map(article => (
            <div key={article.id} className="article">
              <img src={article.thumbnail} alt={article.title} className="thumbnail" />
              <h2 className="title">{article.title}</h2>
              <p className="summary">{article.summary}</p>
              <button className="read-more" onClick={() => window.location.href = `/articles/${article.id}`}>Read More</button>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <div className="additional-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-of-use">Terms of Use</a>
          <a href="/site-map">Site Map</a>
        </div>
        <div className="about-us">
          <p>About Us</p>
          <div className="social-media">
            <span>Social Media Icons</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ArticleList;
