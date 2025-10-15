// ==========================================
// client/src/pages/Contact.jsx - Complete with Working Google Maps
// ==========================================
import React, { useState } from 'react';
import { submitContact } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await submitContact(formData);
      setStatus({
        type: 'success',
        message: response.data.message
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="form-input"
                  ></textarea>
                </div>

                {status.message && (
                  <div className={`alert alert-${status.type}`}>
                    {status.message}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-container">
              <h2>Get In Touch</h2>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>Address</h4>
                    <p>Near Market Yard, Jeur, Karmala, Solapur<br />Maharashtra, India</p>
                    <a 
                      href="https://maps.app.goo.gl/hvWERXEXCCTknryc8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="map-link"
                    >
                      📍 View on Google Maps
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>Phone</h4>
                    <p>
                      <a href="tel:+919767038479" className="phone-link">+91 9767038479</a>
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h4>Email</h4>
                    <p>
                      <a href="mailto:info@kanhaiyakrushi.com" className="email-link">info@kanhaiyakrushi.com</a><br />
                      <a href="mailto:support@kanhaiyakrushi.com" className="email-link">support@kanhaiyakrushi.com</a>
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">🕐</div>
                  <div>
                    <h4>Business Hours</h4>
                    <p>Monday - Saturday: 9:00 AM - 6:00 PM<br />Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="social-links-contact">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">📘</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">📷</a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">🐦</a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">📹</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section - WITH YOUR ACTUAL EMBED CODE */}
      <section className="map-section">
        <div className="container">
          <h2 className="section-title text-center">Find Us Here</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1894.4637711294495!2d75.1587207!3d18.2591429!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc48949d87a980d%3A0xa39dd297c64836a6!2sPatil%20House!5e0!3m2!1sen!2sin!4v1760534523094!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kanhaiya Krushi Location - Patil House, Jeur"
            ></iframe>
          </div>
          <div className="map-action">
            <a 
              href="https://maps.app.goo.gl/hvWERXEXCCTknryc8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
            >
              🗺️ Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;