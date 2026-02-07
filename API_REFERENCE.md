# API Reference Documentation

## Base URL
```
Development: http://localhost:3000/api
Production: https://yourdomain.com/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Response Format
All endpoints return JSON in the following format:

### Success Response (200, 201)
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "id": 1,
    "field": "value"
  }
}
```

### Error Response (400, 401, 403, 404, 500)
```json
{
  "success": false,
  "message": "Error description",
  "error": "error_code"
}
```

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

Register a new user account.

**Request:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_admin": false,
    "created_at": "2026-02-07T12:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (400):**
```json
{
  "success": false,
  "message": "Email already exists",
  "error": "EMAIL_EXISTS"
}
```

---

### 2. User Login
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "is_admin": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid email or password",
  "error": "INVALID_CREDENTIALS"
}
```

---

### 3. Admin Login
**POST** `/auth/admin-login`

Authenticate admin user.

**Request:**
```json
{
  "email": "admin@airbnb.com",
  "password": "admin_password"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "user": {
    "id": 1,
    "email": "admin@airbnb.com",
    "is_admin": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (403):**
```json
{
  "success": false,
  "message": "User is not an admin",
  "error": "NOT_ADMIN"
}
```

---

### 4. Verify Token
**GET** `/auth/verify`

Verify JWT token validity.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "is_admin": false
  }
}
```

**Error (401):**
```json
{
  "success": false,
  "message": "Invalid or expired token",
  "error": "INVALID_TOKEN"
}
```

---

## 🏠 Properties Endpoints

### 1. Get All Properties
**GET** `/properties?page=1&limit=12&location=&minPrice=&maxPrice=`

Get paginated list of properties.

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 12)
- `location` (optional) - Filter by location
- `minPrice` (optional) - Minimum price per night
- `maxPrice` (optional) - Maximum price per night
- `type` (optional) - Property type (House, Apartment, etc.)
- `bedrooms` (optional) - Number of bedrooms

**Response (200):**
```json
{
  "success": true,
  "count": 48,
  "totalPages": 4,
  "currentPage": 1,
  "properties": [
    {
      "id": 1,
      "title": "Luxury Apartment in Accra",
      "owner_id": 5,
      "location": "Accra, Ghana",
      "property_type": "Apartment",
      "bedrooms": 2,
      "bathrooms": 1,
      "max_guests": 4,
      "price_per_night": 150,
      "availability_status": "Available",
      "amenities": ["WiFi", "AC", "Kitchen"],
      "images": ["url1", "url2"],
      "rating": 4.8,
      "reviews_count": 45,
      "created_at": "2026-01-15T10:30:00Z"
    }
  ]
}
```

---

### 2. Search Properties
**GET** `/properties/search?location=&checkIn=&checkOut=&guests=`

Search properties by criteria.

**Query Parameters:**
- `location` (required) - Location to search
- `checkIn` (required) - Check-in date (YYYY-MM-DD)
- `checkOut` (required) - Check-out date (YYYY-MM-DD)
- `guests` (optional) - Number of guests

**Response (200):**
```json
{
  "success": true,
  "count": 12,
  "properties": [
    {
      "id": 1,
      "title": "Luxury Apartment in Accra",
      "price_per_night": 150,
      "availability_status": "Available",
      "images": ["url1"],
      "rating": 4.8,
      "reviews_count": 45
    }
  ]
}
```

---

### 3. Get Property Details
**GET** `/properties/:id`

Get full details of a specific property.

**Response (200):**
```json
{
  "success": true,
  "property": {
    "id": 1,
    "title": "Luxury Apartment in Accra",
    "description": "Beautiful 2-bedroom apartment...",
    "owner_id": 5,
    "owner": {
      "id": 5,
      "username": "host_john",
      "profile_picture": "url",
      "bio": "Experienced host"
    },
    "location": "Accra, Ghana",
    "latitude": 5.6037,
    "longitude": -0.1870,
    "property_type": "Apartment",
    "bedrooms": 2,
    "bathrooms": 1,
    "max_guests": 4,
    "price_per_night": 150,
    "amenities": ["WiFi", "AC", "Kitchen", "TV"],
    "images": ["url1", "url2", "url3"],
    "rating": 4.8,
    "reviews_count": 45,
    "reviews": [
      {
        "id": 1,
        "user": "john_guest",
        "rating": 5,
        "comment": "Excellent place!",
        "created_at": "2026-02-01T10:00:00Z"
      }
    ],
    "created_at": "2026-01-15T10:30:00Z"
  }
}
```

---

### 4. Create Property
**POST** `/properties`

Create a new property listing.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "Luxury Apartment in Accra",
  "description": "Beautiful 2-bedroom apartment...",
  "location": "Accra, Ghana",
  "latitude": 5.6037,
  "longitude": -0.1870,
  "property_type": "Apartment",
  "bedrooms": 2,
  "bathrooms": 1,
  "max_guests": 4,
  "price_per_night": 150,
  "amenities": ["WiFi", "AC", "Kitchen"],
  "images": ["url1", "url2"]
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Property created successfully",
  "property": {
    "id": 1,
    "title": "Luxury Apartment in Accra",
    "owner_id": 5,
    "created_at": "2026-02-07T12:00:00Z"
  }
}
```

