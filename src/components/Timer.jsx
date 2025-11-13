import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Timer.css';

const Timer = ({ initialMinutes = 0, initialSeconds = 0 }) => {
  const [time, setTime] = useState({
    minutes: initialMinutes || 0,
    seconds: initialSeconds || 0
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { minutes: prev.minutes - 1, seconds: 59 };
          } else {
            setIsRunning(false);
            // Play notification sound or show alert
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Timer Finished!', {
                body: 'Your cooking timer has finished.',
                icon: '/icon-192x192.png'
              });
            }
            return { minutes: 0, seconds: 0 };
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  const startTimer = () => {
    if (time.minutes === 0 && time.seconds === 0) {
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
      return;
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime({ minutes: initialMinutes || 0, seconds: initialSeconds || 0 });
  };

  const formatTime = (minutes, seconds) => {
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const isFinished = time.minutes === 0 && time.seconds === 0 && !isRunning;

  return (
    <div className="timer-container">
      <div className="timer-display">
        <motion.div
          className={`timer-time ${isFinished ? 'finished' : ''}`}
          animate={isRunning ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {formatTime(time.minutes, time.seconds)}
        </motion.div>
        {isFinished && (
          <motion.div
            className="timer-finished-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <i className="fas fa-bell"></i> Timer Finished!
          </motion.div>
        )}
      </div>
      <div className="timer-controls">
        {!isRunning && !isPaused && (
          <button className="btn btn-primary" onClick={startTimer}>
            <i className="fas fa-play"></i> Start
          </button>
        )}
        {isRunning && !isPaused && (
          <button className="btn btn-secondary" onClick={pauseTimer}>
            <i className="fas fa-pause"></i> Pause
          </button>
        )}
        {isPaused && (
          <button className="btn btn-primary" onClick={startTimer}>
            <i className="fas fa-play"></i> Resume
          </button>
        )}
        <button className="btn btn-outline" onClick={resetTimer}>
          <i className="fas fa-redo"></i> Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;

