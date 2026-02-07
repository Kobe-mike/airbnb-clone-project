# Project Setup & Installation Guide

## Prerequisites

Ensure you have installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download](https://www.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code or similar

---

## Step 1: Initialize Project

```bash
# Navigate to project directory
cd /Users/carter/Documents/project/airbnb-clone-project

# Initialize Node.js project
npm init -y

# Create folder structure
mkdir -p frontend/client/{css,js,assets/images}
mkdir -p frontend/admin/{css,js,assets/images}
mkdir -p backend/{config,routes,controllers,middleware,models,utils}
mkdir -p database/migrations
```

---

## Step 2: Install Backend Dependencies

```bash
# Install Node packages
npm install express mysql2 jsonwebtoken bcryptjs dotenv cors validator

# Install development dependencies
npm install --save-dev nodemon
```

---

## Step 3: Create Environment Configuration

Create `.env` file in project root:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=airbnb_clone
DB_PORT=3306

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Admin
ADMIN_EMAIL=admin@airbnb.com
ADMIN_PASSWORD=admin123

# Frontend
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000/admin
```

Create `.env.example` for documentation:

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=airbnb_clone
DB_PORT=3306
JWT_SECRET=change_this_secret
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@airbnb.com
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000/admin
```

---

## Step 4: MySQL Database Setup

### Create Database

```sql
-- Open MySQL in terminal
mysql -u root -p

-- Create database
CREATE DATABASE airbnb_clone;
USE airbnb_clone;

-- Create tables (see below)
```

### Create Tables

Create `database/schema.sql`:

```sql
-- USERS TABLE
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_username (username)
);

-- PROPERTIES TABLE
CREATE TABLE properties (
  id INT PRIMARY KEY AUTO_INCREMENT,
  owner_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(200) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  property_type ENUM('House', 'Apartment', 'Condo', 'Villa', 'Cabin', 'Room') DEFAULT 'Apartment',
  bedrooms INT DEFAULT 1,
  bathrooms INT DEFAULT 1,
  max_guests INT DEFAULT 2,
  price_per_night DECIMAL(10, 2) NOT NULL,
  availability_status ENUM('Available', 'Unavailable') DEFAULT 'Available',
  amenities JSON,
  images JSON,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_owner_id (owner_id),
  INDEX idx_location (location),
  FULLTEXT INDEX ft_title_desc (title, description)
);

-- BOOKINGS TABLE
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
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_property_id (property_id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  UNIQUE KEY unique_booking (property_id, check_in, check_out)
);

-- REVIEWS TABLE
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
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  INDEX idx_property_id (property_id),
  INDEX idx_user_id (user_id),
  UNIQUE KEY unique_review (booking_id)
);

-- PAYMENTS TABLE
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
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_user_id (user_id)
);
```

### Import Schema

```bash
# In terminal
mysql -u root -p airbnb_clone < database/schema.sql
```

---

## Step 5: Configure package.json Scripts

Edit `package.json`:

```json
{
  "name": "airbnb-clone",
  "version": "1.0.0",
  "description": "Airbnb clone web application",
  "main": "backend/server.js",
  "scripts": {
    "start": "node backend/server.js",
    "dev": "nodemon backend/server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["airbnb", "booking", "property"],
  "author": "Your Name",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.1.0",
    "mysql2": "^3.6.0",
    "validator": "^13.9.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## Step 6: Backend Server Setup

Create `backend/config/database.js`:

```javascript
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
```

Create `backend/config/jwt.js`:

```javascript
module.exports = {
  secret: process.env.JWT_SECRET,
  options: {
    expiresIn: process.env.JWT_EXPIRE || '7d',
    algorithm: 'HS256'
  }
};
```

---

## Step 7: Start Development

### Terminal 1 - MySQL
```bash
# If MySQL isn't running as a service, start it
mysql -u root -p
```

### Terminal 2 - Node Server
```bash
npm run dev
```

You should see:
```
Server running on http://localhost:3000
Database connected successfully
```

---

## Step 8: Test Backend

### Using curl or Postman

```bash
# Test server is running
curl http://localhost:3000
```

---

## Next Steps

1. Create backend middleware & routes
2. Implement authentication endpoints
3. Build client-side HTML/CSS/JS
4. Connect frontend to API
5. Create admin dashboard

---

## Common Issues & Solutions

### Issue: MySQL Connection Failed
**Solution:** 
- Ensure MySQL is running: `mysql -u root -p`
- Check DB_USER and DB_PASSWORD in .env
- Verify database exists: `SHOW DATABASES;`

### Issue: Port 3000 Already in Use
**Solution:**
- Change PORT in .env to another port (e.g., 3001)
- Or kill process: `lsof -ti:3000 | xargs kill -9`

### Issue: Cannot Find Module 'mysql2'
**Solution:**
- Run: `npm install mysql2`

---

## Useful Commands

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# MySQL commands
mysql -u root -p                    # Connect to MySQL
mysql -u root -p < database/schema.sql  # Import schema
```

---

This setup provides a solid foundation. The next phase is implementing the backend APIs and frontend interfaces.
