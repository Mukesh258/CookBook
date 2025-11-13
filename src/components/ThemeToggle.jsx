import React from 'react';
import { toggleTheme, getTheme } from '../utils/theme';
import { motion } from 'framer-motion';
import '../styles/theme.css';

const ThemeToggle = () => {
  const [theme, setTheme] = React.useState(getTheme());

  const handleToggle = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  };

  return (
    <motion.button
      className="theme-toggle"
      onClick={handleToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <>
          <i className="fas fa-moon"></i>
          <span>Dark</span>
        </>
      ) : (
        <>
          <i className="fas fa-sun"></i>
          <span>Light</span>
        </>
      )}
    </motion.button>
  );
};

export default ThemeToggle;

