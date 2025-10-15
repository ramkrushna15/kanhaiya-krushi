import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, servicesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/products/get-products?featured=true'),
          axios.get('http://localhost:5000/api/services/get-services')
        ]);
        
        setFeaturedProducts(productsRes.data.data.slice(0, 3));
        setServices(servicesRes.data.data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Kanahiya Krushi</h1>
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
          <h2 className="section-title text-center">Why Choose Kanahiya Krushi?</h2>
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
          
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <div key={product._id} className="product-card card">
                <div className="product-badge">
                  {product.isOrganic && <span className="badge-organic">🌿 Organic</span>}
                </div>
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description.substring(0, 100)}...</p>
                  <div className="product-footer">
                    <span className="product-price">₹{product.price}/{product.unit}</span>
                    <Link to="/products" className="btn-link">View Details →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
            <Link to="/services" className="btn btn-secondary">View All Services</Link>
          </div>

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
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-cream testimonials-section">
        <div className="container">
          <h2 className="section-title text-center">What Our Farmers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Kanahiya Krushi's organic seeds have significantly improved my crop yield. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <strong>Rajesh Kumar</strong>
                <span>Farmer, Punjab</span>
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
            <div className="testimonial-card">
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-text">
                "Fast delivery and great customer service. They truly care about farmers."
              </p>
              <div className="testimonial-author">
                <strong>Suresh Patel</strong>
                <span>Farmer, Gujarat</span>
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
            Join thousands of farmers who trust Kanahiya Krushi for their agricultural needs
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