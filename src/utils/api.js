const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchRecipesByName = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
};

export const searchRecipesByIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching by ingredient:', error);
    return [];
  }
};

export const searchRecipesByCuisine = async (cuisine) => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?a=${encodeURIComponent(cuisine)}`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching by cuisine:', error);
    return [];
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
};

export const getRandomRecipe = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/random.php`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error fetching random recipe:', error);
    return null;
  }
};

export const getIndianRecipes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/filter.php?a=Indian`);
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error fetching Indian recipes:', error);
    return [];
  }
};

export const parseRecipeIngredients = (recipe) => {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }
  return ingredients;
};

// Local JSON server (dev) — optional endpoints for uploaded recipes
// Use Vite env var in production: set VITE_JSON_SERVER_URL in Vercel (e.g. https://your-render-url or https://your-render-url/api)
const SERVER_BASE = import.meta.env.VITE_JSON_SERVER_URL || 'http://localhost:3000';

export const getUploadedRecipesFromServer = async () => {
  try {
    const res = await fetch(`${SERVER_BASE}/recipes`);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.warn('Could not fetch uploaded recipes from server:', error);
    return [];
  }
};

export const getUploadedRecipeFromServer = async (id) => {
  try {
    const res = await fetch(`${SERVER_BASE}/recipes/${id}`);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Network response not ok');
    }
    const data = await res.json();
    return data || null;
  } catch (error) {
    console.warn('Could not fetch uploaded recipe from server:', error);
    return null;
  }
};

export const postUploadedRecipe = async (recipe) => {
  try {
    const res = await fetch(`${SERVER_BASE}/recipes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe)
    });
    if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    const saved = await res.json();
    return saved;
  } catch (error) {
    console.warn('Could not post recipe to server:', error);
    return null;
  }
};

export const deleteUploadedRecipeFromServer = async (id) => {
  try {
    const res = await fetch(`${SERVER_BASE}/recipes/${id}`, {
      method: 'DELETE'
    });
    return res.ok;
  } catch (error) {
    console.warn('Could not delete recipe from server:', error);
    return false;
  }
};

