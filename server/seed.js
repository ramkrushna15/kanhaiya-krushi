const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'Organic Wheat Seeds',
    description: 'Premium quality organic wheat seeds suitable for all soil types. High germination rate and disease-resistant variety.',
    category: 'Seeds',
    price: 450,
    unit: 'kg',
    stock: 500,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500',
    features: [
      'High germination rate (95%+)',
      'Disease resistant variety',
      'Suitable for all soil types',
      'Organic certified'
    ],
    tags: ['wheat', 'organic', 'seeds', 'high-yield'],
    isOrganic: true,
    isFeatured: true
  },
  {
    name: 'NPK Fertilizer',
    description: 'Balanced NPK 19:19:19 fertilizer for optimal plant growth. Suitable for all crops.',
    category: 'Fertilizers',
    price: 800,
    unit: 'kg',
    stock: 300,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500',
    features: [
      'Balanced NPK ratio',
      'Water soluble',
      'Quick absorption',
      'Increases yield by 30%'
    ],
    tags: ['fertilizer', 'npk', 'crop-nutrition'],
    isOrganic: false,
    isFeatured: true
  },
  {
    name: 'Organic Pesticide',
    description: 'Natural neem-based pesticide for eco-friendly pest control.',
    category: 'Pesticides',
    price: 350,
    unit: 'liter',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    features: [
      '100% natural ingredients',
      'Safe for beneficial insects',
      'No harmful residues',
      'Effective against 200+ pests'
    ],
    tags: ['pesticide', 'organic', 'neem', 'eco-friendly'],
    isOrganic: true,
    isFeatured: false
  },
  {
    name: 'Drip Irrigation Kit',
    description: 'Complete drip irrigation system for 1-acre land. Save water and increase efficiency.',
    category: 'Equipment',
    price: 15000,
    unit: 'set',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500',
    features: [
      'Covers 1-acre area',
      'Saves 70% water',
      'Easy installation',
      '5-year warranty'
    ],
    tags: ['irrigation', 'drip', 'water-saving', 'equipment'],
    isOrganic: false,
    isFeatured: true
  },
  {
    name: 'Vermicompost',
    description: 'Premium quality vermicompost enriched with beneficial microorganisms.',
    category: 'Organic Products',
    price: 200,
    unit: 'kg',
    stock: 1000,
    image: 'https://images.unsplash.com/photo-1597843786411-e9c7b5a82217?w=500',
    features: [
      'Rich in nutrients',
      'Improves soil structure',
      'Increases water retention',
      '100% organic'
    ],
    tags: ['vermicompost', 'organic', 'soil-improvement'],
    isOrganic: true,
    isFeatured: false
  },
  {
    name: 'Garden Tools Set',
    description: 'Complete set of essential gardening tools with ergonomic handles.',
    category: 'Tools',
    price: 1200,
    unit: 'set',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    features: [
      '10 essential tools',
      'Rust-resistant steel',
      'Ergonomic design',
      'Carrying bag included'
    ],
    tags: ['tools', 'gardening', 'equipment'],
    isOrganic: false,
    isFeatured: false
  }
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ MongoDB Connected');
  
  // Clear existing products
  await Product.deleteMany({});
  console.log('🗑️  Cleared existing products');
  
  // Insert sample products
  await Product.insertMany(sampleProducts);
  console.log(`✅ Added ${sampleProducts.length} products to database`);
  
  process.exit(0);
})
.catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
