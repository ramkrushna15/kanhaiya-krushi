// client/src/pages/ProductDetail.jsx
import SEO from '../components/SEO';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Product not found or unable to load');
      setLoading(false);
    }
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
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

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <section className="page-header">
          <div className="container">
            <h1>Product Not Found</h1>
            <p>The product you're looking for doesn't exist</p>
          </div>
        </section>
        <section className="section">
          <div className="container text-center">
            <p className="error-message">{error}</p>
            <Link to="/products" className="btn btn-primary">
              ← Back to Products
            </Link>
          </div>
        </section>
      </div>
    );
    return (
      <div className="product-detail-page">
        <SEO
          title={`${product.name} - Kanhaiya Krushi`}
          description={product.description.substring(0, 160)}
          url={`https://kanhaiyakrushi.com/products/${product._id}`}
          image={product.image}
        />
        {/* rest of the component */}

  }

        return (
        <div className="product-detail-page">
          {/* Breadcrumb */}
          <section className="breadcrumb-section">
            <div className="container">
              <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span className="separator">›</span>
                <Link to="/products">Products</Link>
                <span className="separator">›</span>
                <span>{product.name}</span>
              </div>
            </div>
          </section>

          {/* Product Detail Section */}
          <section className="section">
            <div className="container">
              <div className="product-detail-grid">
                {/* Product Image */}
                <div className="product-image-section">
                  <div className="product-badges-detail">
                    {product.isOrganic && (
                      <span className="badge badge-organic">🌿 Organic</span>
                    )}
                    {product.isFeatured && (
                      <span className="badge badge-featured">⭐ Featured</span>
                    )}
                  </div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-detail-image"
                  />
                </div>

                {/* Product Info */}
                <div className="product-info-section">
                  <span className="product-category-detail">{product.category}</span>
                  <h1 className="product-title-detail">{product.name}</h1>

                  <div className="product-price-section">
                    <span className="product-price-detail">₹{product.price}</span>
                    <span className="product-unit-detail">per {product.unit}</span>
                  </div>

                  <div className="product-stock-section">
                    {product.stock > 0 ? (
                      <span className="in-stock-detail">✓ In Stock ({product.stock} units available)</span>
                    ) : (
                      <span className="out-of-stock-detail">✗ Out of Stock</span>
                    )}
                  </div>

                  <p className="product-description-detail">{product.description}</p>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="product-features-section">
                      <h3>Key Features:</h3>
                      <ul className="product-features-detail">
                        {product.features.map((feature, index) => (
                          <li key={index}>✓ {feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="product-tags-section">
                      <h4>Tags:</h4>
                      <div className="product-tags">
                        {product.tags.map((tag, index) => (
                          <span key={index} className="product-tag">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div className="quantity-section">
                    <label>Quantity:</label>
                    <div className="quantity-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange('decrease')}
                      >
                        -
                      </button>
                      <span className="quantity-value">{quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleQuantityChange('increase')}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="product-actions">
                    <button className="btn btn-primary btn-large">
                      Add to Inquiry
                    </button>
                    <Link to="/contact" className="btn btn-secondary btn-large">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Info */}
          <section className="section bg-light-beige">
            <div className="container">
              <div className="additional-info-grid">
                <div className="info-box">
                  <div className="info-icon">🚚</div>
                  <h3>Free Delivery</h3>
                  <p>On orders above ₹5,000</p>
                </div>
                <div className="info-box">
                  <div className="info-icon">🔒</div>
                  <h3>Secure Payment</h3>
                  <p>100% secure transactions</p>
                </div>
                <div className="info-box">
                  <div className="info-icon">📞</div>
                  <h3>24/7 Support</h3>
                  <p>Expert advice anytime</p>
                </div>
                <div className="info-box">
                  <div className="info-icon">↩️</div>
                  <h3>Easy Returns</h3>
                  <p>7-day return policy</p>
                </div>
              </div>
            </div>
          </section>
        </div>
        );
};

        export default ProductDetail;
