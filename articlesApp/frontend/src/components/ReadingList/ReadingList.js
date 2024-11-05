import React, { useState, useEffect } from 'react';
import './ReadingList.css';
import axios from 'axios';

const ReadingList = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');

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

  const handleSaveArticle = (article) => {
    setSavedArticles((prevSavedArticles) => [...prevSavedArticles, article]);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="reading-list">
      <header className="header">
        <div className="logo">Logo</div>
        <div className="profile-settings">Profile | Settings</div>
      </header>
      <nav className="navigation-tabs">
        <button>All</button>
        <button>Category 1</button>
        <button>Category 2</button>
      </nav>
      <div className="search-field">
        <input type="text" placeholder="Search articles..." value={search} onChange={handleSearchChange} />
      </div>
      <main className="articles-section">
        {filteredArticles.map((article) => (
          <div key={article.id} className="article">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <button onClick={() => handleSaveArticle(article)}>Save</button>
          </div>
        ))}
      </main>
      <aside className="saved-articles">
        <h3>Saved Articles</h3>
        {savedArticles.map((article) => (
          <div key={article.id} className="saved-article">
            <h4>{article.title}</h4>
            <p>{article.content}</p>
          </div>
        ))}
      </aside>
      <footer className="footer">
        <a href="/reading-list">Reading List</a>
        <a href="/settings">Settings</a>
        <a href="/help">Help</a>
      </footer>
    </div>
  );
};

export default ReadingList;
