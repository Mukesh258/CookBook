const SAVED_RECIPES_KEY = 'saved_recipes';
const UPLOADED_RECIPES_KEY = 'uploaded_recipes';
const RATINGS_KEY = 'recipe_ratings';

// Saved Recipes (from API)
export const getSavedRecipes = () => {
  try {
    const saved = localStorage.getItem(SAVED_RECIPES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveRecipe = (recipe) => {
  try {
    const saved = getSavedRecipes();
    const exists = saved.find(r => r.idMeal === recipe.idMeal);
    if (!exists) {
      saved.push({
        ...recipe,
        savedAt: new Date().toISOString()
      });
      localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(saved));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error saving recipe:', error);
    return false;
  }
};

export const removeSavedRecipe = (recipeId) => {
  try {
    const saved = getSavedRecipes();
    const filtered = saved.filter(r => r.idMeal !== recipeId);
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing recipe:', error);
    return false;
  }
};

export const isRecipeSaved = (recipeId) => {
  const saved = getSavedRecipes();
  return saved.some(r => r.idMeal === recipeId);
};

// Uploaded Recipes (user-created)
export const getUploadedRecipes = () => {
  try {
    const uploaded = localStorage.getItem(UPLOADED_RECIPES_KEY);
    return uploaded ? JSON.parse(uploaded) : [];
  } catch {
    return [];
  }
};

export const saveUploadedRecipe = (recipe) => {
  try {
    const uploaded = getUploadedRecipes();
    const newRecipe = {
      ...recipe,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      rating: 0,
      ratings: []
    };
    uploaded.push(newRecipe);
    localStorage.setItem(UPLOADED_RECIPES_KEY, JSON.stringify(uploaded));
    return newRecipe;
  } catch (error) {
    console.error('Error saving uploaded recipe:', error);
    return null;
  }
};

export const removeUploadedRecipe = (recipeId) => {
  try {
    const uploaded = getUploadedRecipes();
    const filtered = uploaded.filter(r => r.id !== recipeId);
    localStorage.setItem(UPLOADED_RECIPES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing uploaded recipe:', error);
    return false;
  }
};

export const removeUploadedRecipeByName = (name) => {
  try {
    if (!name) return false;
    const uploaded = getUploadedRecipes();
    const filtered = uploaded.filter(r => {
      const n = (r.name || r.strMeal || '').toLowerCase();
      return n !== name.toLowerCase();
    });
    localStorage.setItem(UPLOADED_RECIPES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing uploaded recipe by name:', error);
    return false;
  }
};

export const updateUploadedRecipe = (updatedRecipe) => {
  try {
    const uploaded = getUploadedRecipes();
    const idx = uploaded.findIndex(r => r.id === updatedRecipe.id);
    if (idx === -1) return null;
    const merged = {
      ...uploaded[idx],
      ...updatedRecipe,
      updatedAt: new Date().toISOString()
    };
    uploaded[idx] = merged;
    localStorage.setItem(UPLOADED_RECIPES_KEY, JSON.stringify(uploaded));
    return merged;
  } catch (error) {
    console.error('Error updating uploaded recipe:', error);
    return null;
  }
};

// Ratings
export const getRecipeRating = (recipeId) => {
  try {
    const ratings = localStorage.getItem(RATINGS_KEY);
    const allRatings = ratings ? JSON.parse(ratings) : {};
    return allRatings[recipeId] || { rating: 0, count: 0 };
  } catch {
    return { rating: 0, count: 0 };
  }
};

export const setRecipeRating = (recipeId, rating) => {
  try {
    const ratings = localStorage.getItem(RATINGS_KEY);
    const allRatings = ratings ? JSON.parse(ratings) : {};
    
    if (!allRatings[recipeId]) {
      allRatings[recipeId] = { ratings: [], average: 0 };
    }
    
    allRatings[recipeId].ratings.push({
      rating,
      timestamp: new Date().toISOString()
    });
    
    const total = allRatings[recipeId].ratings.reduce((sum, r) => sum + r.rating, 0);
    allRatings[recipeId].average = total / allRatings[recipeId].ratings.length;
    allRatings[recipeId].count = allRatings[recipeId].ratings.length;
    
    localStorage.setItem(RATINGS_KEY, JSON.stringify(allRatings));
    return allRatings[recipeId];
  } catch (error) {
    console.error('Error setting rating:', error);
    return null;
  }
};

export const getUserRating = (recipeId) => {
  try {
    const ratings = localStorage.getItem(RATINGS_KEY);
    const allRatings = ratings ? JSON.parse(ratings) : {};
    const recipeRatings = allRatings[recipeId];
    if (recipeRatings && recipeRatings.userRating) {
      return recipeRatings.userRating;
    }
    return 0;
  } catch {
    return 0;
  }
};

export const setUserRating = (recipeId, rating) => {
  try {
    const ratings = localStorage.getItem(RATINGS_KEY);
    const allRatings = ratings ? JSON.parse(ratings) : {};
    
    if (!allRatings[recipeId]) {
      allRatings[recipeId] = { ratings: [], average: 0, userRating: rating };
    } else {
      allRatings[recipeId].userRating = rating;
    }
    
    // Update average if needed
    if (allRatings[recipeId].ratings.length > 0) {
      const total = allRatings[recipeId].ratings.reduce((sum, r) => sum + r.rating, 0);
      allRatings[recipeId].average = total / allRatings[recipeId].ratings.length;
    }
    
    localStorage.setItem(RATINGS_KEY, JSON.stringify(allRatings));
    return allRatings[recipeId];
  } catch (error) {
    console.error('Error setting user rating:', error);
    return null;
  }
};

// Simple user session helpers
export const getCurrentUser = () => {
  try {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};

export const signOut = () => {
  try {
    localStorage.removeItem('user');
    return true;
  } catch (err) {
    console.error('Error signing out', err);
    return false;
  }
};

