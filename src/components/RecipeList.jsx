import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = ({ recipes, loading, error }) => {
  if (loading) {
    return (
      <div className="recipe-list-loading">
        <div className="spinner"></div>
        <p>Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recipe-list-error">
        <i className="fas fa-exclamation-triangle"></i>
        <p>{error}</p>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className="recipe-list-empty">
        <i className="fas fa-search"></i>
        <p>No recipes found. Try a different search!</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe, index) => (
        <RecipeCard key={recipe.idMeal || recipe.id} recipe={recipe} index={index} />
      ))}
    </div>
  );
};

export default RecipeList;

