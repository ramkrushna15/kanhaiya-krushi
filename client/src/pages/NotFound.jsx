// ==========================================
// 1. Create 404 Not Found Page
// client/src/pages/NotFound.jsx
// ==========================================
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="error-emoji">🌾</div>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              🏠 Go Home
            </Link>
            <Link to="/products" className="btn btn-secondary">
              🛒 Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;