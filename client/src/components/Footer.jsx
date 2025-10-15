import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="footer-logo-icon">🌾</div>
              <div>
                <h3>Kanhaiya Krushi</h3>
                <p>Sustainable Agriculture Solutions</p>
              </div>
            </div>
            <p className="footer-description">
              Your trusted partner in sustainable agriculture. We provide quality products
              and expert guidance for successful farming.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📷</a>
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">📹</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="footer-section">
            <h4>Our Products</h4>
            <ul className="footer-links">
              <li><Link to="/products">Seeds</Link></li>
              <li><Link to="/products">Fertilizers</Link></li>
              <li><Link to="/products">Pesticides</Link></li>
              <li><Link to="/products">Equipment</Link></li>
              <li><Link to="/products">Organic Products</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <p>
                <strong>📍 Address:</strong><br />
                Village Kanhaiya, Pimpri<br />
                Maharashtra, India
              </p>
              <p>
                <strong>📞 Phone:</strong><br />
                +91 98765 43210
              </p>
              <p>
                <strong>✉️ Email:</strong><br />
                info@kanhaiyakrushi.com
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Kanhaiya Krushi. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;