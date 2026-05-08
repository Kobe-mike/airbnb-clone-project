# Quick Start Guide - API Connected React App

## Installation & Setup

### 1. Install All Dependencies

```bash
# Install backend dependencies (already done)
npm install

# Install React dependencies
cd frontend/react-app
npm install
cd ../..
```

### 2. Set Up Database

Make sure MySQL is running and your `.env` file is configured:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=airbnb_clone
JWT_SECRET=your_jwt_secret
PORT=3000
```

Run migrations (if not done):
```bash
mysql -u root -p < database/schema.sql
```

### 3. Run Full Stack

**Option A: Run frontend and backend together**
```bash
npm run dev:full
```
This opens:
- Backend API: `http://localhost:3000`
- React app: `http://localhost:5173` (hot reload enabled)

**Option B: Run separately (recommended for development)**

Terminal 1 - Backend:
```bash
npm run dev
```
Backend will be on `http://localhost:3000`

Terminal 2 - React:
```bash
cd frontend/react-app
npm run dev
```
React will be on `http://localhost:5173`

---

## What's Connected ✅

### Authentication
- ✅ Sign Up form connects to POST /api/auth/register
- ✅ Sign In form connects to POST /api/auth/login
- ✅ Token stored in localStorage
- ✅ Token automatically added to all requests
- ✅ Auto-redirect on 401 (expired token)
- ✅ User welcome message in navigation bar
- ✅ Logout button clears token

### Listings
- ✅ PropertyGrid fetches from GET /api/listings
- ✅ Shows loading state while fetching
- ✅ Shows sample data as fallback
- ✅ Ready for real data from backend

### Navigation
- ✅ Login/Logout based on auth state
- ✅ Shows user name when logged in
- ✅ Mobile menu drawer

---

## Testing the API

### Test 1: User Registration

1. Open `http://localhost:5173`
2. Click "Log In" button
3. Switch to "Sign Up" mode
4. Fill the form:
   - Name: John Doe
   - Email: john@example.com
   - Password: Test123!
5. Click "Sign Up"
6. ✅ Should show success message
7. ✅ Token saved to localStorage
8. ✅ Redirected to home
9. ✅ Navigation shows "Welcome, John Doe!"

### Test 2: User Login

1. Click "Log Out"
2. Click "Log In"
3. Fill the form:
   - Email: john@example.com
   - Password: Test123!
4. Click "Sign In"
5. ✅ Should show success message
6. ✅ Token saved to localStorage
7. ✅ Redirected to home
8. ✅ Navigation shows "Welcome, John Doe!"

### Test 3: Check Token in Browser

1. Open DevTools (F12)
2. Go to Application tab
3. Click Local Storage
4. Select `http://localhost:5173`
5. ✅ Should see `authToken` key with JWT token

### Test 4: Listings Data

1. Open DevTools Network tab
2. Reload home page
3. Filter by "listings"
4. ✅ Should see GET request to `/api/listings`
5. ✅ Response shows listings array

### Test 5: Token in Headers

1. Open DevTools Network tab
2. Find any API request (auth, listings, etc.)
3. Click on request
4. Go to Headers tab
5. Scroll to Request Headers
6. ✅ Should see `Authorization: Bearer <token>`

---

## File Changes Summary

### Created Files (API Layer)

| File | Purpose |
|------|---------|
| `src/services/apiClient.js` | Axios instance with interceptors |
| `src/services/api.js` | API service methods (auth, listings, bookings) |
| `src/context/AuthContext.jsx` | Auth state management & useAuth hook |
| `src/hooks/useListings.js` | Custom hook for listings |
| `src/context/` | New directory for context |
| `src/hooks/` | New directory for hooks |
| `src/services/` | New directory for services |

### Modified Components