---

### 5. Update Property
**PUT** `/properties/:id`

Update property details.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "Updated title",
  "price_per_night": 160,
  "availability_status": "Unavailable"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Property updated successfully",
  "property": {
    "id": 1,
    "title": "Updated title",
    "price_per_night": 160,
    "updated_at": "2026-02-07T12:00:00Z"
  }
}
```

---

### 6. Delete Property
**DELETE** `/properties/:id`

Delete a property.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

---

## 📅 Bookings Endpoints

### 1. Create Booking
**POST** `/bookings`

Create a new booking.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "property_id": 1,
  "check_in": "2026-03-15",
  "check_out": "2026-03-20",
  "number_of_guests": 2,
  "special_requests": "High floor preferred"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "id": 101,
    "property_id": 1,
    "user_id": 5,
    "check_in": "2026-03-15",
    "check_out": "2026-03-20",
    "status": "Pending",
    "total_price": 750,
    "number_of_guests": 2,
    "created_at": "2026-02-07T12:00:00Z"
  }
}
```

---

### 2. Get User Bookings
**GET** `/bookings/user/:userId`

Get all bookings for a user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "bookings": [
    {
      "id": 101,
      "property": {
        "id": 1,
        "title": "Luxury Apartment",
        "images": ["url1"]
      },
      "check_in": "2026-03-15",
      "check_out": "2026-03-20",
      "status": "Confirmed",
      "total_price": 750,
      "created_at": "2026-02-07T12:00:00Z"
    }
  ]
}
```

---

### 3. Get Booking Details
**GET** `/bookings/:id`

Get details of a specific booking.

**Response (200):**
```json
{
  "success": true,
  "booking": {
    "id": 101,
    "property_id": 1,
    "user_id": 5,
    "check_in": "2026-03-15",
    "check_out": "2026-03-20",
    "status": "Confirmed",
    "total_price": 750,
    "number_of_guests": 2,
    "special_requests": "High floor preferred",
    "created_at": "2026-02-07T12:00:00Z",
    "property": {
      "id": 1,
      "title": "Luxury Apartment"
    },
    "user": {
      "id": 5,
      "username": "john_guest",
      "email": "john@example.com"
    }
  }
}
```

---

### 4. Update Booking Status
**PUT** `/bookings/:id`

Update booking status (admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request:**
```json
{
  "status": "Confirmed"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Booking updated successfully",
  "booking": {
    "id": 101,
    "status": "Confirmed",
    "updated_at": "2026-02-07T12:00:00Z"
  }
}
```

---

### 5. Cancel Booking
**DELETE** `/bookings/:id`

Cancel a booking.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Booking cancelled successfully"
}
```

---

## ⭐ Reviews Endpoints

### 1. Create Review
**POST** `/reviews`

