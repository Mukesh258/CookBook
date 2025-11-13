import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RecipeCard from '../components/RecipeCard';
import { getSavedRecipes, removeSavedRecipe } from '../utils/localStorage';
import { useTranslation } from '../contexts/TranslationContext';
import TextPressure from '../components/TextPressure';
import './MyCookbook.css';

const MyCookbook = () => {
  const { t } = useTranslation();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const loadSavedRecipes = () => {
    const saved = getSavedRecipes();
    setSavedRecipes(saved);
  };

  const handleRemove = (recipeId) => {
    if (window.confirm('Are you sure you want to remove this recipe?')) {
      removeSavedRecipe(recipeId);
      loadSavedRecipes();
    }
  };

  const sortedRecipes = [...savedRecipes].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.strMeal || a.name || '').localeCompare(b.strMeal || b.name || '');
      case 'cuisine':
        return (a.strArea || a.cuisine || '').localeCompare(b.strArea || b.cuisine || '');
      case 'recent':
      default:
        return new Date(b.savedAt || 0) - new Date(a.savedAt || 0);
    }
  });

  return (
    <div className="my-cookbook-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ position: 'relative', height: '180px', width: '100%' }}>
            <TextPressure
              text={`${t('myCookbook')}!`}
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ff6b35"
              strokeColor="#ff6b35"
              minFontSize={32}
              className=""
              scale={false}
            />
          </div>
          <p>Your saved recipes</p>
        </motion.div>

        {savedRecipes.length > 0 && (
          <div className="sort-controls">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Most Recent</option>
              <option value="name">Name</option>
              <option value="cuisine">Cuisine</option>
            </select>
          </div>
        )}

        {savedRecipes.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-book-open"></i>
            <p>No saved recipes yet. Start exploring and save your favorites!</p>
            <Link to="/" className="btn btn-primary">
              <i className="fas fa-search"></i> {t('exploreRecipes')}
            </Link>
          </motion.div>
        ) : (
          <div className="recipes-grid">
            {sortedRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.idMeal || recipe.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="recipe-card-wrapper"
              >
                <RecipeCard recipe={recipe} index={index} />
                <button
                  className="remove-button"
                  onClick={() => handleRemove(recipe.idMeal || recipe.id)}
                  title={translations.remove || 'Remove'}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCookbook;

