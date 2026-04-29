# 🔗 API Connection Summary - Complete Flow

## ✅ What's Connected

Your React app is now **fully connected** to your Express backend with MySQL database. Here's what's working:

### Authentication
✅ User sign up → Stores in MySQL → Returns JWT token  
✅ User login → Verifies credentials → Returns JWT token  
✅ Token stored in browser localStorage  
✅ Token automatically sent with every API request  
✅ Expired token = auto redirect to login  
✅ User name displayed in navbar when logged in

### Listings
✅ Fetch properties from database  
✅ Filter by location & price  
✅ Pagination support  
✅ Fallback to sample data if DB empty

### Bookings
✅ Ready for booking creation  
✅ User can view their bookings  
✅ Check availability before booking

---

## 🏗️ Architecture Overview

```
┌─────────────────────┐
│  React Components   │  ← User sees this
│  (Home, Auth, etc)  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Context & Hooks     │  ← Manages state
│ (AuthContext,       │    useListings
│  useListings)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ API Services        │  ← Makes API calls
│ (authService,       │    (auth, listings,
│  listingService,    │     bookingService)
│  bookingService)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ API Client          │  ← Axios with
│ (apiClient.js)      │    interceptors
│                     │    & token handling
└──────────┬──────────┘
           │
           ▼
        HTTP/CORS
           │
           ▼
┌─────────────────────┐
│ Express Backend     │  ← Processes requests
│ (Node.js)           │    (routes, controllers,
│                     │     models)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ MySQL Database      │  ← Stores data
│ (users, properties, │    (users,
│  bookings)          │     properties,
│                     │     bookings)
└─────────────────────┘
```

---

## 📁 New Files Created

### API Layer (Services)
```
src/services/
├── apiClient.js          # Axios instance
│                        # - Base URL setup
│                        # - Request interceptor (adds token)
│                        # - Response interceptor (handles 401)
│
└── api.js               # API service methods
                         # - authService (register, login, logout)
                         # - listingService (get, create, update)
                         # - bookingService (create, get)
```

### State Management
```
src/context/
└── AuthContext.jsx      # Authentication context
                         # - Manages user & token state
                         # - Provides useAuth() hook
                         # - Handles login/register/logout
```

### Custom Hooks
```
src/hooks/
└── useListings.js       # Listings data hook
                         # - Fetches listings on mount
                         # - Handles loading/error states
                         # - Supports filters & pagination
```

---

## 🔄 Data Flow Examples

### 1️⃣ User Registers

```
User fills form & submits
    ↓
AuthPage calls: register(name, email, password)
    ↓
AuthContext.register() 
    ↓
authService.register() [api.js]
    ↓
apiClient.post('/auth/register', data)
    ↓
Backend: authController.register()
    ↓
Database: INSERT INTO users
    ↓
Return: { token: "eyJhbc...", user: {...} }
    ↓
Save token to localStorage
    ↓
Update AuthContext state
    ↓
Redirect to home
    ↓
Navigation shows "Welcome, [name]"
```

### 2️⃣ Load Properties

```
HomePage loads
    ↓
PropertyGrid component mounts
    ↓
useListings hook runs useEffect
    ↓
listingService.getListings()
    ↓
apiClient adds token to header
    ↓
apiClient.get('/listings?...params')
    ↓
Backend: listingController.getListings()
    ↓
Database: SELECT * FROM properties
    ↓
Return: { listings: [...], page: 1 }
    ↓
setListings(data)
    ↓
Components re-render with property cards
```

### 3️⃣ Make Booking (Protected)

```
User clicks "Book Now" on property
    ↓
BookingForm collects: checkIn, checkOut, guests
    ↓
bookingService.createBooking(listingId, dates, guests)
    ↓
apiClient adds Authorization header
    ↓
apiClient.post('/bookings', data)
    ↓
Backend: authMiddleware verifies token
    ↓
Backend: bookingController.createBooking()
    ↓
Check availability in database
    ↓
Database: INSERT INTO bookings
    ↓
Return: { id: 123, message: "Success" }
    ↓
Show confirmation to user
```

---

## 🔐 Token Management

### How It Works

1. **User logs in**
   - Backend generates JWT token
   - Token sent to React app

2. **Token stored**
   - Saved in localStorage as `authToken`
   - Persists even after page refresh

3. **Every request gets token**
   - apiClient interceptor adds: `Authorization: Bearer <token>`
   - Sent automatically with every API call

4. **Token expires?**
   - Backend returns 401 Unauthorized
   - apiClient interceptor detects this
   - Clears token from localStorage
   - Redirects user to login page

5. **User logs out**
   - Manually clear token
   - Clear localStorage
   - Clear user state
   - Show login button again

