import React, { useState } from 'react';
import { submitContact } from '../services/api';
import { formatContact } from '../utils/formatters';
import { useTranslation } from '../hooks/useTranslation';
import SEO from '../components/SEO';
import './Contact.css';

const Contact = () => {
  const { t, ti } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = t('contact.validation.nameRequired');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = t('contact.validation.emailInvalid');
    }

    if (formData.phone && !/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = t('contact.validation.phoneInvalid');
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = t('contact.validation.subjectRequired');
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = t('contact.validation.messageRequired');
    }

    if (formData.message.length > 1000) {
      newErrors.message = t('contact.validation.messageTooLong');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus({ type: 'error', message: t('contact.form.fixErrors') });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await submitContact(formData);
      setStatus({
        type: 'success',
        message: t('contact.form.success')
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || t('contact.form.error')
      });
    } finally {
      setLoading(false);
    }
  };

  // Format contact information
  const contactInfo = formatContact('+919767038479', 'info@kanhaiyakrushi.com');
  const supportInfo = formatContact(null, 'support@kanhaiyakrushi.com');

  return (
    <div className="contact-page">
      <SEO 
        title={t('contact.pageTitle') + ' - ' + t('nav.brand') + ' | ' + t('contact.info.addressText').replace(/\n/g, ', ')}
        description={t('contact.pageDescription')}
        url="https://kanhaiyakrushi.com/contact"
      />

      <section className="page-header">
        <div className="container">
          <h1 className="heading-marathi complex-conjuncts">{t('contact.title')}</h1>
          <p className="marathi-text conjunct-fix">{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-form-container">
              <h2>{t('contact.form.title')}</h2>
              
              {status.message && (
                <div className={`alert alert-${status.type}`} role="alert">
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">{t('contact.form.name')} {t('contact.form.required')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    required
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && <span id="name-error" className="error-message" role="alert">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t('contact.form.email')} {t('contact.form.required')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    required
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <span id="email-error" className="error-message" role="alert">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{t('contact.form.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder={t('contact.form.phonePlaceholder')}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && <span id="phone-error" className="error-message" role="alert">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">{t('contact.form.subject')} {t('contact.form.required')}</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`form-input ${errors.subject ? 'error' : ''}`}
                    required
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {errors.subject && <span id="subject-error" className="error-message" role="alert">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t('contact.form.message')} {t('contact.form.required')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    maxLength="1000"
                    className={`form-input ${errors.message ? 'error' : ''}`}
                    required
                    aria-describedby={errors.message ? 'message-error' : 'message-count'}
                  ></textarea>
                  <div id="message-count" className="character-count">{ti('contact.form.characterCount', { count: formData.message.length })}</div>
                  {errors.message && <span id="message-error" className="error-message" role="alert">{errors.message}</span>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-block" 
                  disabled={loading}
                  aria-describedby={loading ? 'loading-status' : undefined}
                >
                  {loading ? (
                    <>
                      <span className="loading-spinner" aria-hidden="true"></span>
                      <span id="loading-status">{t('contact.form.sending')}</span>
                    </>
                  ) : (
                    t('contact.form.send')
                  )}
                </button>
              </form>
            </div>

            <div className="contact-info-container">
              <h2>{t('contact.info.title')}</h2>
              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-icon" aria-label={t('contact.info.address')}>📍</div>
                  <div>
                    <h4 className="marathi-text conjunct-fix">{t('contact.info.address')}</h4>
                    <address className="ultra-complex-conjuncts complex-conjuncts-critical">
                      {t('contact.info.addressText').split('\n').map((line, index) => (
                        <span key={index} className="conjunct-fix">
                          {line}
                          {index === 0 && <br />}
                        </span>
                      ))}
                    </address>
                    <a 
                      href="https://maps.app.goo.gl/hvWERXEXCCTknryc8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="map-link marathi-text conjunct-fix"
                      aria-label={t('contact.info.viewOnMaps')}
                    >
                      {t('contact.info.viewOnMaps')}
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon" aria-label={t('contact.info.phone')}>📞</div>
                  <div>
                    <h4 className="marathi-text conjunct-fix">{t('contact.info.phone')}</h4>
                    <p>
                      <a 
                        href={contactInfo.phoneHref} 
                        className="phone-link"
                        aria-label={t('contact.social.whatsapp')}
                      >
                        {contactInfo.phone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon" aria-label={t('contact.info.email')}>✉️</div>
                  <div>
                    <h4 className="marathi-text conjunct-fix">{t('contact.info.email')}</h4>
                    <div className="email-list">
                      <p>
                        <a 
                          href={contactInfo.emailHref} 
                          className="email-link"
                          aria-label={t('contact.social.email')}
                        >
                          {contactInfo.email}
                        </a>
                      </p>
                      <p>
                        <a 
                          href={supportInfo.emailHref} 
                          className="email-link"
                          aria-label={t('contact.social.email')}
                        >
                          {supportInfo.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon" aria-label={t('contact.info.businessHours')}>🕐</div>
                  <div>
                    <h4 className="marathi-text conjunct-fix">{t('contact.info.businessHours')}</h4>
                    <div className="business-hours marathi-text conjunct-fix">
                      <p><strong className="conjunct-fix">{t('contact.info.mondayToSaturday')}</strong> <span className="complex-conjuncts">{t('contact.info.morningToEvening')}</span></p>
                      <p><strong className="conjunct-fix">{t('contact.info.sunday')}</strong> <span className="complex-conjuncts">{t('contact.info.morningToAfternoon')}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="social-links-contact">
                <h4 className="marathi-text conjunct-fix">{t('contact.social.title')}</h4>
                <div className="social-icons">
                  <a 
                    href="https://wa.me/919767038479" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link whatsapp"
                    aria-label={t('contact.social.whatsapp')}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
                    </svg>
                  </a>
                  <a 
                    href="mailto:info@kanhaiyakrushi.com" 
                    className="social-link email"
                    aria-label={t('contact.social.email')}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                  {/* Note: Social media links temporarily removed until profiles are set up */}
                  {/* TODO: Add Facebook, Instagram, Twitter, YouTube links when profiles are ready */}
                </div>
                <p className="social-note marathi-text conjunct-fix">
                  <small className="complex-conjuncts">{t('contact.social.comingSoon')}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <h2 className="section-title text-center heading-marathi conjunct-fix">{t('contact.map.title')}</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1894.4637711294495!2d75.1587207!3d18.2591429!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc48949d87a980d%3A0xa39dd297c64836a6!2sPatil%20House!5e0!3m2!1sen!2sin!4v1760534523094!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Kanhaiya Krushi Location"
            ></iframe>
          </div>
          <div className="map-action">
            <a 
              href="https://maps.app.goo.gl/hvWERXEXCCTknryc8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
              aria-label={t('contact.map.openInMaps')}
            >
              <span className="marathi-text conjunct-fix">{t('contact.map.openInMaps')}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;