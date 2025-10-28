// client/src/pages/Products.jsx
import SEO from '../components/SEO';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import { formatPrice, formatStock, formatFeatures } from '../utils/formatters';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Equipment', 'Organic Products', 'Tools'];

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products whenever category, search, or products change
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data.data);
      setFilteredProducts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <SEO
        title="Agricultural Products - Seeds, Fertilizers & More | Kanhaiya Krushi"
        description="Browse quality agricultural products including organic seeds, fertilizers, pesticides, and farming equipment."
        url="https://kanhaiyakrushi.com/products"
      />

      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Our Products</h1>
          <p>Quality agricultural products for every farming need</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="section">
        <div className="container">
          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="clear-search"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="category-filter" role="tablist">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                role="tab"
                aria-selected={selectedCategory === category}
                aria-label={`Filter by ${category}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Count */}
          <div className="products-count">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const formattedPrice = formatPrice(product.price, product.unit);
                const stockInfo = formatStock(product.stock);
                const limitedFeatures = formatFeatures(product.features, { maxFeatures: 3 });

                return (
                  <div key={product._id} className="product-card card">
                    <div className="product-badges">
                      {product.isOrganic && (
                        <span className="badge badge-organic">🌿 Organic</span>
                      )}
                      {product.isFeatured && (
                        <span className="badge badge-featured">⭐ Featured</span>
                      )}
                    </div>

                    <Link to={`/products/${product._id}`} aria-label={`View details for ${product.name}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Product+Image';
                        }}
                      />
                    </Link>

                    <div className="product-content">
                      <span className="product-category">{product.category}</span>
                      <Link to={`/products/${product._id}`} className="product-link">
                        <h3 className="product-name">{product.name}</h3>
                      </Link>

                      <p className="product-description">
                        {product.description.length > 100 
                          ? `${product.description.substring(0, 100)}...` 
                          : product.description
                        }
                      </p>

                      {limitedFeatures.length > 0 && (
                        <ul className="product-features">
                          {limitedFeatures.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      )}

                      <div className="product-footer">
                        <div className="product-pricing">
                          <span className="product-price">{formattedPrice}</span>
                        </div>

                        <div className="product-stock">
                          <span className={stockInfo.className}>
                            {stockInfo.indicator} {stockInfo.text}
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/products/${product._id}`}
                        className="btn btn-primary btn-block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-products">
              <div className="no-products-content">
                <div className="no-products-icon">🔍</div>
                <h3>No products found</h3>
                <p>No products match your current search and filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="btn btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="info-banner">
        <div className="container">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon" aria-label="Bulk Orders">📦</div>
              <h3>Bulk Orders</h3>
              <p>Special discounts on bulk purchases</p>
            </div>

            <div className="info-item">
              <div className="info-icon" aria-label="Free Delivery">🚚</div>
              <h3>Free Delivery</h3>
              <p>On orders above ₹5,000</p>
            </div>

            <div className="info-item">
              <div className="info-icon" aria-label="Secure Payment">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure transactions</p>
            </div>

            <div className="info-item">
              <div className="info-icon" aria-label="24/7 Support">📞</div>
              <h3>24/7 Support</h3>
              <p>Expert advice anytime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;