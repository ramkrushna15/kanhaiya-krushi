const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const { Service } = require('./models/Service');

dotenv.config();

const products = [
  {
    name: 'Organic Wheat Seeds',
    description: 'High-quality organic wheat seeds suitable for all soil types.',
    category: 'Seeds',
    price: 850,
    unit: 'kg',
    stock: 500,
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    features: ['Organic certified', 'High germination rate', 'Disease resistant'],
    isFeatured: true,
    isOrganic: true
  },
  {
    name: 'NPK Fertilizer',
    description: 'Balanced NPK fertilizer for all-purpose farming.',
    category: 'Fertilizers',
    price: 1200,
    unit: '50kg bag',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400',
    features: ['Balanced nutrients', 'Water soluble', 'Increases yield'],
    isFeatured: true
  },
  {
    name: 'Bio Pesticide',
    description: 'Natural pesticide made from neem extracts.',
    category: 'Pesticides',
    price: 650,
    unit: 'liter',
    stock: 300,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
    features: ['Natural ingredients', 'Eco-friendly', 'Safe for crops'],
    isFeatured: true,
    isOrganic: true
  }
];

const services = [
  {
    title: 'Soil Testing & Analysis',
    description: 'Comprehensive soil testing to determine nutrient levels and pH.',
    icon: '🔬',
    features: ['Complete analysis', 'Detailed report', 'Expert consultation'],
    price: 2500,
    duration: '3-5 days',
    category: 'Soil Testing'
  },
  {
    title: 'Crop Planning Consultation',
    description: 'Expert guidance on crop selection and rotation planning.',
    icon: '📊',
    features: ['Crop selection', 'Rotation planning', 'Market analysis'],
    price: 5000,
    duration: '2 hours',
    category: 'Consultation'
  }
];

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');
  
  await Product.deleteMany();
  await Service.deleteMany();
  console.log('Cleared existing data');
  
  await Product.insertMany(products);
  await Service.insertMany(services);
  
  console.log('Sample data added successfully!');
  console.log(`${products.length} products added`);
  console.log(`${services.length} services added`);
  
  process.exit();
})
.catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});