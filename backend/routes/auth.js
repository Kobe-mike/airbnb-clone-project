import express from 'express';
import authController from '../controllers/authController.js';
import limiter from '../middleware/rateLimit.js';
import validateMiddleware from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../middleware/validate.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public routes - rate limited
router.post('/register', limiter, validateMiddleware(registerSchema), authController.register);
router.post('/login', limiter, validateMiddleware(loginSchema), authController.login);

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile);

export default router;
