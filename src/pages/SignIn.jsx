import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';
import './Auth.css';
import { useLocation } from 'react-router-dom';

const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState('');

  React.useEffect(() => {
    // Prefill email if redirected from signup
    if (location && location.state && location.state.email) {
      setFormData(f => ({ ...f, email: location.state.email }));
      setSuccessMessage('Account created. Please sign in.');
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate authentication (frontend only) with validation against registered users
    setTimeout(() => {
      try {
        const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const match = registered.find(u => u.email === formData.email && u.password === formData.password);
        if (match) {
          // Store user session in localStorage
          localStorage.setItem('user', JSON.stringify({
            name: match.name,
            email: match.email,
            loggedIn: true,
            loginTime: new Date().toISOString()
          }));
          setLoading(false);
          navigate('/');
        } else {
          setError('Invalid email or password');
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth error', err);
        setError('An error occurred during sign in');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <div className="auth-icon">
              <i className="fas fa-utensils"></i>
            </div>
            <h1>{t('signIn')}</h1>
            <p>Welcome back to CookBook</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {successMessage && (
              <div className="auth-success">
                <i className="fas fa-check-circle"></i>
                {successMessage}
              </div>
            )}
            {error && (
              <div className="auth-error">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className="form-group">
              <label>
                <i className="fas fa-envelope"></i> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-lock"></i> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="#" className="forgot-password">Forgot password?</Link>
            </div>

            <button type="submit" className="btn btn-primary auth-button" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner-small"></div> Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i> {t('signIn')}
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/signup">{t('signUp')}</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignIn;

