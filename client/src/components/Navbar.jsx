import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import LanguageToggle from './LanguageToggle';
import './Navbar.css';
import './Navbar.brand.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, isLoaded } = useTranslation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!isLoaded) {
    return (
      <nav className="navbar">
        <div className="container navbar-container">
          <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <img src={logo} alt="Kanhaiya Krushi Logo" className="logo-image" />
            </div>
            <div className="logo-text">
              <span className="logo-title en-only">Kanhaiya Krushi</span>
              <span className="logo-subtitle en-only">SUSTAINABLE AGRICULTURE</span>
            </div>
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <img src={logo} alt="Kanhaiya Krushi Logo" className="logo-image" />
          </div>
          <div className="logo-text">
            <span className="logo-title en-only">Kanhaiya Krushi</span>
            <span className="logo-subtitle en-only">SUSTAINABLE AGRICULTURE</span>
          </div>
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" className={`navbar-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              {t('nav.home')}
            </Link>
          </li>
          <li>
            <Link to="/about" className={`navbar-link ${isActive('/about') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              {t('nav.about')}
            </Link>
          </li>
          <li>
            <Link to="/products" className={`navbar-link ${isActive('/products') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              {t('nav.products')}
            </Link>
          </li>
          <li>
            <Link to="/services" className={`navbar-link ${isActive('/services') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              {t('nav.services')}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-link navbar-btn" onClick={() => setIsMenuOpen(false)}>
              {t('nav.contact')}
            </Link>
          </li>
          <li className="navbar-lang">
            <LanguageToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
