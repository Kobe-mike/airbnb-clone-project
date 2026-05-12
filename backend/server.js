import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/database.js';
import authRoutes from './routes/auth.js';
import listingsRoutes from './routes/listings.js';
import bookingsRoutes from './routes/bookings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (!IS_PRODUCTION) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('CORS policy: Origin not allowed'));
  }
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Serve React static files in production
const reactDistPath = path.join(__dirname, '../frontend/react-app/dist');
app.use(express.static(reactDistPath));

// Fallback to old frontend for development
app.use(express.static('frontend'));

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

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/bookings', bookingsRoutes);

// Test DB schema/query (non-production only)
if (!IS_PRODUCTION) {
  app.get('/api/test-query', async (req, res) => {
    try {
      const connection = await pool.getConnection();

      const [tables] = await connection.execute('SHOW TABLES');
      const tableNames = tables.map((t) => Object.values(t)[0]);

      const [users] = await connection.execute('SELECT COUNT(*) as count FROM users');
      const [properties] = await connection.execute('SELECT COUNT(*) as count FROM properties');

      connection.release();

      res.json({
        tables: tableNames,
        users: users[0].count,
        properties: properties[0].count
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to run diagnostic query.' });
    }
  });
}

// Serve React app for all non-API routes (SPA fallback)
app.use((req, res, next) => {
  // Only serve index.html for non-API routes
  if (!req.path.startsWith('/api')) {
    const indexPath = path.join(reactDistPath, 'index.html');
    res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(404).json({ message: 'Route not found' });
      }
    });
  } else {
    next();
  }
});

// Error handler
app.use((err, req, res, next) => {
  if (!IS_PRODUCTION) {
    console.error(err.stack);
  } else {
    console.error('Server error');
  }

  if (err.message && err.message.includes('CORS policy')) {
    return res.status(403).json({ message: 'Request origin is not allowed.' });
  }

  return res.status(500).json({ message: 'Something went wrong!' });
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
