const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Service description is required']
  },
  icon: {
    type: String,
    default: '🌾'
  },
  features: [{
    type: String
  }],
  price: {
    type: Number,
    required: false
  },
  duration: {
    type: String,
    default: 'On Request'
  },
  category: {
    type: String,
    enum: ['Consultation', 'Soil Testing', 'Crop Planning', 'Pest Control', 'Training', 'Other'],
    default: 'Other'
  }
}, {
  timestamps: true
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: false
  },
  subject: {
    type: String,
    required: [true, 'Subject is required']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied'],
    default: 'new'
  }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);
const Contact = mongoose.model('Contact', contactSchema);

module.exports = { Service, Contact };