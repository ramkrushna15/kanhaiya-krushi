// ==========================================
// client/src/pages/About.jsx
// ==========================================
import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';
import './About.css';

const About = () => {
  const { t, isLoaded } = useTranslation();

  // Show loading state while translations load
  if (!isLoaded) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="about-page">
      <SEO
        title={`${t('about.title')} - ${t('nav.brand')}`}
        description={t('about.subtitle')}
        url="https://kanhaiyakrushi.com/about"
      />
      
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>{t('about.title')}</h1>
          <p>{t('about.pageSubtitle')}</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>{t('about.story.title')}</h2>
              <p>
                {t('about.story.paragraph1')}
              </p>
              <p>
                {t('about.story.paragraph2')}
              </p>
            </div>
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600"
                alt="Modern Sustainable Farming"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-light-beige">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="card-icon">🎯</div>
              <h3>{t('about.mission.title')}</h3>
              <p>
                {t('about.mission.description')}
              </p>
            </div>
            <div className="vision-card">
              <div className="card-icon">🌟</div>
              <h3>{t('about.vision.title')}</h3>
              <p>
                {t('about.vision.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">{t('about.values.title')}</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🌱 {t('about.values.sustainability.title')}</h3>
              <p>{t('about.values.sustainability.description')}</p>
            </div>
            <div className="value-card">
              <h3>✓ {t('about.values.quality.title')}</h3>
              <p>{t('about.values.quality.description')}</p>
            </div>
            <div className="value-card">
              <h3>🤝 {t('about.values.trust.title')}</h3>
              <p>{t('about.values.trust.description')}</p>
            </div>
            <div className="value-card">
              <h3>💡 {t('about.values.innovation.title')}</h3>
              <p>{t('about.values.innovation.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">{t('about.stats.farmers')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">300+</div>
              <div className="stat-label">{t('about.stats.products')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">{t('about.stats.experience')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">{t('about.stats.districts')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;