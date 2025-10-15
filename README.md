# Kanhaiya Krushi - Sustainable Agriculture Website

A modern, full-stack agriculture e-commerce website built with React, Node.js, Express, and MongoDB.

## 🌾 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Product Catalog**: Browse seeds, fertilizers, pesticides, and farming equipment
- **Services Section**: Agricultural consultation and expert services
- **Contact Form**: Easy communication with integrated form handling
- **Mobile Responsive**: Optimized for all device sizes
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🚀 Tech Stack

### Frontend
- React 19.2.0
- React Router DOM 7.9.4
- Axios for API calls
- Framer Motion for animations
- React Icons

### Backend
- Node.js
- Express 5.1.0
- MongoDB with Mongoose 8.19.1
- CORS enabled
- Express Validator

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running
- npm or yarn package manager

### Clone the Repository
```bash
git clone <your-repo-url>
cd agriculture-website
```

### Backend Setup
```bash
cd server
npm install

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/kanhaiya_krushi_db
PORT=5000
NODE_ENV=development" > .env

# Seed the database with sample data
node seed.js

# Start the server
npm run dev
```

### Frontend Setup
```bash
cd client
npm install

# Start the development server
npm start
```

The application will open at `http://localhost:3000`

## 🗂️ Project Structure

```
agriculture-website/
├── client/                 # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Services.jsx
│   │   │   └── Contact.jsx
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── server/                # Node.js backend
    ├── models/           # MongoDB models
    │   ├── Product.js
    │   └── Service.js
    ├── routes/           # API routes
    │   ├── productRoutes.js
    │   ├── serviceRoutes.js
    │   └── contactRoutes.js
    ├── seed.js          # Database seeding script
    ├── server.js        # Main server file
    └── package.json
```

## 🎨 Customization

### Change Logo
Replace the emoji icon (🌾) in the following files:
- `client/src/components/Navbar.jsx`
- `client/src/components/Footer.jsx`

Or add an actual logo image:
```jsx
<img src="/path/to/logo.png" alt="Kanhaiya Krushi" className="logo-image" />
```

### Update Contact Details
Edit the contact information in:
- `client/src/pages/Contact.jsx`
- `client/src/components/Footer.jsx`

### Change Colors
Modify CSS variables in `client/src/index.css`:
```css
:root {
  --primary-green: #2d5016;
  --accent-green: #4a7c2c;
  --wheat-gold: #f9a825;
  /* ... other colors */
}
```

## 📝 API Endpoints

### Products
- `GET /api/products/get-products` - Get all products
- `GET /api/products/get-products?category=Seeds` - Filter by category
- `GET /api/products/get-products?featured=true` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product

### Services
- `GET /api/services/get-services` - Get all services
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create new service

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions

## 🌟 Features to Add

- [ ] User authentication
- [ ] Shopping cart
- [ ] Order management
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Product reviews
- [ ] Image upload for products
- [ ] Email notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

Developed with ❤️ for sustainable agriculture

## 📞 Support

For support, email info@kanhaiyakrushi.com or visit our contact page.