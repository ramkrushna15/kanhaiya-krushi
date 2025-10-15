// ==========================================
// client/src/pages/About.jsx
// ==========================================
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>About AgroFarm</h1>
          <p>Growing together towards a sustainable future</p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2010, AgroFarm began with a simple mission: to provide farmers with
                high-quality agricultural products and expert guidance. Over the years, we've grown
                into a trusted partner for thousands of farmers across India.
              </p>
              <p>
                We believe in sustainable farming practices that not only increase yields but also
                protect our environment for future generations. Our team of agricultural experts
                works tirelessly to source the best products and develop innovative farming solutions.
              </p>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600" 
                alt="Farming" 
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
              <h3>Our Mission</h3>
              <p>
                To empower farmers with quality products, innovative solutions, and expert knowledge
                that enable sustainable and profitable farming practices.
              </p>
            </div>
            <div className="vision-card">
              <div className="card-icon">🌟</div>
              <h3>Our Vision</h3>
              <p>
                To be India's most trusted agricultural partner, leading the way in sustainable
                farming and contributing to food security for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🌱 Sustainability</h3>
              <p>Promoting eco-friendly farming practices</p>
            </div>
            <div className="value-card">
              <h3>✓ Quality</h3>
              <p>Never compromising on product standards</p>
            </div>
            <div className="value-card">
              <h3>🤝 Trust</h3>
              <p>Building lasting relationships with farmers</p>
            </div>
            <div className="value-card">
              <h3>💡 Innovation</h3>
              <p>Embracing new agricultural technologies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Farmers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">States Covered</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