Post a review for a property.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "property_id": 1,
  "booking_id": 101,
  "rating": 5,
  "title": "Excellent property!",
  "comment": "Amazing experience, will come back again!"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Review posted successfully",
  "review": {
    "id": 1,
    "property_id": 1,
    "user_id": 5,
    "rating": 5,
    "title": "Excellent property!",
    "comment": "Amazing experience...",
    "created_at": "2026-02-07T12:00:00Z"
  }
}
```

---

### 2. Get Property Reviews
**GET** `/reviews/property/:propertyId`

Get all reviews for a property.

**Query Parameters:**
- `limit` (optional) - Number of reviews to return (default: 10)
- `sort` (optional) - Sort by (recent, helpful, rating)

**Response (200):**
```json
{
  "success": true,
  "count": 45,
  "average_rating": 4.8,
  "reviews": [
    {
      "id": 1,
      "user": {
        "id": 5,
        "username": "john_guest",
        "profile_picture": "url"
      },
      "rating": 5,
      "title": "Excellent property!",
      "comment": "Amazing experience...",
      "created_at": "2026-02-01T10:00:00Z"
    }
  ]
}
```

---

### 3. Delete Review
**DELETE** `/reviews/:id`

Delete your own review.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

---

## 💳 Payments Endpoints

### 1. Process Payment
**POST** `/payments`

Process payment for a booking.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "booking_id": 101,
  "payment_method": "Credit Card",
  "amount": 750,
  "card_token": "tok_visa"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Payment processed successfully",
  "payment": {
    "id": 1,
    "booking_id": 101,
    "amount": 750,
    "status": "Completed",
    "transaction_id": "txn_1234567890",
    "created_at": "2026-02-07T12:00:00Z"
  }
}
```

---

### 2. Get Payment Status
**GET** `/payments/:id`

Get payment details.

**Response (200):**
```json
{
  "success": true,
  "payment": {
    "id": 1,
    "booking_id": 101,
    "amount": 750,
    "status": "Completed",
    "payment_method": "Credit Card",
    "transaction_id": "txn_1234567890",
    "created_at": "2026-02-07T12:00:00Z"
  }
}
```

---

## 👥 Users Endpoints

### 1. Get User Profile
**GET** `/users/:id`

Get user profile information.

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 5,
    "username": "john_doe",
    "email": "john@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+233123456789",
    "profile_picture": "url",
    "bio": "I love traveling!",
    "is_verified": true,
    "created_at": "2026-01-15T10:30:00Z"
  }
}
```

---

### 2. Update User Profile
**PUT** `/users/:id`

Update your profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "first_name": "John",
  "bio": "Updated bio",
  "phone": "+233123456789"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "id": 5,
    "first_name": "John",
    "bio": "Updated bio",
    "updated_at": "2026-02-07T12:00:00Z"
  }
}
```

---

### 3. Get All Users (Admin Only)
**GET** `/users?page=1&limit=20&role=&status=`

Get all users (admin endpoint).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page` (optional) - Page number
- `limit` (optional) - Items per page
- `role` (optional) - Filter by role
- `status` (optional) - verified/unverified

**Response (200):**
```json
{
  "success": true,
  "count": 150,
  "users": [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "is_verified": true,
      "is_admin": false,
      "created_at": "2026-01-15T10:30:00Z"
    }
  ]
}
```

---

## Error Codes

| Code | HTTP | Meaning |
|------|------|---------|
| INVALID_INPUT | 400 | Validation error |
| UNAUTHORIZED | 401 | Missing/invalid token |
| FORBIDDEN | 403 | Access denied |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Resource conflict (duplicate) |
| INTERNAL_ERROR | 500 | Server error |
| EMAIL_EXISTS | 400 | Email already registered |
| INVALID_CREDENTIALS | 401 | Wrong email/password |
| NOT_ADMIN | 403 | User is not admin |
| INVALID_TOKEN | 401 | Invalid/expired token |

---

## Rate Limiting

API endpoints are rate-limited:
- **Public endpoints**: 100 requests per hour
- **Authenticated endpoints**: 1000 requests per hour
- **Admin endpoints**: 5000 requests per hour

When rate limited, you receive:
```
HTTP 429 Too Many Requests
Retry-After: 3600 (seconds)
```

---

## Testing with cURL

```bash
# Register
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'

# Get properties
curl -X GET "http://localhost:3000/api/properties?limit=5" \
  -H "Content-Type: application/json"

# Get property with auth
curl -X GET http://localhost:3000/api/properties/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

---

This API reference provides complete documentation for integrating with the Airbnb Clone backend.
