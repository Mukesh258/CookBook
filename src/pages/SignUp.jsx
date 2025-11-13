import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from '../contexts/TranslationContext';
import './Auth.css';

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    // Simulate registration (frontend only)
    setTimeout(() => {
      // Save registered user (do NOT auto-login)
      try {
        const registered = JSON.parse(localStorage.getItem('registered_users') || '[]');
        registered.push({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          signupTime: new Date().toISOString()
        });
        localStorage.setItem('registered_users', JSON.stringify(registered));
      } catch (err) {
        console.error('Error saving registered user', err);
      }
      setLoading(false);
      // Redirect to sign-in so the user must authenticate
      navigate('/signin', { state: { email: formData.email } });
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
            <h1>{t('signUp')}</h1>
            <p>Join CookBook and start cooking</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="auth-error">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            <div className="form-group">
              <label>
                <i className="fas fa-user"></i> Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

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
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-lock"></i> Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary auth-button" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner-small"></div> Creating account...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus"></i> {t('signUp')}
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/signin">{t('signIn')}</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;

