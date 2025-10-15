import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png'; // <-- import your PNG file

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          {/* Use the PNG logo instead of emoji */}
          <div className="logo-icon">
            <img src={logo} alt="Kanhaiya Krushi Logo" className="logo-image" />
          </div>
          <div className="logo-text">
            <span className="logo-title">Kanhaiya Krushi</span>
            <span className="logo-subtitle">Sustainable Agriculture</span>
          </div>
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              className={`navbar-link ${isActive('/products') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
          </li>
          <li>
            <Link 
              to="/services" 
              className={`navbar-link ${isActive('/services') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className="navbar-link navbar-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
