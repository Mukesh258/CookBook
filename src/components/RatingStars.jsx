import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getRecipeRating, setUserRating, getUserRating } from '../utils/localStorage';
import './RatingStars.css';

const RatingStars = ({ recipeId, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [userRating, setUserRatingState] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    if (recipeId) {
      const rating = getUserRating(recipeId);
      setUserRatingState(rating);
      
      const recipeRating = getRecipeRating(recipeId);
      setAverageRating(recipeRating.average || 0);
      setRatingCount(recipeRating.count || 0);
    }
  }, [recipeId]);

  const handleRatingClick = (rating) => {
    if (recipeId) {
      setUserRating(recipeId, rating);
      setUserRatingState(rating);
      
      const updatedRating = getRecipeRating(recipeId);
      setAverageRating(updatedRating.average || 0);
      setRatingCount(updatedRating.count || 0);
      
      if (onRatingChange) {
        onRatingChange(rating);
      }
    }
  };

  const displayRating = hoveredRating || userRating;

  return (
    <div className="rating-stars">
      <div className="rating-stars-display">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            className={`star ${star <= displayRating ? 'active' : ''}`}
            onClick={() => handleRatingClick(star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Rate ${star} stars`}
          >
            <i className={`fas fa-star ${star <= displayRating ? 'filled' : ''}`}></i>
          </motion.button>
        ))}
      </div>
      {averageRating > 0 && (
        <div className="rating-info">
          <span className="average-rating">
            {averageRating.toFixed(1)} / 5.0
          </span>
          <span className="rating-count">
            ({ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'})
          </span>
        </div>
      )}
    </div>
  );
};

export default RatingStars;

