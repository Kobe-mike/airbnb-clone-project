# API Connection Flow & Architecture

## Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          REACT FRONTEND                             │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    React Components                          │  │
│  │  ┌──────────────────┐  ┌──────────────────┐                │  │
│  │  │  HomePage        │  │  AuthPage        │                │  │
│  │  │  - Navigation    │  │  - Sign In/Up    │                │  │
│  │  │  - HeroSection   │  │  - useAuth()     │                │  │
│  │  │  - PropertyGrid  │  │  - Redirects     │                │  │
│  │  │  - Footer        │  └──────────────────┘                │  │
│  │  └──────────────────┘                                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                            ↓ ↑                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │               Context & Hooks Layer                          │  │
│  │  ┌─────────────────────────┐  ┌─────────────────────────┐   │  │
│  │  │  AuthContext            │  │  useListings Hook       │   │  │
│  │  │  - Manages auth state   │  │  - Fetches listings     │   │  │
│  │  │  - Stores token         │  │  - Handles loading/err  │   │  │
│  │  │  - User info            │  │  - Caches on mount      │   │  │
│  │  └─────────────────────────┘  └─────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                            ↓ ↑                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                Service Layer (api.js)                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │  │
│  │  │ authService  │  │ listingServ. │  │ bookingServ. │       │  │
│  │  │ - register() │  │ - get()      │  │ - create()   │       │  │
│  │  │ - login()    │  │ - getById()  │  │ - getAll()   │       │  │
│  │  │ - logout()   │  │ - create()   │  │              │       │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘       │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                            ↓ ↑                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │            API Client (apiClient.js)                         │  │
│  │  - Axios instance                                            │  │
│  │  - Base URL: /api                                            │  │
│  │  - Request interceptor: adds auth token to headers           │  │
│  │  - Response interceptor: handles 401 errors                  │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                            ↓ ↑
                         HTTP/CORS
                            ↓ ↑
┌─────────────────────────────────────────────────────────────────────┐
│                      NODE.JS/EXPRESS BACKEND                        │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    API Routes                               │  │
│  │  ┌──────────────────┐  ┌──────────────────┐                │  │
│  │  │  /api/auth       │  │  /api/listings   │                │  │
│  │  │  - register      │  │  - GET /         │                │  │
│  │  │  - login         │  │  - GET /:id      │                │  │
│  │  │  - profile       │  │  - POST /        │                │  │
│  │  └──────────────────┘  │  - PUT /:id      │                │  │
│  │                        │  - DELETE /:id   │                │  │
│  │  ┌──────────────────┐  └──────────────────┘                │  │
│  │  │  /api/bookings   │  ┌──────────────────┐                │  │
│  │  │  - POST /        │  │ MIDDLEWARE       │                │  │
│  │  │  - GET /         │  │  - authMiddleware│                │  │
│  │  │  - GET /:id      │  │  - validate      │                │  │
│  │  └──────────────────┘  │  - rateLimit     │                │  │
│  │                        └──────────────────┘                │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                            ↓ ↑                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  Controllers Layer                           │  │
│  │  ┌──────────────────────────────────────────────────────┐   │  │
│  │  │  authController    listingController   bookingCtrler │   │  │
│  │  │  - register()      - getListings()     - create()    │   │  │
│  │  │  - login()         - getById()         - getAll()    │   │  │
│  │  │  - getProfile()    - createListing()   - getOne()    │   │  │
│  │  │                    - updateListing()                 │   │  │
│  │  │                    - deleteListing()                 │   │  │
│  │  └──────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                            ↓ ↑                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   Models Layer                              │  │
│  │  ┌──────────────────┐  ┌──────────────────┐                │  │
│  │  │  User Model      │  │  Property Model  │                │  │
│  │  │  - create()      │  │  - create()      │                │  │
│  │  │  - findByEmail() │  │  - findAll()     │                │  │
│  │  │  - compare()     │  │  - findById()    │                │  │
│  │  │                  │  │  - update()      │                │  │
│  │  │  Booking Model   │  │  - delete()      │                │  │
│  │  │  - create()      │  └──────────────────┘                │  │
│  │  │  - findAll()     │                                      │  │
│  │  │  - getOverlap()  │                                      │  │
│  │  └──────────────────┘                                      │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                            ↓ ↑                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                   MySQL Database                            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │  users   │  │ properties│ │ bookings │  │ reviews  │    │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Step-by-Step Data Flow Examples

