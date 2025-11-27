import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RecipeCard from '../components/RecipeCard';
import RatingStars from '../components/RatingStars';
import { getUploadedRecipes, removeUploadedRecipe } from '../utils/localStorage';
import { getUploadedRecipesFromServer, deleteUploadedRecipeFromServer } from '../utils/api';
import { translateText } from '../utils/translation';
import { getCurrentLanguage } from '../utils/translation';
import TextPressure from '../components/TextPressure';
import './Community.css';

const Community = () => {
  const [recipes, setRecipes] = useState([]);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      const lang = getCurrentLanguage();
      const texts = {
        title: 'Community Recipes',
        subtitle: 'Recipes shared by our community',
        empty: 'No community recipes yet. Be the first to share!',
        upload: 'Upload Recipe',
        remove: 'Remove',
        by: 'By'
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

  const loadRecipes = () => {
    // Load uploaded recipes from server and localStorage, merge without duplicates
    (async () => {
      const server = await getUploadedRecipesFromServer().catch(() => []);
      const local = getUploadedRecipes();
      const all = [...(server || []), ...(local || [])];
      // Normalize unique by id (server numeric id or local id string)
      const seen = new Set();
      const unique = [];
      for (const r of all) {
        const key = r.id || r.idMeal || r.strMeal || JSON.stringify(r);
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(r);
        }
      }
      setRecipes(unique);
    })();
  };

  const handleRemove = (recipe) => {
    if (!recipe) return;
    if (!window.confirm('Are you sure you want to remove this recipe?')) return;

    (async () => {
      const id = recipe.id;
      let deletedFromServer = false;
      // If recipe has a numeric id, try to delete from json-server
      if (typeof id === 'number') {
        deletedFromServer = await deleteUploadedRecipeFromServer(id).catch(() => false);
      }

      // If recipe has an id (local or server), remove by id; otherwise remove by name (covers old entries)
      if (id !== undefined && id !== null) {
        try {
          removeUploadedRecipe(id);
        } catch (err) {
          // ignore
        }
      } else {
        // remove by name fallback
        try {
          const name = recipe.name || recipe.strMeal;
          // lazy-import the helper to avoid circular issues
          const { removeUploadedRecipeByName } = await import('../utils/localStorage');
          removeUploadedRecipeByName(name);
        } catch (err) {
          // ignore
        }
      }

      if (!deletedFromServer && typeof id === 'number') {
        // warn the user if server deletion failed
        alert('Could not delete recipe from server; it was removed locally (if present).');
      }

      loadRecipes();
    })();
  };

  return (
    <div className="community-page">
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
            <i className="fas fa-users" style={{ fontSize: '3rem', color: '#ff6b35' }}></i>
            <div style={{ position: 'relative', height: '160px', width: '100%' }}>
              <TextPressure
                text={translations.title || 'Community Recipes'}
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
          <p>{translations.subtitle || 'Recipes shared by our community'}</p>
        </motion.div>

        {recipes.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-users"></i>
            <p>{translations.empty || 'No community recipes yet. Be the first to share!'}</p>
            <Link to="/upload" className="btn btn-primary">
              <i className="fas fa-upload"></i> {translations.upload || 'Upload Recipe'}
            </Link>
          </motion.div>
        ) : (
          <div className="recipes-grid">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.id || recipe.idMeal || recipe.strMeal || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="community-recipe-card"
              >
                  <button
                    className="card-delete"
                    onClick={() => handleRemove(recipe)}
                    title={translations.remove || 'Remove'}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                <RecipeCard recipe={recipe} index={index} />
                <div className="community-recipe-info">
                  <RatingStars recipeId={recipe.id} />
                    <button
                      className="remove-button"
                      onClick={() => handleRemove(recipe)}
                      title={translations.remove || 'Remove'}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;

