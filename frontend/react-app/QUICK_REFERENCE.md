# 🎯 API Integration Quick Reference

## 🔗 Connection Points

### Components → Context & Hooks
```javascript
// In any component
import { useAuth } from '../context/AuthContext';
import { useListings } from '../hooks/useListings';

export default function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { listings, loading, error } = useListings();
  
  return (
    <div>
      {isAuthenticated && <p>Welcome, {user.name}</p>}
      {loading && <p>Loading...</p>}
      {listings.map(item => <div key={item.id}>{item.name}</div>)}
    </div>
  );
}
```

### Direct API Service Calls
```javascript
import { authService, listingService, bookingService } from '../services/api';

// Authentication
const auth = await authService.login(email, password);
const profile = await authService.getProfile();
authService.logout();

// Listings
const { data } = await listingService.getListings(location, minPrice, maxPrice);
const listing = await listingService.getListingById(id);
const newListing = await listingService.createListing(listingData);

// Bookings
const booking = await bookingService.createBooking(listingId, checkIn, checkOut, guests);
const userBookings = await bookingService.getUserBookings();
```

---

## 🏗️ File Organization

```
src/
├── App.jsx                          ← Wrap with <AuthProvider>
├── main.jsx                         ← Entry point
├── components/                      ← UI Components
│   ├── Navigation.jsx              ← Uses useAuth()
│   ├── HeroSection.jsx
│   ├── PropertyGrid.jsx            ← Uses useListings()
│   ├── PropertyCard.jsx
│   └── Footer.jsx
├── pages/                           ← Full pages
│   ├── HomePage.jsx
│   └── AuthPage.jsx                ← Uses useAuth()
├── services/                        ← API calls 🆕
│   ├── apiClient.js                ← Axios config
│   └── api.js                       ← Service methods
├── context/                         ← State management 🆕
│   └── AuthContext.jsx              ← Auth state
├── hooks/                           ← Custom hooks 🆕
│   └── useListings.js               ← Listings hook
└── styles/
    └── index.css
```

---

## 🔄 Request-Response Flow

### Sign Up Example
```
User Form Submit
    ↓
register(name, email, password)  [AuthPage.jsx]
    ↓
AuthContext.register()           [AuthContext.jsx]
    ↓
authService.register()           [api.js]
    ↓
apiClient.post('/auth/register', {...})  [apiClient.js]
    ↓
POST /api/auth/register          [Backend]
    ↓
authController.register()         [Backend]
    ↓
User.create()                     [Backend]
    ↓
INSERT into users table           [MySQL]
    ↓
Response: {token, user}           [Backend]
    ↓
localStorage.setItem('authToken', token)  [Browser]
    ↓
setUser(user)                     [AuthContext]
    ↓
Component re-renders              [React]
```

### Fetch Listings Example
```
Component Mount
    ↓
useListings()                     [useListings.js]
    ↓
useEffect runs                    [React]
    ↓
listingService.getListings()      [api.js]
    ↓
apiClient.get('/listings', {...}) [apiClient.js]
    ↓
Add Authorization header          [Interceptor]
    ↓
GET /api/listings                 [Backend]
    ↓
listingController.getListings()   [Backend]
    ↓
Property.findAll()                [Backend]
    ↓
SELECT * from properties          [MySQL]
    ↓
Response: {listings, page}        [Backend]
    ↓
setListings(data)                 [React]
    ↓
Component re-renders              [React]
```

---

## 🛡️ Security Features

### Token Management
```
🔒 Stored securely in localStorage
├─ Sent with every API request via Authorization header
├─ Automatically added by apiClient interceptor
├─ Not exposed in cookies (no CSRF)
└─ Cleared on logout or expiration
```

### Request Security
```
Each request includes:
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                      JWT Token from localStorage
```

### Error Handling
```
401 Unauthorized
    ↓
apiClient interceptor detects
    ↓
localStorage.removeItem('authToken')
    ↓
window.location.href = '/auth'
    ↓
User redirected to login
```

---

## 📝 Common Patterns

