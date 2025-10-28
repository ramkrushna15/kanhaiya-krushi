// client/src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';
import { formatPrice, formatStock, formatTags, formatFeatures, formatQuantity } from '../utils/formatters';
import SEO from '../components/SEO';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { t, isLoaded } = useTranslation();

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(isLoaded ? t('common.notFound') : 'Product not found or unable to load');
      setLoading(false);
    }
  };

  const handleQuantityChange = (type) => {
    const qtyData = formatQuantity(quantity, { min: 1, max: 100 });
    
    if (type === 'increase' && qtyData.canIncrease) {
      setQuantity(prev => prev + qtyData.step);
    } else if (type === 'decrease' && qtyData.canDecrease) {
      setQuantity(prev => prev - qtyData.step);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>{isLoaded ? t('common.loading') : 'Loading...'}</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <section className="page-header">
          <div className="container">
            <h1>{isLoaded ? t('common.notFound') : 'Product Not Found'}</h1>
            <p>{error}</p>
          </div>
        </section>
        <section className="section">
          <div className="container text-center">
            <Link to="/products" className="btn btn-primary">
              ← {isLoaded ? t('nav.products') : 'Back to Products'}
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Format product data using utility functions
  const formattedPrice = formatPrice(product.price, product.unit, { separator: ' / ' });
  const stockInfo = formatStock(product.stock, { showQuantity: true });
  const cleanTags = formatTags(product.tags, { maxTags: 10 });
  const cleanFeatures = formatFeatures(product.features, { maxFeatures: 5 });
  const qtyData = formatQuantity(quantity, { min: 1, max: Math.min(100, product.stock || 1) });

  return (
    <div className="product-detail-page">
      <SEO
        title={`${product.name} - ${t('nav.brand')}`}
        description={product.description.substring(0, 160)}
        url={`https://kanhaiyakrushi.com/products/${product._id}`}
        image={product.image}
      />

      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">{t('nav.home')}</Link>
            <span className="separator">›</span>
            <Link to="/products">{t('nav.products')}</Link>
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
                  <span className="badge badge-organic">🌿 {t('home.featuredProducts.organic')}</span>
                )}
                {product.isFeatured && (
                  <span className="badge badge-featured">⭐ Featured</span>
                )}
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="product-detail-image"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/600x450?text=Product+Image';
                }}
              />
            </div>

            {/* Product Info */}
            <div className="product-info-section">
              <span className="product-category-detail">{product.category}</span>
              <h1 className="product-title-detail">{product.name}</h1>

              <div className="product-price-section">
                <span className="product-price-detail">{formattedPrice}</span>
              </div>

              <div className="product-stock-section">
                <span className={`stock-indicator ${stockInfo.className}`}>
                  {stockInfo.indicator} {stockInfo.text}
                </span>
              </div>

              <p className="product-description-detail">{product.description}</p>

              {/* Features */}
              {cleanFeatures.length > 0 && (
                <div className="product-features-section">
                  <h3>Key Features:</h3>
                  <ul className="product-features-detail">
                    {cleanFeatures.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {cleanTags.length > 0 && (
                <div className="product-tags-section">
                  <h4>Tags:</h4>
                  <div className="product-tags">
                    {cleanTags.map((tag, index) => (
                      <span key={index} className="product-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="quantity-section">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button 
                    className={`quantity-btn ${!qtyData.canDecrease ? 'disabled' : ''}`}
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={!qtyData.canDecrease}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="quantity-value">{qtyData.current}</span>
                  <button 
                    className={`quantity-btn ${!qtyData.canIncrease ? 'disabled' : ''}`}
                    onClick={() => handleQuantityChange('increase')}
                    disabled={!qtyData.canIncrease}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-actions">
                <button className="btn btn-primary btn-large">Add to Inquiry</button>
                <Link to="/contact" className="btn btn-secondary btn-large">
                  {t('nav.contact')}
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
              <div className="info-icon" aria-label="Free Delivery">🚚</div>
              <h3>Free Delivery</h3>
              <p>On orders above ₹5,000</p>
            </div>
            <div className="info-box">
              <div className="info-icon" aria-label="Secure Payment">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure transactions</p>
            </div>
            <div className="info-box">
              <div className="info-icon" aria-label="24/7 Support">📞</div>
              <h3>24/7 Support</h3>
              <p>Expert advice anytime</p>
            </div>
            <div className="info-box">
              <div className="info-icon" aria-label="Easy Returns">↩️</div>
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