import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getServices } from '../services/api';
import SEO from '../components/SEO';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      setError('Unable to load content. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <div className="container">
          <div className="error-content">
            <h2>⚠️ Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={fetchData} className="btn btn-primary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <SEO
        title="Kanhaiya Krushi - Sustainable Agriculture Solutions"
        description="Your trusted partner in sustainable agriculture. Quality seeds, fertilizers, and farming equipment."
        url="https://kanhaiyakrushi.com/"
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Kanhaiya Krushi</h1>
          <p className="hero-subtitle">
            Your Trusted Partner in Sustainable Agriculture
          </p>
          <p className="hero-description">
            Providing quality seeds, fertilizers, and expert farming solutions for a greener tomorrow
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary btn-large">
              Browse Products
            </Link>
            <Link to="/contact" className="btn btn-outline btn-large">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container">
          <h2 className="section-title text-center">Why Choose Kanhaiya Krushi?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Quality Products</h3>
              <p>Premium quality seeds, fertilizers, and farming equipment from trusted brands</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌿</div>
              <h3>Organic Options</h3>
              <p>Wide range of certified organic products for sustainable farming</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with special discounts for bulk orders</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery to your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-light-beige">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <Link to="/products" className="btn btn-secondary">View All Products</Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <div key={product._id} className="product-card card">
                  <div className="product-badge">
                    {product.isOrganic && <span className="badge-organic">🌿 Organic</span>}
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
                      <Link to={`/products/${product._id}`} className="btn-link">View Details →</Link>
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
            <h2 className="section-title">Our Services</h2>
            <Link to="/services" className="btn btn-secondary">View All Services</Link>
          </div>

          {services.length > 0 ? (
            <div className="services-grid">
              {services.map((service) => (
                <div key={service._id} className="service-card card">
                  <div className="service-icon-large">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-meta">
                    <span className="service-duration">⏱️ {service.duration}</span>
                    {service.price && <span className="service-price">₹{service.price}</span>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No services available at the moment.</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-cream testimonials-section">
        <div className="container">
          <h2 className="section-title text-center">आमच्या शेतकऱ्यांचे मत</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "कन्हैया कृषी केंद्रातील जैविक बियाणे वापरल्यानंतर माझ्या पिकाचे उत्पादन खूप वाढले आहे. खरंच उत्तम गुणवत्ता!"
              </p>
              <div className="testimonial-author">
                <strong>ज्योतिराम जाधव</strong>
                <span>शेतकरी, महाराष्ट्र</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "येथील खते आणि कीटकनाशके खूप चांगल्या दर्जाची आहेत. त्यांची मातीची तपासणी सेवा अतिशय उपयुक्त आहे."
              </p>
              <div className="testimonial-author">
                <strong>नागनाथ नायकनावरे</strong>
                <span>शेतकरी, महाराष्ट्र</span>
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container text-center">
          <h2 className="cta-title">Ready to Grow with Us?</h2>
          <p className="cta-text">
            Join thousands of farmers who trust Kanhaiya Krushi for their agricultural needs
          </p>
          <Link to="/contact" className="btn btn-primary btn-large">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;