### 1. User Registration Flow

```
User fills form in AuthPage
    ↓
handleSignUp() is called
    ↓
register() from useAuth() context is called
    ↓
authService.register(name, email, password) [api.js]
    ↓
apiClient.post('/auth/register', data) [apiClient.js]
    ↓
axios adds Authorization header with token (if exists)
    ↓
HTTP POST request sent to backend
    ↓
Backend: POST /api/auth/register
    ↓
authController.register() is called
    ↓
Validates data (Joi schema)
    ↓
Hash password with bcryptjs
    ↓
Insert user into MySQL database
    ↓
Generate JWT token
    ↓
Send response: { token, user: { id, name, email } }
    ↓
apiClient receives response
    ↓
AuthContext stores token in localStorage & sets user state
    ↓
redirect to home page
    ↓
Navigation component detects isAuthenticated = true
    ↓
Shows "Welcome, [name]!" and Logout button
```

### 2. Fetching Listings Flow

```
HomePage loads (PropertyGrid component mounts)
    ↓
useListings hook is called with default params
    ↓
useEffect runs on component mount
    ↓
listingService.getListings(location, minPrice, maxPrice, page, limit)
    ↓
apiClient.get('/listings', { params: {...} })
    ↓
axios sends GET request to backend with query params
    ↓
Backend: GET /api/listings?location=...&minPrice=...
    ↓
listingController.getListings()
    ↓
Extract query params
    ↓
Property.findAll({location, minPrice, maxPrice, limit, offset})
    ↓
Execute SQL query to get properties from MySQL
    ↓
Send response: { listings: [...], page, limit }
    ↓
apiClient receives response
    ↓
setListings(response.data.listings)
    ↓
Component re-renders with listings
    ↓
PropertyCard components display each property
```

### 3. Authenticated Booking Flow

```
User clicks "View Details" on property → clicks "Book Now"
    ↓
BookingForm component collects: checkIn, checkOut, guests
    ↓
handleBooking() calls bookingService.createBooking()
    ↓
apiClient.post('/bookings', { listingId, checkIn, checkOut, guests })
    ↓
Request interceptor reads token from localStorage
    ↓
Adds: Authorization: Bearer <token>
    ↓
HTTP POST request sent
    ↓
Backend: POST /api/bookings
    ↓
authMiddleware verifies JWT token
    ↓
Extracts userId from token: req.user.id
    ↓
bookingController.createBooking()
    ↓
Validates booking data (Joi schema)
    ↓
Check property exists: Property.findById(listingId)
    ↓
Check availability: Booking.findOverlapping(dates)
    ↓
Create booking: Booking.create({ listing_id, user_id, check_in, check_out, guests })
    ↓
Insert into bookings table in MySQL
    ↓
Send response: { id, message: "Booking created successfully" }
    ↓
AuthContext remains active, user stays logged in
    ↓
Show success message to user
```

---

## File Structure

