import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getRandomRecipe } from '../utils/api';
import { translateText } from '../utils/translation';
import { getCurrentLanguage } from '../utils/translation';
import './RecipeOfTheDay.css';

const RecipeOfTheDay = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('Recipe of the Day');

  useEffect(() => {
    const loadRecipe = async () => {
      setLoading(true);
      const today = new Date().toDateString();
      const cached = localStorage.getItem('recipe_of_the_day');
      
      if (cached) {
        const cachedData = JSON.parse(cached);
        if (cachedData.date === today) {
          setRecipe(cachedData.recipe);
          setLoading(false);
          return;
        }
      }

      const randomRecipe = await getRandomRecipe();
      if (randomRecipe) {
        setRecipe(randomRecipe);
        localStorage.setItem('recipe_of_the_day', JSON.stringify({
          date: today,
          recipe: randomRecipe
        }));
      }
      setLoading(false);
    };

    loadRecipe();
  }, []);

  useEffect(() => {
    const updateTitle = async () => {
      const lang = getCurrentLanguage();
      if (lang !== 'en') {
        const translated = await translateText('Recipe of the Day', lang);
        setTitle(translated);
      }
    };
    updateTitle();
  }, []);

  if (loading) {
    return (
      <div className="recipe-of-the-day loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <motion.section
      className="recipe-of-the-day"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <h2 className="section-title">
          <i className="fas fa-star"></i> {title}
        </h2>
        <Link to={`/recipe/${recipe.idMeal}`} className="recipe-of-the-day-card">
          <div className="recipe-of-the-day-image">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <div className="recipe-of-the-day-badge">
              <i className="fas fa-fire"></i> Today's Pick
            </div>
          </div>
          <div className="recipe-of-the-day-content">
            <h3>{recipe.strMeal}</h3>
            {recipe.strCategory && (
              <p className="recipe-category">
                <i className="fas fa-tag"></i> {recipe.strCategory}
              </p>
            )}
            {recipe.strArea && (
              <p className="recipe-cuisine">
                <i className="fas fa-globe"></i> {recipe.strArea}
              </p>
            )}
            <div className="recipe-of-the-day-cta">
              <span>View Recipe</span>
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </Link>
      </div>
    </motion.section>
  );
};

export default RecipeOfTheDay;

