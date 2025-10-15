const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const { Service } = require('./models/Service');

dotenv.config();

const products = [
  {
    name: 'Organic Wheat Seeds',
    description: 'High-quality organic wheat seeds suitable for all soil types. Perfect for sustainable farming with excellent germination rates.',
    category: 'Seeds',
    price: 850,
    unit: 'kg',
    stock: 500,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    features: ['Organic certified', 'High germination rate', 'Disease resistant', 'Non-GMO'],
    isFeatured: true,
    isOrganic: true,
    tags: ['wheat', 'organic', 'seeds', 'certified']
  },
  {
    name: 'Premium NPK Fertilizer',
    description: 'Balanced NPK fertilizer for all-purpose farming. Contains essential nutrients for healthy crop growth.',
    category: 'Fertilizers',
    price: 1200,
    unit: '50kg bag',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    features: ['Balanced nutrients', 'Water soluble', 'Increases yield', 'Quick absorption'],
    isFeatured: true,
    tags: ['fertilizer', 'npk', 'nutrients']
  },
  {
    name: 'Bio Pesticide - Neem Extract',
    description: 'Natural pesticide made from pure neem extracts. Eco-friendly and safe for organic farming.',
    category: 'Pesticides',
    price: 650,
    unit: 'liter',
    stock: 300,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    features: ['Natural ingredients', 'Eco-friendly', 'Safe for crops', 'No harmful residues'],
    isFeatured: true,
    isOrganic: true,
    tags: ['pesticide', 'neem', 'organic', 'bio']
  },
  {
    name: 'Hybrid Tomato Seeds',
    description: 'High-yielding hybrid tomato seeds with disease resistance and excellent fruit quality.',
    category: 'Seeds',
    price: 450,
    unit: '100g',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1592921870789-04563d55041c?w=400',
    features: ['High yield', 'Disease resistant', 'Good shelf life', 'Uniform size'],
    isFeatured: false,
    tags: ['tomato', 'hybrid', 'vegetables']
  },
  {
    name: 'Organic Compost',
    description: 'Premium quality organic compost enriched with natural nutrients for soil health.',
    category: 'Organic Products',
    price: 800,
    unit: '50kg bag',
    stock: 250,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    features: ['100% organic', 'Improves soil structure', 'Rich in microorganisms', 'Odorless'],
    isFeatured: false,
    isOrganic: true,
    tags: ['compost', 'organic', 'soil health']
  },
  {
    name: 'Garden Tool Set',
    description: 'Complete set of essential gardening tools made from high-quality steel.',
    category: 'Tools',
    price: 2500,
    unit: 'set',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    features: ['Durable steel', '5-piece set', 'Ergonomic handles', 'Rust resistant'],
    isFeatured: false,
    tags: ['tools', 'gardening', 'equipment']
  }
];

const services = [
  {
    title: 'Soil Testing & Analysis',
    description: 'Comprehensive soil testing to determine nutrient levels, pH balance, and recommendations for optimal crop growth.',
    icon: '🔬',
    features: [
      'Complete nutrient analysis',
      'pH level testing',
      'Detailed report with recommendations',
      'Expert consultation included',
      'Organic matter assessment'
    ],
    price: 2500,
    duration: '3-5 days',
    category: 'Soil Testing'
  },
  {
    title: 'Crop Planning Consultation',
    description: 'Expert guidance on crop selection, rotation planning, and market analysis for profitable farming.',
    icon: '📊',
    features: [
      'Crop selection advice',
      'Rotation planning strategy',
      'Market demand analysis',
      'Seasonal recommendations',
      'Profit optimization tips'
    ],
    price: 5000,
    duration: '2 hours',
    category: 'Consultation'
  },
  {
    title: 'Organic Farming Training',
    description: 'Hands-on training program for farmers interested in transitioning to organic farming methods.',
    icon: '🎓',
    features: [
      'Practical demonstrations',
      'Certification guidance',
      'Organic inputs training',
      'Pest management techniques',
      'Marketing strategies'
    ],
    price: 8000,
    duration: '2 days',
    category: 'Training'
  },
  {
    title: 'Pest & Disease Management',
    description: 'Professional pest identification and integrated pest management solutions for healthy crops.',
    icon: '🐛',
    features: [
      'Field inspection',
      'Pest identification',
      'Treatment plan',
      'Follow-up visits',
      'Preventive measures'
    ],
    price: 3500,
    duration: '1 day',
    category: 'Pest Control'
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agriculture_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ Connected to MongoDB');
  
  // Clear existing data
  await Product.deleteMany();
  await Service.deleteMany();
  console.log('🗑️  Cleared existing data');
  
  // Insert new data
  await Product.insertMany(products);
  await Service.insertMany(services);
  
  console.log('✨ Sample data added successfully!');
  console.log(`📦 ${products.length} products added`);
  console.log(`🛠️  ${services.length} services added`);
  console.log('\n🌾 Kanhaiya Krushi database is ready!');
  
  process.exit();
})
.catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});