```
frontend/react-app/src/
├── services/
│   ├── apiClient.js          # Axios instance with interceptors
│   └── api.js                # Service methods for auth, listings, bookings
├── context/
│   └── AuthContext.jsx       # Auth state management with useAuth hook
├── hooks/
│   └── useListings.js        # Custom hook for fetching listings
├── components/
│   ├── Navigation.jsx        # Uses useAuth() for login/logout
│   ├── HeroSection.jsx       # Hero + booking form
│   ├── PropertyGrid.jsx      # Uses useListings() for data
│   ├── PropertyCard.jsx      # Individual property display
│   └── Footer.jsx            # Footer component
├── pages/
│   ├── HomePage.jsx          # Main page with all components
│   └── AuthPage.jsx          # Uses useAuth() for register/login
├── styles/
│   └── index.css             # Global styles
├── App.jsx                   # Wraps app with AuthProvider and Router
└── main.jsx                  # React entry point
```

---

## API Endpoints Summary

### Authentication
```
POST   /api/auth/register           # Register new user
POST   /api/auth/login              # Login user, get token
GET    /api/auth/profile            # Get current user profile (Protected)
```

### Listings
```
GET    /api/listings                # Get all listings with filters
GET    /api/listings/:id            # Get single listing
POST   /api/listings                # Create listing (Protected, Host only)
PUT    /api/listings/:id            # Update listing (Protected)
DELETE /api/listings/:id            # Delete listing (Protected)
```

### Bookings
```
POST   /api/bookings                # Create booking (Protected)
GET    /api/bookings                # Get user's bookings (Protected)
GET    /api/bookings/:id            # Get specific booking (Protected)
```

---

## Token Management

### How Authentication Works:

1. **User logs in** → Backend sends JWT token
2. **Token stored** in localStorage as `authToken`
3. **Every API request** → apiClient interceptor adds: `Authorization: Bearer <token>`
4. **Backend verifies** token in authMiddleware
5. **Token expires** → 401 response → apiClient clears token & redirects to /auth
6. **User logs out** → localStorage cleared

```javascript
// In apiClient.js interceptors
request: {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
}

response: {
  if (error.status === 401) {
    localStorage.removeItem('authToken');
    window.location.href = '/auth';
  }
}
```

---

## Example: Connecting a New Component

```javascript
// In a new component file (e.g., BookingsList.jsx)
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/api';
import { useState, useEffect } from 'react';

export function BookingsList() {
  const { isAuthenticated } = useAuth();  // Check if user is logged in
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;  // Don't fetch if not logged in

    const fetchBookings = async () => {
      try {
        const response = await bookingService.getUserBookings();
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated]);

  if (!isAuthenticated) return <p>Please log in to see your bookings</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {bookings.map(booking => (
        <div key={booking.id}>
          <h3>{booking.property_name}</h3>
          <p>Check-in: {booking.check_in}</p>
          <p>Check-out: {booking.check_out}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## Testing the API Connection

### In Development:

1. **Start backend:**
   ```bash
   npm run dev
   ```

2. **Start React (separate terminal):**
   ```bash
   cd frontend/react-app
   npm run dev
   ```

3. **Open browser:**
   - http://localhost:5173

4. **Test sign up:**
   - Fill form and submit
   - Check Network tab in DevTools
   - Should see POST /api/auth/register

5. **Test listings:**
   - Check Network tab
   - Should see GET /api/listings after page loads

6. **Check localStorage:**
   - Open DevTools → Application → Local Storage
   - Should see `authToken` after login

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Token expired or invalid. Clear localStorage & login again |
| CORS errors | Backend must have CORS enabled (already done) |
| API returns 404 | Check endpoint path matches backend routes |
| Token not sent | Check if localStorage has `authToken` key |
| Listings not showing | Check network tab → may be using sample data |
| Infinite loading | Check if backend is running on port 3000 |

---

## Next Steps

1. ✅ **API Client Setup** - Done
2. ✅ **Auth Context** - Done
3. ✅ **Component Integration** - Done
4. **Add error boundaries** - For better error handling
5. **Add loading states** - Already done
6. **Add input validation** - Enhanced form validation
7. **Add booking component** - Create booking page
8. **Add user profile page** - Manage user info
9. **Add admin panel** - Host listings management
10. **Deploy to production** - Build & deploy to server

