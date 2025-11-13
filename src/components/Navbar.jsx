import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';
import { getCurrentUser, signOut } from '../utils/localStorage';

const Navbar = ({ onVoiceSearch }) => {
  const location = useLocation();
  const { t, setCurrentLanguage } = useTranslation();

  const isActive = (path) => location.pathname === path;
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [location]);

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = () => {
    signOut();
    setUser(null);
    navigate('/');
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-utensils"></i>
          <span>CookBook</span>
        </Link>

        <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {t('home')}
          </Link>
          <Link 
            to="/my-cookbook" 
            className={`navbar-link ${isActive('/my-cookbook') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {t('myCookbook')}
          </Link>
          <Link 
            to="/upload" 
            className={`navbar-link ${isActive('/upload') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {t('upload')}
          </Link>
          <Link 
            to="/community" 
            className={`navbar-link ${isActive('/community') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {t('community')}
          </Link>
          <Link 
            to="/about" 
            className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {t('about')}
          </Link>
        </div>

        <div className="navbar-actions">
          <LanguageSwitcher onLanguageChange={setCurrentLanguage} />
          <ThemeToggle />
          {user ? (
            <>
              <span className="navbar-user">{user.name || user.email}</span>
              <button className="btn btn-link" onClick={handleSignOut}>Sign Out</button>
            </>
          ) : (
            <Link to="/signin" className="navbar-link auth-link">
              {t('signIn')}
            </Link>
          )}
        </div>

        <button
          className="navbar-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((s) => !s)}
        >
          <span className="hamburger" aria-hidden="true">
            <span className="line" />
            <span className="line" />
            <span className="line" />
          </span>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;


