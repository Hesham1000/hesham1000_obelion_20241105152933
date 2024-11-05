import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://articlesApp-backend.cloud-stacks.com/api/search?query=${query}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data.articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setResults([]);
    }
  };

  return (
    <div className="search-screen">
      <header className="header">
        <div className="branding">Platform Branding</div>
        <nav className="navigation">
          <a href="/home">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <main className="main-body">
        <h1>User searches for specific topics</h1>
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Enter keywords"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="search-results">
          {results.map((article, index) => (
            <div key={index} className="article">
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <a href={article.url}>Read more</a>
              <a href={`https://twitter.com/share?url=${article.url}`} target="_blank" rel="noopener noreferrer">Share</a>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default SearchBar;
