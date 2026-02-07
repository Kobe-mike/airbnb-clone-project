# Airbnb Clone Web Application

> A full-stack web application that replicates Airbnb's core functionality with public client interface and admin management dashboard.

## 🎯 Project Goals

- **Public Platform**: Guests can browse, search, and book properties
- **Host Management**: Hosts can list and manage properties
- **Admin Control**: Administrators manage users, properties, and bookings
- **Artistic Design**: Modern, clean UI inspired by Airbnb.com
- **Scalable Architecture**: Ready for production deployment

## 🏗️ Architecture Overview

### Frontend Stack
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox & Grid
- **Vanilla JavaScript (ES6+)** - Interactive functionality
- **Responsive Design** - Mobile-first approach

### Backend Stack
- **Node.js + Express.js** - RESTful API server
- **JWT Authentication** - Secure token-based auth
- **bcryptjs** - Password encryption
- **CORS** - Cross-origin resource sharing

### Database Stack
- **MySQL 8.0+** - Relational database
- **Connection Pool** - Efficient database management
- **Prepared Statements** - SQL injection protection

## 📁 Project Structure

```
airbnb-clone-project/
├── frontend/
│   ├── client/           # Public web application
│   └── admin/            # Administrator dashboard
├── backend/
│   ├── config/           # Configuration files
│   ├── routes/           # API endpoints
│   ├── controllers/       # Business logic
│   ├── middleware/        # Authentication & validation
│   ├── models/           # Database models
│   └── utils/            # Helper functions
├── database/
│   ├── schema.sql        # Database structure
│   └── seeds.sql         # Sample data
├── ARCHITECTURE.md       # Detailed architecture design
├── SETUP.md              # Installation & setup guide
└── TECHNICAL_ARCHITECTURE.md  # Technical diagrams
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MySQL 8.0+
- Git

### Installation

1. **Enter Project Directory**
   ```bash
   cd /Users/carter/Documents/project/airbnb-clone-project
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Database**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

4. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

Server will run on `http://localhost:3000`

## 📚 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Complete architecture design and API specification
- **[SETUP.md](SETUP.md)** - Step-by-step installation and configuration guide
- **[TECHNICAL_ARCHITECTURE.md](TECHNICAL_ARCHITECTURE.md)** - Technical diagrams and data flows

## 🌟 Key Features

### Client Interface (Public)
- 🔍 Advanced property search and filtering
- 📅 Interactive date picker for bookings
- ⭐ Rating and review system
- 💝 Wishlist functionality
- 👤 User profile management
- 📱 Fully responsive design

### Admin Dashboard (Private)
- 📊 Dashboard with key statistics
- 🏠 Property management (Create, Read, Update, Delete)
- 📋 Booking management and tracking
- 👥 User management and verification
- 📈 Analytics and revenue reports
- 🔐 Role-based access control

## 🔒 Security Features

- JWT-based authentication with expiration
- Password hashing with bcryptjs (10 rounds)
- SQL injection prevention via prepared statements
- CORS protection for API endpoints
- Server-side input validation
- Environment variable management
- Admin-only route protection

## 📊 Database Schema

### Main Tables
- **users** - User accounts and profiles (guest/host/admin)
- **properties** - Rental property listings
- **bookings** - Reservation records
- **reviews** - User reviews and ratings
- **payments** - Payment transaction records

### Key Features
- Foreign key relationships
- Automatic timestamps (created_at, updated_at)
- Indexing on frequently queried fields
- FULLTEXT search on property titles/descriptions

