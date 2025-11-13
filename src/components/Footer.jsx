import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>
              <i className="fas fa-utensils"></i> CookBook
            </h3>
            <p>Your Virtual Kitchen Assistant</p>
            <p>Discover and save recipes from around the world</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/my-cookbook">My Cookbook</Link></li>
              <li><Link to="/upload">Upload Recipe</Link></li>
              <li><Link to="/community">Community</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://www.themealdb.com" target="_blank" rel="noopener noreferrer">TheMealDB API</a></li>
              <li><a href="https://libretranslate.com" target="_blank" rel="noopener noreferrer">LibreTranslate</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 CookBook. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

