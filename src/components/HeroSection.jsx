import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import { useTranslation } from '../contexts/TranslationContext';
import './HeroSection.css';
import TextPressure from './TextPressure';

const HeroSection = ({ onSearch, onCuisineSelect }) => {
  const { t } = useTranslation();

  return (
    <section className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-content container">
        <motion.div
          className="hero-icon"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <i className="fas fa-utensils"></i>
        </motion.div>
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div style={{ position: 'relative', height: '220px', width: '100%' }}>
            <TextPressure
              text={`${t('title')}!`}
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ff6b35"
              strokeColor="#ff6b35"
              minFontSize={36}
              className=""
              scale={false}
            />
          </div>
          <p className="hero-subtitle">
            {t('subtitle')}
          </p>
        </motion.div>
        <motion.div
          className="hero-search"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SearchBar onSearch={onSearch} placeholder={t('searchPlaceholder')} />
        </motion.div>
        <motion.div
          className="hero-cuisine-tags"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {['Thai', 'Chinese', 'Italian', 'Indian'].map((cuisine) => (
            <button
              key={cuisine}
              type="button"
              className="hero-cuisine-button"
              onClick={() =>
                onCuisineSelect ? onCuisineSelect(cuisine) : onSearch?.(cuisine)
              }
            >
              {cuisine}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

