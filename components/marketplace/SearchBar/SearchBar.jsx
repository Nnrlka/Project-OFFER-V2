import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ placeholder = 'Поиск...', autoFocus = false, onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form 
      className={`search-bar ${isFocused ? 'focused' : ''}`} 
      onSubmit={handleSubmit}
    >
      <div className="search-icon">
        <FaSearch />
      </div>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="search-input"
        autoFocus={autoFocus}
      />
      
      {query && (
        <button
          type="button"
          className="clear-btn"
          onClick={handleClear}
          aria-label="Очистить поиск"
        >
          <FaTimes />
        </button>
      )}
      
      <button type="submit" className="search-btn" aria-label="Искать">
        Найти
      </button>
    </form>
  );
};

export default SearchBar;