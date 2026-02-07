# Technical Architecture Diagram

## System Architecture Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                           END USERS                                   │
├──────────────────────────────────────────────────────────────────────┤
│     Guest/Client              │              Admin User              │
│   (Public Access)             │           (Restricted)              │
└────────────────┬──────────────┴────────────────┬─────────────────────┘
                 │                               │
        ┌────────▼─────────┐          ┌──────────▼──────────┐
        │                  │          │                     │
        │  CLIENT APP      │          │  ADMIN DASHBOARD    │
        │  (HTML/CSS/JS)   │          │  (HTML/CSS/JS)      │
        │                  │          │                     │
        │ - Search         │          │ - Property Mgmt     │
        │ - Filter         │          │ - Booking Mgmt      │
        │ - Booking        │          │ - User Mgmt         │
        │ - Review         │          │ - Analytics         │
        │ - Profile        │          │ - Revenue Reports   │
        └────────┬─────────┘          └──────────┬──────────┘
                 │                               │
                 └───────────┬──────────────────┘
                             │
        ┌────────────────────▼────────────────────┐
        │                                         │
        │     EXPRESS.JS REST API SERVER         │
        │         (Backend - Node.js)            │
        │                                         │
        ├─────┬─────────┬───────┬──────┬────────┤
        │     │         │       │      │        │
        │ Auth│Property │Booking│Review│Payment│
        │Routes│ Routes│ Routes│Routes│Routes │
        │     │         │       │      │        │
        └─────┴─────────┴───────┴──────┴────────┘
                       │
        ┌──────────────▼──────────────┐
        │   MIDDLEWARE & VALIDATION   │
        │ - JWT Authentication        │
        │ - Error Handling            │
        │ - Input Validation          │
        │ - CORS Policy               │
        └──────────────┬──────────────┘
                       │
        ┌──────────────▼──────────────┐
        │                              │
        │     MYSQL DATABASE           │
        │    (Connection Pool)         │
        │                              │
        ├──────┬──────┬──────┬────────┤
        │Users │Props │Books │Reviews │
        │      │erties│ings  │        │
        │      │      │      │Payments│
        │      │      │      │        │
        └──────┴──────┴──────┴────────┘
```

---

## Data Flow Diagram

### User Registration & Login Flow
```
┌────────────────┐
│  User Input    │
│ (Email/Pass)   │
└────────┬───────┘
         │
         ▼
┌────────────────┐
│ Client Sends   │
│ POST /register │
└────────┬───────┘
         │
         ▼
┌────────────────────────────┐
│ Backend Validation         │
│ - Check email not exists   │
│ - Validate password format │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│ Hash Password              │
│ bcryptjs (10 rounds)       │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│ Save to Database           │
│ INSERT INTO users...       │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│ Generate JWT Token         │
│ Payload: {id, email, role} │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│ Send Response              │
│ {token, user_data}         │
└────────┬───────────────────┘
         │
         ▼
┌────────────────────────────┐
│ Client Stores Token        │
│ localStorage.token         │
└────────────────────────────┘
```

### Property Booking Flow
```
┌─────────────┐
│   Search    │
│ Properties  │
└────────┬────┘
         │
         ▼
