import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { initTheme } from './utils/theme';
import { TranslationProvider } from './contexts/TranslationContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MyCookbook from './pages/MyCookbook';
import UploadRecipe from './pages/UploadRecipe';
import Community from './pages/Community';
import EditRecipe from './pages/EditRecipe';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import RecipeDetails from './components/RecipeDetails';
import './App.css';

const AppContent = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    initTheme();
  }, []);

  const handleVoiceSearch = (query) => {
    setSearchQuery(query);
    navigate('/');
    // Trigger search after navigation
    setTimeout(() => {
      const event = new CustomEvent('voiceSearch', { detail: query });
      window.dispatchEvent(event);
    }, 100);
  };

  return (
    <div className="app">
      <Navbar onVoiceSearch={handleVoiceSearch} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-cookbook" element={<MyCookbook />} />
          <Route path="/upload" element={<UploadRecipe />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/edit/:id" element={<EditRecipe />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <TranslationProvider>
      <Router>
        <AppContent />
      </Router>
    </TranslationProvider>
  );
};

export default App;