| File | Changes |
|------|---------|
| `src/pages/AuthPage.jsx` | Now uses useAuth() context |
| `src/pages/HomePage.jsx` | No changes needed |
| `src/components/Navigation.jsx` | Shows user name & logout when logged in |
| `src/components/PropertyGrid.jsx` | Fetches real listings with useListings() |
| `src/components/PropertyCard.jsx` | No changes needed |
| `src/components/HeroSection.jsx` | No changes needed |
| `src/App.jsx` | Wrapped with AuthProvider |

### Backend Changes

| File | Changes |
|------|---------|
| `backend/server.js` | Added React dist serving & SPA fallback |
| `package.json` | Added dev scripts & concurrently |

---

## How to Make Further Changes

### Add a New Component That Uses API

Example: Create a user profile page

```javascript
// src/pages/ProfilePage.jsx
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { authService } from '../services/api';

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProfile = async () => {
      try {
        const response = await authService.getProfile();
        setProfile(response.data.user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [isAuthenticated]);

  if (!isAuthenticated) return <p>Please log in</p>;

  return (
    <div>
      <h1>{profile?.name}</h1>
      <p>{profile?.email}</p>
    </div>
  );
}
```

Then add to routing in `App.jsx`:
```javascript
<Route path="/profile" element={<ProfilePage />} />
```

### Add a New API Service

Example: Adding messages service

```javascript
// In src/services/api.js
export const messageService = {
  sendMessage: (recipientId, content) =>
    apiClient.post('/messages', { recipientId, content }),
  
  getMessages: (conversationId) =>
    apiClient.get(`/messages/${conversationId}`)
};
```

Then use in component:
```javascript
import { messageService } from '../services/api';

// In component
const response = await messageService.sendMessage(userId, 'Hello!');
```

---

## Troubleshooting

### Issue: "Cannot find module 'axios'"
```bash
cd frontend/react-app
npm install axios
```

### Issue: "Failed to fetch listings" error
1. Check backend is running: `npm run dev`
2. Check backend logs for errors
3. Check if MySQL is running
4. Check API endpoint in Network tab

### Issue: "Cannot POST /api/auth/register"
- Backend is not running
- OR wrong port (should be 3000)
- OR route not found in backend

### Issue: Token not persisting
- Check localStorage is not disabled
- Check browser privacy settings
- Try clearing localStorage and logging in again

### Issue: CORS errors
- Already configured in backend
- Make sure backend is running on port 3000
- Check vite.config.js proxy settings

---

## Next Features to Build

### Priority 1 (User-facing)
- [ ] Booking creation form
- [ ] User bookings page
- [ ] Property detail page
- [ ] Search filters (location, price, dates)

### Priority 2 (Host features)
- [ ] Host dashboard
- [ ] Create/edit listings
- [ ] View bookings as host
- [ ] Upload property images

### Priority 3 (Enhancement)
- [ ] Reviews & ratings
- [ ] Favorites/wishlist
- [ ] Payment integration
- [ ] Email notifications

---

## Environment Variables

Create `.env` in project root:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=airbnb_clone
JWT_SECRET=your_super_secret_key_min_32_chars
PORT=3000
NODE_ENV=development
```

---

## Production Build

### Build for Production

```bash
# Build React app
npm run build:react

# Build completes, output in frontend/react-app/dist/

# Backend will serve React build on production
npm start
# Server runs on http://localhost:3000
```

### Deploy Process

1. Build React: `npm run build:react`
2. Commit dist folder to git (or build on server)
3. Start backend: `npm start`
4. Backend automatically serves React build
5. All API routes work as configured

---

## Architecture Summary

```
User Browser (React App on :5173)
        ↓
Vite Dev Server (proxies /api to :3000)
        ↓
Express Backend API (Node on :3000)
        ↓
MySQL Database
```

In Production:
```
User Browser
    ↓
Express Backend (serves React build + API)
    ↓
MySQL Database
```

---

## Support

For detailed API flow documentation, see [API_FLOW.md](./API_FLOW.md)

For more info on components, see [README.md](./README.md)