┌──────────────────────────────┐
│ GET /api/properties?filters  │
│ (location, dates, price)     │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Database Query               │
│ SELECT * FROM properties     │
│ WHERE conditions match       │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Return Filtered Results      │
│ Display on Client            │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Click Property               │
│ View Details                 │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ GET /api/properties/:id      │
│ Get full property details    │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Check Availability           │
│ Validate dates not booked    │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Book Property                │
│ POST /api/bookings           │
│ {property_id, dates, guests} │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Validate Booking             │
│ - Check availability         │
│ - Calculate price            │
│ - Validate guest count       │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Save Booking to Database     │
│ INSERT INTO bookings...      │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Process Payment              │
│ POST /api/payments           │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Confirm Booking              │
│ Update booking status        │
│ Return confirmation          │
└──────────────────────────────┘
```

---

## Admin Dashboard Architecture

```
┌─────────────────────────────────────────────────────┐
│            ADMIN DASHBOARD                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────────────────────────────────────┐  │
│  │           Dashboard Overview                 │  │
│  │  - Total Revenue                             │  │
│  │  - Active Bookings                           │  │
│  │  - Total Properties                          │  │
│  │  - New Users This Month                      │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌──────────────┐ ┌──────────────┐                 │
│  │  Properties  │ │   Bookings   │                 │
│  │  Management  │ │  Management  │                 │
│  ├──────────────┤ ├──────────────┤                 │
│  │- List        │ │- View all    │                 │
│  │- Add         │ │- Confirm     │                 │
│  │- Edit        │ │- Cancel      │                 │
│  │- Delete      │ │- Reschedule  │                 │
│  │- Upload IMG  │ │- Track PIN   │                 │
│  └──────────────┘ └──────────────┘                 │
│                                                     │
│  ┌──────────────┐ ┌──────────────┐                 │
│  │    Users     │ │  Analytics   │                 │
│  │  Management  │ │  & Reports   │                 │
│  ├──────────────┤ ├──────────────┤                 │
│  │- List        │ │- Revenue     │                 │
│  │- Verify      │ │  Charts      │                 │
│  │- Suspend     │ │- Booking     │                 │
│  │- Activity    │ │  Trends      │                 │
│  │- Messages    │ │- User Stats  │                 │
│  └──────────────┘ └──────────────┘                 │
│                                                     │
└─────────────────────────────────────────────────────┘
         │
         ▼
    REST API Calls
    (All authenticated with JWT + admin role check)
         │
         ▼
    Express Backend Routes
         │
         ▼
    MySQL Database
```

---

## Authentication & Authorization Flow

```
┌──────────────────────────────────────┐
│      User Login Request              │
│  POST /api/auth/login                │
│  {email, password, is_admin: true}   │
└──────────────┬───────────────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │ Validate Input           │
    │ - Email format           │
    │ - Password not empty     │
    └──────────────┬───────────┘
                   │
                   ▼
    ┌──────────────────────────┐
    │ Query Database           │
    │ SELECT * FROM users      │
    │ WHERE email = ?          │
    └──────────────┬───────────┘
                   │
                   ▼
    ┌──────────────────────────┐
    │ User Found?              │
    └──────────┬───────────────┘
               │
       ┌───────┴───────┐
       │ No            │ Yes
       │               │
       ▼               ▼
    Error         ┌─────────────────┐
    401           │ Compare Password│
                  │ bcryptjs.compare│
                  └────────┬────────┘
                           │
                       ┌───┴───┐
                       │No  │Yes
                       │    │
                       ▼    ▼
                    Err   ┌──────────┐
                    401   │Verify    │
                          │int admin?│
                          └────┬─────┘
                               │
                           ┌───┴───┐
                           │No │Yes
                           │   │
                           ▼   ▼
                        Err  ┌──────────────────┐
                        403  │Generate JWT      │
                             │Payload: {        │
                             │  id, email,      │
                             │  is_admin: true  │
                             │}                 │
                             └────────┬─────────┘
                                      │
                                      ▼
                              ┌──────────────────┐
                              │Return Token      │
                              │Set in localStorage
                              │Redirect to admin │
                              └──────────────────┘

After Login:
┌───────────────────────────────────────────┐
│ Each API Request from Admin               │
├───────────────────────────────────────────┤
│ Header: Authorization: Bearer <token>     │
│                                           │
│ Middleware Verification:                  │
│ 1. Extract token from header              │
│ 2. Verify signature (JWT_SECRET)          │
│ 3. Decode payload                         │
│ 4. Check is_admin = true                  │
│ 5. Check token not expired                │
│                                           │
│ ✓ Valid → Allow access to route          │
│ ✗ Invalid → Return 401 Unauthorized      │
│            OR 403 Forbidden               │
└───────────────────────────────────────────┘
```

---

## Frontend Component Hierarchy (Client)

```
index.html (Root)
│
├── Header
│   ├── Logo
│   ├── Navigation
│   │   ├── Search Bar
│   │   ├── Filter Options
│   │   └── User Menu
│   │       ├── Login
│   │       ├── Sign Up
│   │       ├── Profile (if logged in)
│   │       └── Wishlist
│   └── Auth Popup
│
├── Hero Section
│   ├── Background Image
│   ├── Search Widget
│   │   ├── Location Input
│   │   ├── Check-in Date
│   │   ├── Check-out Date
│   │   └── Guests Count
│   └── CTA Buttons
│
├── Featured Properties
│   └── Property Card (Grid)
│       ├── Image Carousel
│       ├── Rating Stars
│       ├── Property Name
│       ├── Location
│       ├── Price/Night
│       └── Wishlist Button
│
├── Search Results
│   ├── Filters Sidebar
│   │   ├── Price Range
│   │   ├── Property Type
│   │   ├── Amenities
│   │   └── Rating
│   ├── Properties Grid
│   ├── Map View
│   └── Pagination
│
├── Property Detail Page
│   ├── Image Gallery
│   ├── Property Info
│   │   ├── Title
│   │   ├── Description
│   │   ├── Amenities List
│   │   ├── Host Info
│   │   └── Address
│   ├── Reviews Section
│   ├── Calendar (Availability)
│   ├── Price Breakdown
│   └── Booking Form
│
├── User Profile
│   ├── Avatar & Bio
│   ├── My Bookings
│   ├── My Wishlist
│   ├── Account Settings
│   └── Logout
│
└── Footer
    ├── Links
    ├── Social Media
    └── Copyright
