// client/src/pages/Services.jsx
import SEO from '../components/SEO';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, isLoaded } = useTranslation();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getServices();
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setError(
        isLoaded
          ? t('common.error')
          : 'Unable to load services. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle error state
  if (error) {
    return (
      <div className="error-container">
        <div className="container">
          <div className="error-content">
            <h2>⚠️ {isLoaded ? t('common.error') : 'Oops! Something went wrong'}</h2>
            <p>{error}</p>
            <button onClick={fetchServices} className="btn btn-primary">
              {isLoaded ? t('common.tryAgain') : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Enhanced loading state with translation support
  if (loading || !isLoaded) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>{isLoaded ? t('common.loading') : 'Loading services...'}</p>
      </div>
    );
  }

  return (
    <div className="services-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Our Services</h1>
          <p>Expert agricultural solutions tailored to your needs</p>
        </div>
      </section>
      <SEO
        title="Agricultural Services - Consultation & Soil Testing | Kanhaiya Krushi"
        description="Expert agricultural services including soil testing, crop planning, and pest management in Maharashtra."
        url="https://kanhaiyakrushi.com/services"
      />

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          {services.length > 0 ? (
            <div className="services-grid">
              {services.map((service) => (
                <div key={service._id} className="service-card-large card">
                  <div className="service-icon-wrapper">
                    <span className="service-icon-huge">{service.icon}</span>
                  </div>
                  <h3 className="service-title-large">{service.title}</h3>
                  <p className="service-description-large">{service.description}</p>

                  {service.features && service.features.length > 0 && (
                    <ul className="service-features-list">
                      {service.features.map((feature, index) => (
                        <li key={index}>✓ {feature}</li>
                      ))}
                    </ul>
                  )}

                  <div className="service-details">
                    <div className="service-detail-item">
                      <span className="detail-label">Duration:</span>
                      <span className="detail-value">{service.duration}</span>
                    </div>
                    {service.price && (
                      <div className="service-detail-item">
                        <span className="detail-label">Starting from:</span>
                        <span className="detail-value-price">₹{service.price}</span>
                      </div>
                    )}
                  </div>

                  <Link to="/contact" className="btn btn-primary btn-block">
                    Book Service
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <p>No services available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-light-beige">
        <div className="container">
          <h2 className="section-title text-center">Why Choose Our Services?</h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">👨‍🌾</div>
              <h3>Expert Team</h3>
              <p>Experienced agricultural professionals with years of field expertise</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🔬</div>
              <h3>Scientific Approach</h3>
              <p>Data-driven solutions based on latest agricultural research</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💼</div>
              <h3>Customized Plans</h3>
              <p>Tailored strategies designed for your specific farming needs</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">📈</div>
              <h3>Proven Results</h3>
              <p>Track record of improving yields and farm profitability</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Improve Your Farm?</h2>
          <p className="cta-text">
            Get in touch with our experts today for a free consultation
          </p>
          <Link to="/contact" className="btn btn-primary btn-large">
            Schedule Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;