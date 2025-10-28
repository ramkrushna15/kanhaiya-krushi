import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getServices } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, isLoaded } = useTranslation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [productsRes, servicesRes] = await Promise.all([
        getProducts({ featured: true }),
        getServices()
      ]);

      setFeaturedProducts(productsRes.data.data.slice(0, 3));
      setServices(servicesRes.data.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(isLoaded ? t('common.error') : 'Unable to load content. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="container">
          <div className="error-content">
            <h2>⚠️ {isLoaded ? t('common.error') : 'Oops! Something went wrong'}</h2>
            <p>{error}</p>
            <button onClick={fetchData} className="btn btn-primary">
              {isLoaded ? t('common.tryAgain') : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !isLoaded) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>{isLoaded ? t('common.loading') : 'Loading...'}</p>
      </div>
    );
  }

  return (
    <div className="home">
      <SEO
        title={`${t('nav.brand')} - ${t('nav.tagline')}`}
        description={t('home.description')}
        url="https://kanhaiyakrushi.com/"
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{t('home.title')}</h1>
          <p className="hero-subtitle">
            {t('home.subtitle')}
          </p>
          <p className="hero-description">
            {t('home.description')}
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary btn-large">
              {t('home.browseProducts')}
            </Link>
            <Link to="/contact" className="btn btn-outline btn-large">
              {t('home.contactUs')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title text-center">{t('home.whyChoose.title')}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>{t('home.whyChoose.quality.title')}</h3>
              <p>{t('home.whyChoose.quality.description')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>{t('home.whyChoose.organic.title')}</h3>
              <p>{t('home.whyChoose.organic.description')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>{t('home.whyChoose.prices.title')}</h3>
              <p>{t('home.whyChoose.prices.description')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>{t('home.whyChoose.delivery.title')}</h3>
              <p>{t('home.whyChoose.delivery.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-light-beige">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.featuredProducts.title')}</h2>
            <Link to="/products" className="btn btn-secondary">{t('home.featuredProducts.viewAll')}</Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div key={product._id} className="product-card card">
                  <div className="product-badge">
                    {product.isOrganic && <span className="badge-organic">🌿 {t('home.featuredProducts.organic')}</span>}
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
                    }}
                  />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">
                      {product.description.substring(0, 100)}...
                    </p>
                    <div className="product-footer">
                      <span className="product-price">₹{product.price}/{product.unit}</span>
                      <Link to={`/products/${product._id}`} className="btn-link">{t('home.featuredProducts.viewDetails')}</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No featured products available at the moment.</p>
          )}
        </div>
      </section>

      {/* Services Preview */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.services.title')}</h2>
            <Link to="/services" className="btn btn-secondary">{t('home.services.viewAll')}</Link>
          </div>

          {services.length > 0 ? (
            <div className="services-grid">
              {services.map((service) => (
                <div key={service._id} className="service-card card">
                  <div className="service-icon-large">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-meta">
                    <span className="service-duration">⏱️ {service.duration || t('home.services.onRequest')}</span>
                    {service.price && <span className="service-price">₹{service.price}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="services-grid">
              <div className="service-card card">
                <div className="service-icon-large">🎓</div>
                <h3 className="service-title">Farming Workshops</h3>
                <p className="service-description">{t('home.services.workshops')}</p>
                <div className="service-meta">
                  <span className="service-duration">⏱️ {t('home.services.onRequest')}</span>
                </div>
              </div>
              <div className="service-card card">
                <div className="service-icon-large">🌤️</div>
                <h3 className="service-title">Weather Advisory</h3>
                <p className="service-description">{t('home.services.weather')}</p>
                <div className="service-meta">
                  <span className="service-duration">⏱️ {t('home.services.onRequest')}</span>
                </div>
              </div>
              <div className="service-card card">
                <div className="service-icon-large">🔬</div>
                <h3 className="service-title">Crop Diagnosis</h3>
                <p className="service-description">{t('home.services.diagnosis')}</p>
                <div className="service-meta">
                  <span className="service-duration">⏱️ {t('home.services.onRequest')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-cream testimonials-section">
        <div className="container">
          <h2 className="section-title text-center">{t('home.testimonials.title')}</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "कन्हैया कृषी केंद्रातील जैविक बियाणे वापरल्यानंतर माझ्या पिकाचे उत्पादन खूप वाढले आहे. खरंच उत्तम गुणवत्ता!"
              </p>
              <div className="testimonial-author">
                <strong>ज्योतिराम जाधव</strong>
                <span>शेतकरी - करमाळा, महाराष्ट्र</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "येथील खते आणि कीटकनाशके खूप चांगल्या दर्जाची आहेत. त्यांची मातीची तपासणी सेवा अतिशय उपयुक्त आहे."
              </p>
              <div className="testimonial-author">
                <strong>नागनाथ नाईकनवरे</strong>
                <span>शेतकरी - माढा, महाराष्ट्र</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "वेळेवर डिलिव्हरी आणि खूप चांगली सेवा. शेतकऱ्यांची खरी काळजी घेतात ते येथे."
              </p>
              <div className="testimonial-author">
                <strong>गणेश पोळ</strong>
                <span>शेतकरी, महाराष्ट्र</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Best quality fertilizers at reasonable prices. Their soil testing service is excellent."
              </p>
              <div className="testimonial-author">
                <strong>Priya Sharma</strong>
                <span>Agricultural Expert, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2 className="cta-title">{t('home.testimonials.readyToGrow')}</h2>
          <p className="cta-text">
            {t('home.testimonials.joinFarmers')}
          </p>
          <Link to="/contact" className="btn btn-primary btn-large">
            {t('home.testimonials.getStarted')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;