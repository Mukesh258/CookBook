import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getCurrentLanguage, setCurrentLanguage as saveLanguage, translateBatch } from '../utils/translation';

const TranslationContext = createContext();

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }
  return context;
};

// Default English translations
const defaultTranslations = {
  home: 'Home',
  myCookbook: 'My Cookbook',
  upload: 'Upload Recipe',
  community: 'Community',
  about: 'About',
  signIn: 'Sign In',
  signUp: 'Sign Up',
  title: 'CookBook',
  subtitle: 'Cook smarter eat better',
  searchPlaceholder: 'Search recipes...',
  ingredients: 'Ingredients',
  instructions: 'Instructions',
  saveRecipe: 'Save Recipe',
  removeRecipe: 'Remove from Cookbook',
  translateRecipe: 'Translate Recipe',
  prepTime: 'Prep Time',
  minutes: 'minutes',
  category: 'Category',
  cuisine: 'Cuisine',
  back: 'Back',
  exploreRecipes: 'Explore Recipes',
  recipeOfTheDay: 'Recipe of the Day',
  popularRecipes: 'Popular Indian Recipes',
  searchResults: 'Search Results',
  clearSearch: 'Clear Search'
};

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState(getCurrentLanguage());
  const [translations, setTranslations] = useState(defaultTranslations);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      if (currentLanguage === 'en') {
        setTranslations(defaultTranslations);
        return;
      }

      setIsTranslating(true);
      try {
        // Translate all texts in batch
        const texts = Object.values(defaultTranslations);
        const translatedTexts = await translateBatch(texts, currentLanguage, 'en');
        
        // Create translated object
        const translated = {};
        Object.keys(defaultTranslations).forEach((key, index) => {
          translated[key] = translatedTexts[index] || defaultTranslations[key];
        });
        
        setTranslations(translated);
      } catch (error) {
        console.error('Error loading translations:', error);
        setTranslations(defaultTranslations);
      } finally {
        setIsTranslating(false);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  const setCurrentLanguage = (lang) => {
    saveLanguage(lang);
    setCurrentLanguageState(lang);
  };

  const t = (key) => {
    return translations[key] || defaultTranslations[key] || key;
  };

  const value = useMemo(() => ({
    currentLanguage,
    setCurrentLanguage,
    translations,
    t,
    isTranslating
  }), [currentLanguage, translations, isTranslating]);

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

