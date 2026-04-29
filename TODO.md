# Thorough Testing & Fixes TODO

## Current Status
- [x] Fixed duplicate Vite processes
- [x] React dev server running clean (5173)
- [x] Backend running (3000)
- [x] Identified DB schema mismatch

## Pending Steps
- [ ] 1. Fix backend/models/Property.js column names (price → price_per_night, guests → max_guests)
- [ ] 2. Check other models (Booking.js, User.js) for schema alignment
- [ ] 3. Restart backend server
- [ ] 4. Test all API endpoints (listings, auth, bookings)
- [ ] 5. Test frontend flows (HomePage listings, AuthPage)
- [ ] 6. Security vulnerability scan & fixes (bcryptjs vuln)
- [ ] 7. Update TODO with results
