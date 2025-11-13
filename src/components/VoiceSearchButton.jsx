import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './VoiceSearchButton.css';

const VoiceSearchButton = ({ onVoiceResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onVoiceResult) {
          onVoiceResult(transcript);
        }
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        setError(event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      setError('Speech recognition not supported');
    }
  }, [onVoiceResult]);

  const handleClick = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    }
  };

  return (
    <>
      <motion.button
        className={`voice-search-btn ${isListening ? 'listening' : ''}`}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={!recognition}
        aria-label="Voice search"
        title={error || 'Voice search'}
      >
        <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'}`}></i>
      </motion.button>
      <AnimatePresence>
        {isListening && (
          <motion.div
            className="voice-listening-indicator"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="pulse-ring"></div>
            <span>Listening...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceSearchButton;

