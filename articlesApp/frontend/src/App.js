import React from 'react';
import ArticleList from './components/ArticleList/ArticleList.js';
import ArticleDetail from './components/ArticleDetail/ArticleDetail.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import ReadingList from './components/ReadingList/ReadingList.js';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the React App</h1>
      </header>
      <main>
        <SearchBar />
        <ArticleList />
        <ArticleDetail />
        <ReadingList />
      </main>
    </div>
  );
}

export default App;