### Pattern 1: Fetch Data in Component
```javascript
import { useState, useEffect } from 'react';
import { listingService } from '../services/api';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await listingService.getListings();
        setListings(response.data.listings);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {listings.map(listing => (
        <div key={listing.id}>{listing.name}</div>
      ))}
    </div>
  );
}
```

### Pattern 2: Protected Component
```javascript
import { useAuth } from '../context/AuthContext';

export default function ProtectedComponent() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in to view this</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {/* Protected content */}
    </div>
  );
}
```

### Pattern 3: Form Submission
```javascript
import { useState } from 'react';
import { bookingService } from '../services/api';

export default function BookingForm({ listingId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await bookingService.createBooking(
        listingId,
        formData.checkIn,
        formData.checkOut,
        formData.guests
      );
      console.log('Booking created:', response.data);
      // Reset form & show success
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={formData.checkIn}
        onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
      />
      {/* More fields */}
      <button disabled={loading}>{loading ? 'Booking...' : 'Book Now'}</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
}
```

---

## 🧪 Testing with Browser DevTools

### Check Token
```
1. Open DevTools (F12)
2. Application → Local Storage
3. Look for: authToken
4. Value should be: eyJhbGciOi...
```

### Check API Request
```
1. Open DevTools (F12)
2. Network tab
3. Make API request
4. Click request name
5. Headers tab
6. Look for: Authorization: Bearer eyJhbGc...
```

### Check Response
```
1. Open DevTools (F12)
2. Network tab
3. Click request
4. Response tab
5. See JSON data from backend
```

### Console Errors
```
1. Open DevTools (F12)
2. Console tab
3. Any red errors appear here
4. Shows stack trace & line numbers
```

---

## 🚀 Deployment Checklist

### Before Deploying
- [ ] Test all auth flows (signup, login, logout)
- [ ] Test all API endpoints work
- [ ] Check for console errors
- [ ] Build React: `npm run build:react`
- [ ] Verify dist folder created
- [ ] Test production build locally

### Environment Setup
- [ ] Set JWT_SECRET in .env
- [ ] Configure database credentials
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS if needed
- [ ] Configure CORS for domain

### Deployment
- [ ] Build React: `npm run build:react`
- [ ] Push to server
- [ ] Run migrations: `mysql < schema.sql`
- [ ] Install dependencies: `npm install`
- [ ] Start server: `npm start`
- [ ] Backend serves React build on port 3000

---

## 📊 Performance Tips

1. **Use useListings hook** - Handles caching and prevents duplicate requests
2. **Lazy load components** - Use React.lazy() for code splitting
3. **Memoize expensive components** - Use React.memo()
4. **Pagination** - Don't load all listings at once
5. **Error boundaries** - Catch component errors gracefully

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Login again, token expired |
| CORS Error | Backend CORS enabled, check origin |
| API 404 | Route doesn't exist in backend |
| No listings showing | Database empty or API returning null |
| Token not sent | localStorage.getItem('authToken') returns null |
| Infinite loading | Backend not running, check port 3000 |

---

## 📚 File References

| Need | File |
|------|------|
| Auth state | `context/AuthContext.jsx` |
| API calls | `services/api.js` |
| Axios config | `services/apiClient.js` |
| Listings data | `hooks/useListings.js` |
| Global styles | `styles/index.css` |
| Main app | `App.jsx` |
| Routes | `App.jsx` |

---

## 🎓 Learning Resources

### In This Project
- [API_FLOW.md](./API_FLOW.md) - Architecture & diagrams
- [REACT_SETUP.md](./REACT_SETUP.md) - Setup guide
- [CONNECTION_SUMMARY.md](./CONNECTION_SUMMARY.md) - Quick ref
- [SETUP_COMPLETE.md](../SETUP_COMPLETE.md) - Checklist

### External Resources
- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)
- [Express API](https://expressjs.com)
- [MySQL Docs](https://dev.mysql.com)

---

**Everything is connected and ready to use! 🚀**

Start building by:
1. Running `npm run dev:full`
2. Opening http://localhost:5173
3. Testing sign up / login
4. Creating new components using the patterns above

Happy coding! ✨
