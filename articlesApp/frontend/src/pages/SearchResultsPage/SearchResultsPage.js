import React, { useState } from 'react';
import './SearchResultsPage.css';

function SearchResultsPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://articlesApp-backend.cloud-stacks.com/api/search?query=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error fetching search results');
            }

            const data = await response.json();
            setResults(data.articles);
            setError('');
        } catch (err) {
            setError('An error occurred while searching for articles.');
        }
    };

    return (
        <div className="search-results-page">
            <header className="header">
                <div className="branding">Brand</div>
                <nav className="navigation">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>
            <main className="main-content">
                <h1>User searches for specific topics</h1>
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Enter keywords..." 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="search-results">
                    {results.map(result => (
                        <div key={result.url} className="result-item">
                            <h2>{result.title}</h2>
                            <a href={result.url} className="read-more">Read more</a>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="footer">
                <a href="#terms">Terms of Service</a>
                <a href="#privacy">Privacy Policy</a>
            </footer>
        </div>
    );
}

export default SearchResultsPage;
