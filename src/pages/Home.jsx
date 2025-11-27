import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import RecipeList from '../components/RecipeList';
import RecipeOfTheDay from '../components/RecipeOfTheDay';
import {
  searchRecipesByName,
  searchRecipesByCuisine,
  getIndianRecipes,
  getRecipeById
} from '../utils/api';
import { getUploadedRecipesFromServer } from '../utils/api';
import { getUploadedRecipes } from '../utils/localStorage';
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadIndianRecipes();
    
    // Listen for voice search events
    const handleVoiceSearch = (event) => {
      const query = event.detail;
      handleSearch(query);
    };
    
    window.addEventListener('voiceSearch', handleVoiceSearch);
    return () => window.removeEventListener('voiceSearch', handleVoiceSearch);
  }, []);

  const loadIndianRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const indianRecipes = await getIndianRecipes();
      // Fetch full details for each recipe
      const fullRecipes = await Promise.all(
        indianRecipes.slice(0, 12).map(async (recipe) => {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`);
          const data = await response.json();
          return data.meals ? data.meals[0] : null;
        })
      );
      setRecipes(fullRecipes.filter(Boolean));
    } catch (err) {
      setError('Failed to load recipes. Please try again later.');
      console.error('Error loading Indian recipes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      // Search by name only
      const apiResults = await searchRecipesByName(query);

      // Fetch uploaded recipes from local json-server (dev) and from localStorage fallback
      const [serverUploaded, localUploaded] = await Promise.all([
        getUploadedRecipesFromServer().catch(() => []),
        Promise.resolve(getUploadedRecipes())
      ]);

      const allUploaded = [...(serverUploaded || []), ...(localUploaded || [])];

      const q = query.trim().toLowerCase();
      const uploadedMatches = allUploaded.filter(r => (r.name || r.strMeal || '').toLowerCase().includes(q));

      // Merge: prefer API results first, then uploaded matches that aren't duplicates
      const normalizedApiIds = new Set((apiResults || []).map(r => r.idMeal));
      const uniqueUploaded = uploadedMatches.filter(u => !normalizedApiIds.has(String(u.id) || u.idMeal));

      const combined = [...(apiResults || []), ...uniqueUploaded];
      setRecipes(combined);
    } catch (err) {
      setError('Search failed. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCuisineFilter = async (cuisine) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const results = await searchRecipesByCuisine(cuisine);
      const detailedResults = await Promise.all(
        results.slice(0, 12).map(async (meal) => {
          const fullRecipe = await getRecipeById(meal.idMeal);
          return fullRecipe;
        })
      );
      setRecipes(detailedResults.filter(Boolean));
    } catch (err) {
      setError(`Failed to load ${cuisine} recipes. Please try again.`);
      console.error('Cuisine filter error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setHasSearched(false);
    loadIndianRecipes();
  };

  return (
    <div className="home-page">
      <video
        className="home-background-video"
        src="/assets/home-background.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="home-background-overlay" />
      <HeroSection onSearch={handleSearch} onCuisineSelect={handleCuisineFilter} />
      
      {/* Show search results first if user has searched */}
      {hasSearched && (
        <section className="recipes-section search-results-section">
          <div className="container">
            <div className="section-header">
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <i className="fas fa-search"></i> Search Results
              </motion.h2>
              <button className="btn btn-outline" onClick={handleClearSearch}>
                <i className="fas fa-times"></i> Clear Search
              </button>
            </div>
            <RecipeList recipes={recipes} loading={loading} error={error} />
          </div>
        </section>
      )}
      
      {/* Recipe of the Day - show when no search or after search results */}
      {!hasSearched && <RecipeOfTheDay />}
      
      {/* Popular Indian Recipes - only show when no search */}
      {!hasSearched && (
        <section className="recipes-section">
          <div className="container">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <i className="fas fa-utensils"></i> Popular Indian Recipes
            </motion.h2>
            <RecipeList recipes={recipes} loading={loading} error={error} />
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;