See [ARCHITECTURE.md](ARCHITECTURE.md#-database-schema) for detailed schema.

## 🔑 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/admin-login` | Admin login |
| GET | `/api/auth/verify` | Verify JWT token |

### Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Get all properties |
| GET | `/api/properties/:id` | Get property details |
| POST | `/api/properties` | Create property (auth) |
| PUT | `/api/properties/:id` | Update property (owner/admin) |
| DELETE | `/api/properties/:id` | Delete property (owner/admin) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/:id` | Get booking details |
| PUT | `/api/bookings/:id` | Update booking status |
| DELETE | `/api/bookings/:id` | Cancel booking |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reviews` | Post review |
| GET | `/api/reviews/property/:id` | Get property reviews |
| DELETE | `/api/reviews/:id` | Delete review |

See [ARCHITECTURE.md](ARCHITECTURE.md#-api-endpoints) for complete API documentation.

## 🛠️ Development Phases

- [ ] Phase 1: Setup & Infrastructure
- [ ] Phase 2: Client Frontend - Public Interface
- [ ] Phase 3: Backend APIs & Database Integration
- [ ] Phase 4: Admin Dashboard
- [ ] Phase 5: Enhanced Features (Payments, Email, etc.)
- [ ] Phase 6: Testing & Optimization
- [ ] Phase 7: Production Deployment

## 👥 Team Roles

### Frontend Developer
- Implements client-side HTML, CSS, JavaScript
- Creates responsive design elements
- Integrates with REST API endpoints
- Optimizes UI/UX for different devices

### Backend Developer
- Builds Express.js REST APIs
- Implements business logic and validation
- Manages authentication/authorization
- Database query optimization

### Database Administrator
- Designs normalized database schema
- Optimizes queries and indexes
- Manages backups and recovery
- Performance monitoring

### DevOps Engineer
- Configures production environment
- Sets up CI/CD pipelines
- Manages deployment and monitoring
- Handles security and SSL/TLS

## 📝 Environment Variables

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=airbnb_clone
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

# Admin Configuration
ADMIN_EMAIL=admin@airbnb.com
ADMIN_PASSWORD=admin123

# Frontend URLs
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:3000/admin
```

## 🚨 Common Issues & Solutions

### MySQL Connection Failed
```bash
# Ensure MySQL is running
mysql -u root -p

# Check credentials in .env file
# Verify database exists: SHOW DATABASES;
```

### Port 3000 Already in Use
```bash
# Change PORT in .env file, or
# Kill the process using the port
lsof -ti:3000 | xargs kill -9
```

### Cannot Find Module 'mysql2'
```bash
# Reinstall dependencies
npm install mysql2
```

## 📦 Dependencies

### Production Dependencies
```json
"express": "^4.18.2"
"mysql2": "^3.6.0"
"jsonwebtoken": "^9.1.0"
"bcryptjs": "^2.4.3"
"dotenv": "^16.0.3"
"cors": "^2.8.5"
"validator": "^13.9.0"
```

### Development Dependencies
```json
"nodemon": "^3.0.1"
```

## 🔄 Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] CORS properly configured for production domain
- [ ] JWT_SECRET changed to strong random string
- [ ] HTTPS/SSL certificates installed
- [ ] Database backups automated
- [ ] Error logging configured
- [ ] Rate limiting enabled
- [ ] Admin credentials changed
- [ ] Performance monitoring setup

## 💡 Design Inspiration

- **Airbnb.com** - Modern, minimalist design with focus on imagery
- **Ghana Airbnb** - Architectural patterns from regional implementation
- **User Experience** - Clean navigation, intuitive booking flow
- **Branding** - Professional yet approachable aesthetic

## 📄 File Structure Explanation

```
frontend/
├── client/          # Guest-facing public website
├── admin/           # Admin control panel

backend/
├── config/          # Database, JWT, environment config
├── routes/          # API endpoint definitions
├── controllers/     # Request handling & business logic
├── middleware/      # Auth, validation, error handling
├── models/          # Database queries
└── utils/           # Helper functions

database/
├── schema.sql       # Table definitions
└── migrations/      # Version-controlled schema changes
```

## 📞 Support & Maintenance

- Regular security patches
- Performance monitoring and optimization
- Automated database backups
- User support system
- Bug report management

## 📅 Project Timeline

This is a scalable project that can be developed incrementally. Each phase can be completed independently and integrated into the existing system.

## 📜 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Carter - Project Lead

## 🎓 Learning Resources

- Node.js Express Docs: https://expressjs.com/
- MySQL Docs: https://dev.mysql.com/doc/
- JWT Guide: https://jwt.io/introduction
- REST API Best Practices: https://restfulapi.net/

---

**Last Updated:** February 7, 2026

This architecture provides a comprehensive foundation for building a production-ready Airbnb clone application. Follow the installation guide in [SETUP.md](SETUP.md) to get started!
