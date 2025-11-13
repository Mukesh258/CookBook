import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import VoiceSearchButton from './VoiceSearchButton';
import './Navbar.css';
import { getCurrentUser, signOut } from '../utils/localStorage';

const Navbar = ({ onVoiceSearch }) => {
  const location = useLocation();
  const { t, setCurrentLanguage } = useTranslation();

  const isActive = (path) => location.pathname === path;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, [location]);

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

        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
          >
            {t('home')}
          </Link>
          <Link 
            to="/my-cookbook" 
            className={`navbar-link ${isActive('/my-cookbook') ? 'active' : ''}`}
          >
            {t('myCookbook')}
          </Link>
          <Link 
            to="/upload" 
            className={`navbar-link ${isActive('/upload') ? 'active' : ''}`}
          >
            {t('upload')}
          </Link>
          <Link 
            to="/community" 
            className={`navbar-link ${isActive('/community') ? 'active' : ''}`}
          >
            {t('community')}
          </Link>
          <Link 
            to="/about" 
            className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
          >
            {t('about')}
          </Link>
        </div>

        <div className="navbar-actions">
          <VoiceSearchButton onVoiceResult={onVoiceSearch} />
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

        <button className="navbar-toggle" aria-label="Toggle menu">
          <i className="fas fa-bars"></i>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;