### Token Format (JWT)
```
Header.Payload.Signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwi...
```

---

## 📊 Component Connection Map

```
App.jsx (wrapped with AuthProvider)
│
├── HomePage
│   ├── Navigation (uses useAuth)
│   ├── HeroSection
│   ├── PropertyGrid (uses useListings)
│   │   └── PropertyCard (multiple)
│   └── Footer
│
└── AuthPage (uses useAuth)
    ├── Sign In Form → authService.login()
    └── Sign Up Form → authService.register()
```

---

## 🧪 How to Test

### Test 1: Sign Up & Check Token

1. Go to http://localhost:5173
2. Click "Log In"
3. Switch to "Sign Up"
4. Fill form and submit
5. ✅ Should redirect to home
6. Open DevTools (F12) → Application → Local Storage
7. ✅ Should see `authToken` with JWT value

### Test 2: Check Network Requests

1. Open DevTools → Network tab
2. Go to http://localhost:5173
3. Filter by "XHR"
4. Should see:
   - ✅ GET /api/listings (when page loads)
   - ✅ POST /api/auth/register or login (when you submit auth form)

### Test 3: Check Request Headers

1. Open DevTools → Network
2. Make any API request
3. Click on the request
4. Go to Request Headers
5. ✅ Should see: `Authorization: Bearer eyJhbc...`

### Test 4: Logout & Check

1. Click "Log Out" (when logged in)
2. ✅ Token removed from localStorage
3. ✅ Navigation shows "Log In" button again

---

## 🚀 Ready to Build Upon

Your foundation is set! You can now:

### Add Booking Page
```javascript
// Create BookingPage component
import { bookingService } from '../services/api';

const handleBooking = async (listingId, dates) => {
  const response = await bookingService.createBooking(
    listingId, 
    dates.checkIn, 
    dates.checkOut, 
    guests
  );
  // Show confirmation
};
```

### Add User Profile
```javascript
// Create ProfilePage component
import { authService } from '../services/api';

const getProfile = async () => {
  const response = await authService.getProfile();
  setProfile(response.data.user);
};
```

### Add Host Listings
```javascript
// Create HostDashboard component
import { listingService } from '../services/api';

const createListing = async (listingData) => {
  const response = await listingService.createListing(listingData);
  // Show confirmation
};
```

### Any Pattern to Follow

**When you need data from backend:**

1. Check if service exists in `api.js`
2. If not, add it:
   ```javascript
   export const serviceService = {
     getMethod: (param) => 
       apiClient.get(`/endpoint`, { params: { param } })
   };
   ```

3. In component:
   ```javascript
   import { serviceService } from '../services/api';
   
   const [data, setData] = useState(null);
   
   useEffect(() => {
     const fetchData = async () => {
       const response = await serviceService.getMethod(value);
       setData(response.data);
     };
     fetchData();
   }, []);
   ```

---

## 📚 Documentation Files

- **[API_FLOW.md](./API_FLOW.md)** - Detailed architecture & flow diagrams
- **[REACT_SETUP.md](./REACT_SETUP.md)** - Quick start & testing guide
- **[README.md](./README.md)** - Project overview

---

## 🎯 Next Steps

1. ✅ React installed & connected
2. ✅ API layer working
3. ✅ Auth flow implemented
4. ✅ Listings loading from DB
5. ⬜ Add booking functionality
6. ⬜ Add user dashboard
7. ⬜ Add host features
8. ⬜ Deploy to production

---

## 💡 Quick Reference

### Running the App
```bash
# Development (both frontend & backend)
npm run dev:full

# Or separately
npm run dev              # Backend on :3000
cd frontend/react-app && npm run dev  # Frontend on :5173
```

### Building for Production
```bash
npm run build:react
npm start
# Backend serves both API + React on :3000
```

### Common API Calls
```javascript
// Auth
import { authService } from './services/api';
await authService.register(name, email, password);
await authService.login(email, password);
await authService.getProfile();

// Listings  
import { listingService } from './services/api';
await listingService.getListings(location, minPrice, maxPrice);
await listingService.getListingById(id);
await listingService.createListing(data);

// Bookings
import { bookingService } from './services/api';
await bookingService.createBooking(listingId, checkIn, checkOut, guests);
await bookingService.getUserBookings();
```

---

## 🎓 Architecture You Now Have

```
MySQL/Express/React/Node Stack (MERN without Mongo)
           ↓
    Full-stack JavaScript
           ↓
    API-driven architecture
           ↓
    Token-based authentication
           ↓
    Scalable & maintainable
```

Everything is set up for **production-grade development**! 🚀

**Any questions about the flow or need to add more features? Just ask!**
