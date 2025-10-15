// client/src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Equipment', 'Organic Products', 'Tools'];

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="products-page">
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
          {/* Category Filter */}
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => filterByCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Count */}
          <div className="products-count">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product._id} className="product-card card">
                  <div className="product-badges">
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
                    className="product-image" 
                  />
                  
                  <div className="product-content">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    
                    {product.features && product.features.length > 0 && (
                      <ul className="product-features">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index}>✓ {feature}</li>
                        ))}
                      </ul>
                    )}
                    
                    <div className="product-footer">
                      <div className="product-pricing">
                        <span className="product-price">₹{product.price}</span>
                        <span className="product-unit">per {product.unit}</span>
                      </div>
                      <div className="product-stock">
                        {product.stock > 0 ? (
                          <span className="in-stock">✓ In Stock</span>
                        ) : (
                          <span className="out-of-stock">Out of Stock</span>
                        )}
                      </div>
                    </div>
                    
                    <button className="btn btn-primary btn-block">
                      Add to Inquiry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="info-banner">
        <div className="container">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-icon">📦</div>
              <h3>Bulk Orders</h3>
              <p>Special discounts on bulk purchases</p>
            </div>
            <div className="info-item">
              <div className="info-icon">🚚</div>
              <h3>Free Delivery</h3>
              <p>On orders above ₹5,000</p>
            </div>
            <div className="info-item">
              <div className="info-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure transactions</p>
            </div>
            <div className="info-item">
              <div className="info-icon">📞</div>
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