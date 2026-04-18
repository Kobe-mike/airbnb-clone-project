import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pool from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test DB connection
app.get('/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    res.json({ status: 'OK', db: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'Error', db: error.message });
  }
});

// Placeholder routes for Airbnb features
app.get('/api/listings', (req, res) => {
  res.json({ message: 'Listings endpoint - implement in routes/' });
});

app.get('/api/auth/login', (req, res) => {
  res.json({ message: 'Auth login endpoint' });
});

// Test DB schema/query
app.get('/api/test-query', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    // Get tables
    const [tables] = await connection.execute('SHOW TABLES');
    const tableNames = tables.map(t => Object.values(t)[0]);
    
    // Count rows in key tables
    const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
    const [properties] = await connection.execute('SELECT COUNT(*) as count FROM properties');
    
    connection.release();
    
    res.json({
      tables: tableNames,
      users: users[0].count,
      properties: properties[0].count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const startServer = async () => {
  try {
    // Test DB on startup
    await pool.getConnection();
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

startServer();
