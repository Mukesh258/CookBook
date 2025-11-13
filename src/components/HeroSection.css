.hero-section {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
  overflow: hidden;
  background: transparent;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  /* default gradient fallback */
  background-image: radial-gradient(circle at 10% 20%, rgba(255,107,53,0.08), transparent 15%), radial-gradient(circle at 90% 80%, rgba(139,69,19,0.06), transparent 18%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));
  opacity: 1;
}

/* Use image files if present in public/assets. Desktop first */
@media (min-width: 992px) {
  .hero-background {
    background-image: url('/assets/hero-desktop.jpg'), radial-gradient(circle at 10% 20%, rgba(255,107,53,0.06), transparent 15%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 991px) {
  .hero-background {
    background-image: url('/assets/hero-tablet.jpg'), radial-gradient(circle at 10% 20%, rgba(255,107,53,0.06), transparent 15%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));
  }
}

/* Mobile - simpler image or just the gradient */
@media (max-width: 768px) {
  .hero-background {
    background-image: url('/assets/hero-mobile.jpg'), radial-gradient(circle at 10% 20%, rgba(255,107,53,0.06), transparent 12%), linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));
    background-position: center top;
    background-size: cover;
    opacity: 0.95;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  width: 100%;
}

.hero-icon {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.hero-icon i {
  font-size: 5rem;
  color: var(--accent-orange);
  opacity: 0.9;
  animation: float 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(255, 107, 53, 0.3));
}

.hero-text {
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-green));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.hero-search {
  max-width: 800px;
  margin: 0 auto;
}

.hero-cuisine-tags {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero-cuisine-button {
  border: none;
  border-radius: 999px;
  padding: 0.65rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, var(--accent-orange), var(--accent-orange-dark));
  box-shadow: 0 10px 24px rgba(229, 90, 43, 0.25);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  cursor: pointer;
  letter-spacing: 0.5px;
}

.hero-cuisine-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 32px rgba(229, 90, 43, 0.35);
}

.hero-cuisine-button:active {
  transform: translateY(1px);
  box-shadow: 0 8px 16px rgba(229, 90, 43, 0.3);
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 320px;
    padding: 2rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-cuisine-tags {
    gap: 0.75rem;
  }

  .hero-cuisine-button {
    padding: 0.55rem 1.4rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    min-height: 260px;
    padding: 1.25rem 0;
  }

  .hero-title {
    font-size: 1.6rem;
  }

  .hero-subtitle {
    font-size: 0.95rem;
    max-width: 90%;
  }

  .hero-icon i {
    font-size: 3.25rem;
  }
}

