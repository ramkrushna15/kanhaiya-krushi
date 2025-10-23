// client/src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data.data);
      setSelectedImage(response.data.data.image);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <Link to="/products" className="btn btn-primary">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* Breadcrumb */}
      <section className="breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> / <Link to="/products">Products</Link> / {product.name}
        </div>
      </section>

      {/* Product Detail */}
      <section className="section">
        <div className="container">
          <div className="product-detail-grid">
            {/* Product Images */}
            <div className="product-images">
              <div className="main-image">
                <img src={selectedImage} alt={product.name} />
                {product.isOrganic && (
                  <span className="badge badge-organic-large">🌿 Organic Certified</span>
                )}
                {product.isFeatured && (
                  <span className="badge badge-featured-large">⭐ Featured</span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info-detail">
              <span className="product-category-badge">{product.category}</span>
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-price-section">
                <div className="price-display">
                  <span className="current-price">₹{product.price}</span>
                  <span className="price-unit">per {product.unit}</span>
                </div>
                <div className="stock-status">
                  {product.stock > 0 ? (
                    <span className="in-stock">
                      ✓ In Stock ({product.stock} {product.unit} available)
                    </span>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="product-features-detail">
                  <h3>Key Features</h3>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="product-tags">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                  ))}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="quantity-section">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => handleQuantityChange('decrease')}
                    className="qty-btn"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="qty-input"
                  />
                  <button 
                    onClick={() => handleQuantityChange('increase')}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-actions">
                <Link to="/contact" className="btn btn-primary btn-large">
                  📞 Contact for Order
                </Link>
                <a 
                  href={`https://wa.me/919767038479?text=Hi, I'm interested in ${product.name}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-large"
                >
                  💬 WhatsApp Inquiry
                </a>
              </div>

              {/* Additional Info */}
              <div className="additional-info">
                <div className="info-item">
                  <span className="icon">🚚</span>
                  <div>
                    <strong>Free Delivery</strong>
                    <p>On orders above ₹5,000</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="icon">✓</span>
                  <div>
                    <strong>Quality Assured</strong>
                    <p>100% genuine products</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="icon">📞</span>
                  <div>
                    <strong>Expert Support</strong>
                    <p>24/7 agricultural guidance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;