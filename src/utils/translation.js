const TRANSLATION_CACHE_KEY = 'translation_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Language codes mapping
export const LANGUAGES = {
  en: 'English',
  hi: 'Hindi',
  te: 'Telugu',
  ta: 'Tamil',
  kn: 'Kannada',
  ml: 'Malayalam',
  bn: 'Bengali',
  mr: 'Marathi',
  gu: 'Gujarati',
  pa: 'Punjabi',
  ur: 'Urdu',
  fr: 'French',
  es: 'Spanish',
  zh: 'Chinese'
};

// Get translation cache from localStorage
const getCache = () => {
  try {
    const cached = localStorage.getItem(TRANSLATION_CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

// Save to translation cache
const saveToCache = (cache) => {
  try {
    localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error('Error saving translation cache:', error);
  }
};

// Check if cached translation is still valid
const isCacheValid = (cacheEntry) => {
  if (!cacheEntry) return false;
  return Date.now() - cacheEntry.timestamp < CACHE_DURATION;
};

// Translate text using LibreTranslate API
export const translateText = async (text, targetLang = 'en', sourceLang = 'en') => {
  if (!text || targetLang === sourceLang) {
    return text;
  }

  // Check cache first
  const cache = getCache();
  const cacheKey = `${sourceLang}_${targetLang}_${text}`;
  const cached = cache[cacheKey];

  if (isCacheValid(cached)) {
    return cached.text;
  }

  try {
    // Try LibreTranslate API
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Translation API failed');
    }

    const data = await response.json();
    const translatedText = data.translatedText || text;

    // Save to cache
    cache[cacheKey] = {
      text: translatedText,
      timestamp: Date.now()
    };
    saveToCache(cache);

    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    
    // Fallback: Try MyMemory Translation API
    try {
      const fallbackResponse = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
      );
      const fallbackData = await fallbackResponse.json();
      
      if (fallbackData.responseData && fallbackData.responseData.translatedText) {
        const translatedText = fallbackData.responseData.translatedText;
        
        // Save to cache
        cache[cacheKey] = {
          text: translatedText,
          timestamp: Date.now()
        };
        saveToCache(cache);
        
        return translatedText;
      }
    } catch (fallbackError) {
      console.error('Fallback translation error:', fallbackError);
    }
    
    // Return original text if all translation attempts fail
    return text;
  }
};

// Translate multiple texts in batch
export const translateBatch = async (texts, targetLang, sourceLang = 'en') => {
  const translations = await Promise.all(
    texts.map(text => translateText(text, targetLang, sourceLang))
  );
  return translations;
};

// Get current language from localStorage
export const getCurrentLanguage = () => {
  try {
    return localStorage.getItem('current_language') || 'en';
  } catch {
    return 'en';
  }
};

// Set current language
export const setCurrentLanguage = (lang) => {
  try {
    localStorage.setItem('current_language', lang);
  } catch (error) {
    console.error('Error setting language:', error);
  }
};