```

---

## Frontend Component Hierarchy (Admin)

```
admin/index.html (Root)
│
├── Admin Header
│   ├── Logo
│   ├── Admin Badge
│   ├── Notifications
│   └── Admin Menu
│       ├── Settings
│       └── Logout
│
├── Sidebar Navigation
│   ├── Dashboard
│   ├── Properties
│   ├── Bookings
│   ├── Users
│   ├── Reviews
│   ├── Payments
│   ├── Analytics
│   └── Settings
│
└── Main Content Area
    │
    ├── Dashboard Page
    │   ├── Stats Cards
    │   │   ├── Revenue Card
    │   │   ├── Bookings Card
    │   │   ├── Properties Card
    │   │   └── Users Card
    │   ├── Revenue Chart
    │   ├── Recent Bookings Table
    │   └── Popular Properties
    │
    ├── Properties Page
    │   ├── Add Property Button
    │   ├── Properties Table
    │   │   ├── ID
    │   │   ├── Name
    │   │   ├── Owner
    │   │   ├── Price
    │   │   ├── Status
    │   │   └── Actions (Edit/Delete)
    │   └── Property Form (Modal)
    │       ├── Title
    │       ├── Description
    │       ├── Location
    │       ├── Type
    │       ├── Price
    │       ├── Amenities Checklist
    │       └── Image Upload
    │
    ├── Bookings Page
    │   ├── Filter Status
    │   ├── Bookings Table
    │   │   ├── ID
    │   │   ├── Guest
    │   │   ├── Property
    │   │   ├── Dates
    │   │   ├── Status
    │   │   └── Actions
    │   └── Booking Details Modal
    │
    ├── Users Page
    │   ├── Users Table
    │   │   ├── ID
    │   │   ├── Name
    │   │   ├── Email
    │   │   ├── Status
    │   │   └── Actions (Verify/Suspend)
    │   └── User Details Modal
    │
    └── Analytics Page
        ├── Revenue Chart (Line/Bar)
        ├── Booking Trends
        ├── User Growth
        └── Top Properties
```

---

## Request/Response Examples

### Register User
```
REQUEST:
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe"
}

RESPONSE (201 Created):
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Search Properties
```
REQUEST:
GET /api/properties/search?location=Ghana&checkIn=2026-02-15&checkOut=2026-02-20&guests=2&maxPrice=200

RESPONSE (200 OK):
{
  "success": true,
  "count": 12,
  "properties": [
    {
      "id": 1,
      "title": "Luxury Apartment in Accra",
      "location": "Accra, Ghana",
      "bedrooms": 2,
      "bathrooms": 1,
      "max_guests": 4,
      "price_per_night": 150,
      "images": [...],
      "rating": 4.8,
      "reviews_count": 45
    },
    ...
  ]
}
```

### Create Booking
```
REQUEST:
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "property_id": 1,
  "check_in": "2026-02-15",
  "check_out": "2026-02-20",
  "number_of_guests": 2,
  "special_requests": "High floor preferred"
}

RESPONSE (201 Created):
{
  "success": true,
  "booking": {
    "id": 101,
    "property_id": 1,
    "user_id": 5,
    "check_in": "2026-02-15",
    "check_out": "2026-02-20",
    "status": "Pending",
    "total_price": 750,
    "created_at": "2026-02-07T12:30:00Z"
  }
}
```

---

This architecture provides a complete blueprint for building, deploying, and maintaining your Airbnb clone application.
