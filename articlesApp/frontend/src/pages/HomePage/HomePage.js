import React, { useEffect, useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('https://articlesApp-backend.cloud-stacks.com/api/articles', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const sortedArticles = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setArticles(sortedArticles);
      })
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  const handleReadMore = (id) => {
    window.location.href = `/articles/${id}`;
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">TechNews</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#latest">Latest Articles</a>
          <a href="#technology">Technology</a>
          <a href="#contact">Contact Us</a>
        </nav>
        <input type="text" className="search" placeholder="Search articles..." />
      </header>
      <main className="article-list">
        {articles.map(article => (
          <div key={article.id} className="article">
            <img src={article.thumbnail} alt={article.title} className="thumbnail" />
            <h2 className="title">{article.title}</h2>
            <p className="summary">{article.summary}</p>
            <button className="read-more" onClick={() => handleReadMore(article.id)}>Read More</button>
          </div>
        ))}
      </main>
      <footer className="footer">
        <div className="additional-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Use</a>
          <a href="#sitemap">Site Map</a>
        </div>
        <div className="about-us">
          <p>About Us</p>
          <div className="social-media">
            <a href="#facebook">Facebook</a>
            <a href="#twitter">Twitter</a>
            <a href="#linkedin">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
