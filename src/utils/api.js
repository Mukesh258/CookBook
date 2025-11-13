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

