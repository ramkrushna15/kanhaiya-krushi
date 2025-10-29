import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getServices } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';
import { formatPrice } from '../utils/formatters';
import SEO from '../components/SEO';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, isLoaded, language } = useTranslation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [productsRes, servicesRes] = await Promise.all([
        getProducts({ featured: true }),
        getServices(),
      ]);

      setFeaturedProducts(productsRes.data.data.slice(0, 3));
      setServices(servicesRes.data.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(
        isLoaded
          ? t('common.error')
          : 'Unable to load content. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getTextClassName = (additionalClasses = '', text = '') => {
    if (language !== 'mr') return additionalClasses;

    let baseClass = 'marathi-text';

    if (
      text &&
      (text.includes('महाराष्ट्र') ||
        text.includes('राष्ट्र') ||
        text.includes('तज्ज्ञांचे') ||
        text.includes('ज्ञा') ||
        text.includes('स्पर्धात्मक') ||
        text.includes('र्धा'))
    ) {
      baseClass =
        'ultra-complex-conjuncts maharashtra-fix complex-conjuncts-critical';
    } else if (
      text &&
      (text.includes('नैसर्गिक') ||
        text.includes('गुणवत्ता') ||
        text.includes('वितरण') ||
        text.includes('सेवा') ||
        text.includes('केंद्रा') ||
        text.includes('शेतकरी'))
    ) {
      baseClass = 'complex-conjuncts conjunct-fix';
    }

    return `${baseClass} ${additionalClasses}`.trim();
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="container">
          <div className="error-content">
            <h2>⚠️ {isLoaded ? t('common.error') : 'Oops! Something went wrong'}</h2>
            <p className={getTextClassName()}>{error}</p>
            <button onClick={fetchData} className="btn btn-primary">
              <span className={getTextClassName()}>
                {isLoaded ? t('common.tryAgain') : 'Try Again'}
              </span>
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
        <p className={getTextClassName()}>
          {isLoaded ? t('common.loading') : 'Loading...'}
        </p>
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
          <h1 className={getTextClassName('hero-title', t('home.title'))}>
            {t('home.title')}
          </h1>
          <p className={getTextClassName('hero-subtitle', t('home.subtitle'))}>
            {t('home.subtitle')}
          </p>
          <p className={getTextClassName('hero-description', t('home.description'))}>
            {t('home.description')}
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary btn-large">
              <span className={getTextClassName('', t('home.browseProducts'))}>
                {t('home.browseProducts')}
              </span>
            </Link>
            <Link to="/contact" className="btn btn-outline btn-large">
              <span className={getTextClassName('', t('home.contactUs'))}>
                {t('home.contactUs')}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <h2
            className={getTextClassName(
              'section-title text-center',
              t('home.whyChoose.title')
            )}
          >
            {t('home.whyChoose.title')}
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3 className={getTextClassName('', t('home.whyChoose.quality.title'))}>
                {t('home.whyChoose.quality.title')}
              </h3>
              <p
                className={getTextClassName(
                  '',
                  t('home.whyChoose.quality.description')
                )}
              >
                {t('home.whyChoose.quality.description')}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3 className={getTextClassName('', t('home.whyChoose.organic.title'))}>
                {t('home.whyChoose.organic.title')}
              </h3>
              <p
                className={getTextClassName(
                  '',
                  t('home.whyChoose.organic.description')
                )}
              >
                {t('home.whyChoose.organic.description')}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className={getTextClassName('', t('home.whyChoose.prices.title'))}>
                {t('home.whyChoose.prices.title')}
              </h3>
              <p
                className={getTextClassName(
                  '',
                  t('home.whyChoose.prices.description')
                )}
              >
                {t('home.whyChoose.prices.description')}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3 className={getTextClassName('', t('home.whyChoose.delivery.title'))}>
                {t('home.whyChoose.delivery.title')}
              </h3>
              <p
                className={getTextClassName(
                  '',
                  t('home.whyChoose.delivery.description')
                )}
              >
                {t('home.whyChoose.delivery.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section bg-light-beige">
        <div className="container">
          <div className="section-header">
            <h2 className={getTextClassName('section-title', t('home.featuredProducts.title'))}>
              {t('home.featuredProducts.title')}
            </h2>
            <Link to="/products" className="btn btn-secondary">
              <span className={getTextClassName('', t('home.featuredProducts.viewAll'))}>
                {t('home.featuredProducts.viewAll')}
              </span>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map((product) => {
                const formattedPrice = formatPrice(product.price, product.unit);
                return (
                  <div key={product._id} className="product-card card">
                    {product.isOrganic && (
                      <div className="product-badge">
                        <span className={getTextClassName('badge-organic')}>
                          🌿 {t('home.featuredProducts.organic')}
                        </span>
                      </div>
                    )}
                    <Link to={`/products/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.src =
                            'https://via.placeholder.com/400x300?text=Product+Image';
                        }}
                      />
                    </Link>
                    <div className="product-info">
                      <h3 className={getTextClassName('product-name', product.name)}>
                        {product.name}
                      </h3>
                      <p className={getTextClassName('product-description', product.description)}>
                        {product.description.length > 100
                          ? `${product.description.substring(0, 100)}...`
                          : product.description}
                      </p>
                      <div className="product-footer">
                        <span className={getTextClassName('product-price')}>
                          {formattedPrice}
                        </span>
                        <Link to={`/products/${product._id}`} className="btn-link">
                          <span className={getTextClassName('', t('home.featuredProducts.viewDetails'))}>
                            {t('home.featuredProducts.viewDetails')}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-data">
              <p className={getTextClassName('no-data')}>
                No featured products available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-cream testimonials-section">
        <div className="container">
          <h2 className={getTextClassName('section-title text-center heading-marathi', t('home.testimonials.title'))}>
            {t('home.testimonials.title')}
          </h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text ultra-complex-conjuncts">
                कन्हैया कृषी केंद्रातील जैविक बियाणे वापरल्यानंतर माझ्या पिकाचे उत्पादन खूप वाढले आहे. खरंच उत्तम{' '}
                <span className="conjunct-fix">गुणवत्ता</span>!
              </p>
              <div className="testimonial-author">
                <strong className="ultra-complex-conjuncts">ज्योतिराम जाधव</strong>
                <span className="complex-conjuncts-critical">
                  शेतकरी - करमाळा, <span className="word-maharashtra force-conjunct-fix">महाराष्ट्र</span>
                </span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text ultra-complex-conjuncts">
                येथील खते आणि कीटकनाशके खूप चांगल्या दर्जाची आहेत. त्यांची मातीची तपासणी{' '}
                <span className="conjunct-fix">सेवा</span> अतिशय उपयुक्त आहे.
              </p>
              <div className="testimonial-author">
                <strong className="ultra-complex-conjuncts">नागनाथ नाईकनवरे</strong>
                <span className="complex-conjuncts-critical">
                  शेतकरी - माढा, <span className="word-maharashtra force-conjunct-fix">महाराष्ट्र</span>
                </span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text ultra-complex-conjuncts">
                वेळेवर डिलिव्हरी आणि खूप चांगली <span className="conjunct-fix">सेवा</span>.{' '}
                <span className="complex-conjuncts-critical">शेतकऱ्यांची</span> खरी काळजी घेतात ते येथे.
              </p>
              <div className="testimonial-author">
                <strong className="ultra-complex-conjuncts">गणेश पोळ</strong>
                <span className="complex-conjuncts-critical">
                  शेतकरी, <span className="word-maharashtra force-conjunct-fix">महाराष्ट्र</span>
                </span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                Best quality fertilizers at reasonable prices. Their soil testing service is excellent.
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
          <h2 className={getTextClassName('cta-title heading-marathi', t('home.testimonials.readyToGrow'))}>
            {t('home.testimonials.readyToGrow')}
          </h2>
          <p className={getTextClassName('cta-text', t('home.testimonials.joinFarmers'))}>
            {t('home.testimonials.joinFarmers')}
          </p>
          <Link to="/contact" className="btn btn-primary btn-large">
            <span className={getTextClassName('btn-marathi', t('home.testimonials.getStarted'))}>
              {t('home.testimonials.getStarted')}
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
