# Task: Test and confirm if schema.sql imported to MySQL

## Plan Steps:
- [x] Information gathered from files (database.js, schema.sql, server.js, package.json)
- [x] Fix backend/server.js to CommonJS syntax
- [x] Fix middleware/static in backend/server.js (express.json() etc.)
- [x] Fix server.js DB pool access (pool.getConnection())
- [ ] User: Stop current npm start (Ctrl+C)
- [x] Add SHOW TABLES check to /api/health endpoint
- [ ] User: Stop current npm start (Ctrl+C)
- [ ] Run `npm start` and check startup logs for DB connection
- [ ] Visit http://localhost:3000/api/health to confirm schemaImported
- [ ] Test /api/health endpoint
- [ ] Confirm tables exist (users, properties, bookings, reviews, payments)
- [ ] Mark complete
