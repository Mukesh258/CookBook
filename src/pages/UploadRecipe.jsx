import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import UploadRecipeForm from '../components/UploadRecipeForm';
import { translateText } from '../utils/translation';
import { getCurrentLanguage } from '../utils/translation';
import TextPressure from '../components/TextPressure';
import './UploadRecipe.css';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../utils/localStorage';

const UploadRecipe = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [translations, setTranslations] = useState({});

  React.useEffect(() => {
    const loadTranslations = async () => {
      const lang = getCurrentLanguage();
      const texts = {
        title: 'Upload Your Recipe',
        subtitle: 'Share your favorite recipe with the community',
        success: 'Recipe uploaded successfully!',
        viewCommunity: 'View in Community',
        uploadAnother: 'Upload Another Recipe'
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

  const handleSuccess = (recipe) => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };

  if (success) {
    return (
      <motion.div
        className="upload-success"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="success-content">
          <i className="fas fa-check-circle"></i>
          <h2>{translations.success || 'Recipe uploaded successfully!'}</h2>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={() => navigate('/community')}>
              {translations.viewCommunity || 'View in Community'}
            </button>
            <button className="btn btn-outline" onClick={() => setSuccess(false)}>
              {translations.uploadAnother || 'Upload Another Recipe'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="upload-recipe-page">
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
            <i className="fas fa-upload" style={{ fontSize: '3rem', color: '#ff6b35' }}></i>
            <div style={{ position: 'relative', height: '160px', width: '100%' }}>
              <TextPressure
                text={translations.title || 'Upload Your Recipe'}
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
          <p>{translations.subtitle || 'Share your favorite recipe with the community'}</p>
        </motion.div>
        {isAuthenticated() ? (
          <UploadRecipeForm onSuccess={handleSuccess} />
        ) : (
          <motion.div
            className="auth-prompt"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <i className="fas fa-user-lock" style={{ fontSize: '2rem', color: '#ff6b35' }}></i>
              <h3 style={{ marginTop: '1rem' }}>Please sign in to upload recipes</h3>
              <p>You need an account to add recipes to the community. It only takes a minute.</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                <Link to="/signin" className="btn btn-primary">
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-outline">
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default UploadRecipe;

