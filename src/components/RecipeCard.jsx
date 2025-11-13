import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './RecipeCard.css';

const RecipeCard = ({ recipe, index = 0 }) => {
  return (
    <motion.div
      className="recipe-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Link to={`/recipe/${recipe.idMeal || recipe.id}`} className="recipe-card-link">
        <div className="recipe-card-image-wrapper">
          <img
            src={recipe.strMealThumb || recipe.image || 'https://via.placeholder.com/400x300?text=Recipe+Image'}
            alt={recipe.strMeal || recipe.name}
            className="recipe-card-image"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Recipe+Image';
            }}
          />
          {(recipe.strArea || recipe.cuisine) && (
            <span className="recipe-card-cuisine">{recipe.strArea || recipe.cuisine}</span>
          )}
        </div>
        <div className="recipe-card-content">
          <h3 className="recipe-card-title">{recipe.strMeal || recipe.name}</h3>
          {(recipe.strCategory || recipe.category) && (
            <p className="recipe-card-category">
              <i className="fas fa-tag"></i> {recipe.strCategory || recipe.category}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;

