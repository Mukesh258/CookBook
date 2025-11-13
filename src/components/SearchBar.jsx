import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = 'Search recipes...' }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSearchClick = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.form 
      className="search-bar"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
        />
        <button type="submit" className="search-button" onClick={handleSearchClick}>
          <i className="fas fa-search"></i>
        </button>
      </div>
    </motion.form>
  );
};

export default SearchBar;

