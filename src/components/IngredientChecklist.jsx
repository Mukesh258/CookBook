import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './IngredientChecklist.css';

const IngredientChecklist = ({ ingredients }) => {
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    // Load saved checklist state from localStorage
    const saved = localStorage.getItem('ingredient_checklist');
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading checklist:', e);
      }
    }
  }, []);

  useEffect(() => {
    // Save checklist state to localStorage
    localStorage.setItem('ingredient_checklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = ingredients.length;

  return (
    <div className="ingredient-checklist">
      <div className="checklist-header">
        <h3>
          <i className="fas fa-list-check"></i> Ingredients Checklist
        </h3>
        <span className="checklist-progress">
          {checkedCount} / {totalCount}
        </span>
      </div>
      <ul className="checklist-items">
        {ingredients.map((ingredient, index) => (
          <motion.li
            key={index}
            className={`checklist-item ${checkedItems[index] ? 'checked' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <label>
              <input
                type="checkbox"
                checked={checkedItems[index] || false}
                onChange={() => toggleItem(index)}
              />
              <span className="checkmark"></span>
              <span className="ingredient-text">
                <strong>{ingredient.measure}</strong> {ingredient.name}
              </span>
            </label>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientChecklist;

