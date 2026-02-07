# Airbnb Clone - Architecture & Development Plan

## Overview
A full-stack web application with public client-facing interface and private admin dashboard for property and booking management.

---

## 🏗️ Project Structure

```
airbnb-clone-project/
├── frontend/
│   ├── client/                    # Public-facing web app
│   │   ├── index.html
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   ├── responsive.css
│   │   │   └── animations.css
│   │   ├── js/
│   │   │   ├── app.js
│   │   │   ├── auth.js
│   │   │   ├── listings.js
│   │   │   ├── search.js
│   │   │   ├── booking.js
│   │   │   └── utils.js
│   │   └── assets/
│   │       └── images/
│   │
│   └── admin/                     # Admin dashboard
│       ├── index.html
│       ├── css/
│       │   ├── admin-style.css
│       │   └── responsive.css
│       ├── js/
│       │   ├── admin-app.js
│       │   ├── auth.js
│       │   ├── properties.js
│       │   ├── bookings.js
│       │   ├── users.js
│       │   └── utils.js
│       └── assets/
│           └── images/
│
├── backend/
│   ├── server.js                  # Node.js/Express entry point
│   ├── config/
│   │   ├── database.js
│   │   ├── jwt.js
│   │   └── env.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── properties.js
│   │   ├── bookings.js
│   │   ├── users.js
│   │   ├── reviews.js
│   │   └── payments.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   ├── bookingController.js
│   │   ├── userController.js
│   │   └── paymentController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Property.js
│   │   ├── Booking.js
│   │   ├── Review.js
│   │   └── Payment.js
│   └── utils/
│       ├── validators.js
│       └── helpers.js
│
├── database/
│   ├── schema.sql                 # MySQL database schema
│   ├── seeds.sql                  # Sample data
│   └── migrations/
│
├── .env.example
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔧 Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Animations
- **Vanilla JavaScript (ES6+)** - No framework for lightweight solution
- **Fetch API** - Client-server communication

### Backend
- **Node.js + Express** - RESTful API server
- **JWT (JSON Web Tokens)** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **CORS** - Cross-origin requests

### Database
- **MySQL 8.0+** - Relational database
- **Connection Pool** - Efficient database connections

### Deployment
- **Local Development** - Node.js + MySQL
- **Production Ready** - Docker containers (optional)

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  phone VARCHAR(20),
  profile_picture VARCHAR(255),
  bio TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Properties Table
```sql
CREATE TABLE properties (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(200) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  property_type ENUM('House', 'Apartment', 'Condo', 'Villa', 'Cabin', 'Room') DEFAULT 'Apartment',
  bedrooms INT,
  bathrooms INT,
  max_guests INT,
  price_per_night DECIMAL(10, 2) NOT NULL,
  availability_status ENUM('Available', 'Unavailable') DEFAULT 'Available',
  amenities JSON,
  images JSON,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  property_id INT NOT NULL,
  user_id INT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed') DEFAULT 'Pending',
  total_price DECIMAL(10, 2) NOT NULL,
  number_of_guests INT NOT NULL,
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Reviews Table
```sql
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  property_id INT NOT NULL,
  user_id INT NOT NULL,
  booking_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(200),
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);
```

### Payments Table
```sql
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  booking_id INT NOT NULL UNIQUE,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'),
  transaction_id VARCHAR(100),
  status ENUM('Pending', 'Completed', 'Failed', 'Refunded') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🔐 Authentication & Authorization

### User Roles
1. **Guest** - Browse properties, make bookings
2. **Host** - Manage properties, view bookings
3. **Admin** - Full system access, user management

### Authentication Flow
```
1. User registers/login → Backend validates → JWT token generated
2. Token stored in localStorage (client-side)
3. Token sent with each API request (Authorization header)
4. Backend middleware validates token
5. Access granted/denied based on role
```

### Admin Access Control
- Admin login page with separate authentication
- Session validation on every admin page
- Redirect to login if not authenticated or not admin

---

## 🎨 Client-Side Design Approach

### Key Features
- **Modern, Artistic Design** inspired by Airbnb.com
- Clean typography & whitespace
- High-quality imagery showcase
- Smooth animations & transitions
- Responsive design (Mobile-first)
- Interactive filtering & search
- Intuitive booking flow

### Pages
1. **Home** - Featured properties, search bar
2. **Search Results** - Filtered listings with map view
3. **Property Details** - Full property info, reviews, booking
4. **User Profile** - Wishlist, bookings, account settings
5. **Checkout** - Booking confirmation & payment

---

## ⚙️ Admin Dashboard Features

### Dashboard Overview
- Quick stats (Total properties, Bookings, Revenue)
- Recent bookings & reviews

### Property Management
- List all properties
- Add/Edit/Delete properties
- Upload multiple property images
- Manage amenities & pricing

### Booking Management
- View all bookings across all properties
- Confirm/Cancel bookings
- Manage dates & pricing

### User Management
- View all registered users
- Verify user accounts
- Suspend/Activate users
- View user activity

### Analytics
- Revenue charts
- Booking trends
- Popular properties

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verify token

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create property (authenticated)
- `PUT /api/properties/:id` - Update property (owner/admin)
- `DELETE /api/properties/:id` - Delete property (owner/admin)
- `GET /api/properties/search?params` - Search properties

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `GET /api/bookings/user/:userId` - Get user bookings
- `PUT /api/bookings/:id` - Update booking status (admin)
- `DELETE /api/bookings/:id` - Cancel booking

### Reviews
- `POST /api/reviews` - Post review
- `GET /api/reviews/property/:id` - Get property reviews
- `DELETE /api/reviews/:id` - Delete review

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update profile
- `GET /api/users` - Get all users (admin only)

### Payments
- `POST /api/payments` - Process payment
- `GET /api/payments/:id` - Get payment status

---

## 🚀 Development Phases

### Phase 1: Setup & Core Infrastructure
- [ ] Project structure
- [ ] Database setup & schema
- [ ] Express server setup
- [ ] JWT authentication system

### Phase 2: Client Frontend - Public
- [ ] Landing page with search
- [ ] Property listing page
- [ ] Property detail page
- [ ] User registration/login
- [ ] Booking flow

### Phase 3: Backend APIs
- [ ] Authentication endpoints
- [ ] Property management endpoints
- [ ] Booking endpoints
- [ ] Review endpoints
- [ ] User profile endpoints

### Phase 4: Admin Dashboard
- [ ] Admin login & authentication
- [ ] Dashboard overview
- [ ] Property management interface
- [ ] Booking management
- [ ] User management

### Phase 5: Enhanced Features
- [ ] Payment integration
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Rating & review system
- [ ] Wishlists

### Phase 6: Testing & Optimization
- [ ] Performance testing
- [ ] Security audit
- [ ] Cross-browser testing
- [ ] Mobile responsiveness

### Phase 7: Deployment
- [ ] Production database setup
- [ ] Server deployment
- [ ] SSL/HTTPS configuration
- [ ] Domain setup

---

## 🛡️ Security Considerations

1. **Password Security** - bcryptjs hashing with salt rounds
2. **SQL Injection** - Parameterized queries using prepared statements
3. **CORS** - Restrict cross-origin requests
4. **Input Validation** - Server-side validation all inputs
5. **XSS Protection** - Sanitize user inputs
6. **Rate Limiting** - Prevent API abuse
7. **HTTPS** - Use SSL/TLS in production
8. **Environment Variables** - Store secrets in .env

---

## 📝 Dependencies

### Backend
```json
"dependencies": {
  "express": "^4.18.2",
  "mysql2": "^3.6.0",
  "jsonwebtoken": "^9.1.0",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5",
  "validator": "^13.9.0"
}
```

---

## 🔄 Deployment Checklist

- [ ] Environment variables configured (.env)
- [ ] Database migrations run
- [ ] CORS properly configured
- [ ] JWT secret secured
- [ ] SSL certificates installed
- [ ] Database backups automated
- [ ] Error logging configured
- [ ] Monitoring setup
- [ ] Rate limiting enabled

---

## 📞 Support & Maintenance

- Regular security updates
- Database optimization
- Performance monitoring
- User support system
- Automated backups

---

This architecture provides a solid foundation for building a scalable, secure, and user-friendly Airbnb clone.
