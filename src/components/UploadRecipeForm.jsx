import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { saveUploadedRecipe } from '../utils/localStorage';
import { translateText } from '../utils/translation';
import { getCurrentLanguage } from '../utils/translation';
import './UploadRecipeForm.css';

const UploadRecipeForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    cuisine: '',
    category: '',
    prepTime: '',
    image: '',
    ingredients: [{ name: '', measure: '' }],
    steps: ['']
  });
  const [translations, setTranslations] = useState({});
  const [submitting, setSubmitting] = useState(false);

  React.useEffect(() => {
    const loadTranslations = async () => {
      const lang = getCurrentLanguage();
      const texts = {
        name: 'Recipe Name',
        cuisine: 'Cuisine',
        category: 'Category',
        prepTime: 'Prep Time (minutes)',
        image: 'Image URL',
        ingredients: 'Ingredients',
        steps: 'Instructions',
        addIngredient: 'Add Ingredient',
        addStep: 'Add Step',
        submit: 'Submit Recipe',
        namePlaceholder: 'Enter recipe name',
        measurePlaceholder: 'e.g., 1 cup',
        ingredientPlaceholder: 'e.g., flour',
        stepPlaceholder: 'Enter step instructions'
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', measure: '' }]
    });
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, '']
    });
  };

  const removeStep = (index) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    setFormData({ ...formData, steps: newSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const recipe = {
      name: formData.name,
      cuisine: formData.cuisine,
      category: formData.category,
      prepTime: parseInt(formData.prepTime) || 30,
      image: formData.image || '/placeholder-recipe.jpg',
      ingredients: formData.ingredients.filter(ing => ing.name.trim()),
      steps: formData.steps.filter(step => step.trim()),
      strMeal: formData.name,
      strMealThumb: formData.image || '/placeholder-recipe.jpg',
      strCategory: formData.category,
      strArea: formData.cuisine,
      strInstructions: formData.steps.join('\n')
    };

    const saved = saveUploadedRecipe(recipe);
    if (saved) {
      setFormData({
        name: '',
        cuisine: '',
        category: '',
        prepTime: '',
        image: '',
        ingredients: [{ name: '', measure: '' }],
        steps: ['']
      });
      if (onSuccess) {
        onSuccess(saved);
      }
    }
    setSubmitting(false);
  };

  return (
    <motion.form
      className="upload-recipe-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="form-group">
        <label>{translations.name || 'Recipe Name'}</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={translations.namePlaceholder || 'Enter recipe name'}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>{translations.cuisine || 'Cuisine'}</label>
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="e.g., Indian"
            required
          />
        </div>
        <div className="form-group">
          <label>{translations.category || 'Category'}</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Dessert"
            required
          />
        </div>
        <div className="form-group">
          <label>{translations.prepTime || 'Prep Time (minutes)'}</label>
          <input
            type="number"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            placeholder="30"
            min="1"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>{translations.image || 'Image URL'}</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="form-group">
        <div className="form-group-header">
          <label>{translations.ingredients || 'Ingredients'}</label>
          <button type="button" className="btn btn-outline" onClick={addIngredient}>
            <i className="fas fa-plus"></i> {translations.addIngredient || 'Add Ingredient'}
          </button>
        </div>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-row">
            <input
              type="text"
              placeholder={translations.measurePlaceholder || 'e.g., 1 cup'}
              value={ingredient.measure}
              onChange={(e) => handleIngredientChange(index, 'measure', e.target.value)}
            />
            <input
              type="text"
              placeholder={translations.ingredientPlaceholder || 'e.g., flour'}
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              required
            />
            {formData.ingredients.length > 1 && (
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeIngredient(index)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="form-group">
        <div className="form-group-header">
          <label>{translations.steps || 'Instructions'}</label>
          <button type="button" className="btn btn-outline" onClick={addStep}>
            <i className="fas fa-plus"></i> {translations.addStep || 'Add Step'}
          </button>
        </div>
        {formData.steps.map((step, index) => (
          <div key={index} className="step-row">
            <span className="step-number">{index + 1}</span>
            <textarea
              placeholder={translations.stepPlaceholder || 'Enter step instructions'}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              required
            />
            {formData.steps.length > 1 && (
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeStep(index)}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? (
          <>
            <div className="spinner-small"></div> Submitting...
          </>
        ) : (
          <>
            <i className="fas fa-upload"></i> {translations.submit || 'Submit Recipe'}
          </>
        )}
      </button>
    </motion.form>
  );
};

export default UploadRecipeForm;

