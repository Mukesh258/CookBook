import React from 'react';
import { LANGUAGES } from '../utils/translation';
import { useTranslation } from '../contexts/TranslationContext';
import '../styles/theme.css';

const LanguageSwitcher = ({ onLanguageChange }) => {
  const { currentLanguage } = useTranslation();

  return (
    <div className="language-switcher">
      <select
        className="language-select"
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        aria-label="Select language"
      >
        {Object.entries(LANGUAGES).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;

