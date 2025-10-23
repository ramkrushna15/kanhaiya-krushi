const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Seeds', 'Fertilizers', 'Pesticides', 'Equipment', 'Organic Products', 'Tools', 'Other']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  unit: {
    type: String,
    required: true,
    default: 'kg'
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300?text=Agriculture+Product'
  },
  features: [{
    type: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String
  }]
}, {
  timestamps: true
});

productSchema.index({ name: 'text', description: 'text' });
// Create indexes when model is loaded
productSchema.index({ name: 'text', description: 'text' });

// Add method to ensure indexes are created
productSchema.statics.createIndexesIfNeeded = async function() {
  try {
    await this.createIndexes();
    console.log('✅ Text search indexes created successfully');
  } catch (error) {
    console.error('❌ Error creating indexes:', error.message);
  }
};


module.exports = mongoose.model('Product', productSchema);