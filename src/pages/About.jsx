import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { translateText } from '../utils/translation';
import { getCurrentLanguage } from '../utils/translation';
import TextPressure from '../components/TextPressure';
import './About.css';

const About = () => {
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      const lang = getCurrentLanguage();
      const texts = {
        title: 'About CookBook',
        subtitle: 'Cook smarter eat better',
        description: 'CookBook is a modern, multilingual recipe discovery platform that helps you explore and save recipes from around the world. With features like voice search, real-time translation, and interactive cooking tools, CookBook makes cooking more accessible and enjoyable.',
        features: 'Features',
        feature1: 'Recipe Discovery',
        feature1Desc: 'Search recipes by name, ingredient, or cuisine from TheMealDB API',
        feature2: 'Multilingual Support',
        feature2Desc: 'Real-time translation using LibreTranslate API for multiple languages',
        feature3: 'Voice Search',
        feature3Desc: 'Search recipes using your voice with Web Speech API',
        feature4: 'Interactive Tools',
        feature4Desc: 'Ingredient checklist, cooking timer, and recipe ratings',
        feature5: 'Save & Organize',
        feature5Desc: 'Save your favorite recipes and organize them in your personal cookbook',
        feature6: 'Community Recipes',
        feature6Desc: 'Share and discover recipes from the community',
        tech: 'Technologies Used',
        api: 'APIs'
      };

      if (lang !== 'en') {
        const translated = {};
        for (const [key, value] of Object.entries(texts)) {
          translated[key] = await translateText(value, lang);
        }
        setTranslations(translated);
      } else {
        setTranslations(texts);
      }
    };
    loadTranslations();
  }, []);

  return (
    <div className="about-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <i className="fas fa-info-circle" style={{ fontSize: '3rem', color: '#ff6b35' }}></i>
            <div style={{ position: 'relative', height: '160px', width: '100%' }}>
              <TextPressure
                text={translations.title || 'About CookBook'}
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                textColor="#ff6b35"
                strokeColor="#ff6b35"
                minFontSize={30}
                className=""
                scale={false}
              />
            </div>
          </div>
          <p className="subtitle">{translations.subtitle || 'Cook smarter eat better'}</p>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="description">
            {translations.description || 'CookBook is a modern, multilingual recipe discovery platform that helps you explore and save recipes from around the world.'}
          </p>

          <section className="features-section">
            <h2>
              <i className="fas fa-star"></i> {translations.features || 'Features'}
            </h2>
            <div className="features-grid">
              <div className="feature-card">
                <i className="fas fa-search"></i>
                <h3>{translations.feature1 || 'Recipe Discovery'}</h3>
                <p>{translations.feature1Desc || 'Search recipes by name, ingredient, or cuisine'}</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-language"></i>
                <h3>{translations.feature2 || 'Multilingual Support'}</h3>
                <p>{translations.feature2Desc || 'Real-time translation for multiple languages'}</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-microphone"></i>
                <h3>{translations.feature3 || 'Voice Search'}</h3>
                <p>{translations.feature3Desc || 'Search recipes using your voice'}</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-tools"></i>
                <h3>{translations.feature4 || 'Interactive Tools'}</h3>
                <p>{translations.feature4Desc || 'Checklist, timer, and ratings'}</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-bookmark"></i>
                <h3>{translations.feature5 || 'Save & Organize'}</h3>
                <p>{translations.feature5Desc || 'Save and organize your favorite recipes'}</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-users"></i>
                <h3>{translations.feature6 || 'Community Recipes'}</h3>
                <p>{translations.feature6Desc || 'Share and discover community recipes'}</p>
              </div>
            </div>
          </section>

          <section className="tech-section">
            <h2>
              <i className="fas fa-code"></i> {translations.tech || 'Technologies Used'}
            </h2>
            <div className="tech-list">
              <div className="tech-item">
                <strong>Frontend:</strong> React
              </div>
              <div className="tech-item">
                <strong>{translations.api || 'APIs'}:</strong> TheMealDB, LibreTranslate, Web Speech API
              </div>
              <div className="tech-item">
                <strong>Storage:</strong> JSON server, Local Storage
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

