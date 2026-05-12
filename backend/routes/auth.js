import express from 'express';
import authController from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimit.js';
import validateMiddleware from '../middleware/validate.js';
import { registerSchema, loginSchema } from '../middleware/validate.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Public routes - rate limited
router.post('/register', authLimiter, validateMiddleware(registerSchema), authController.register);
router.post('/login', authLimiter, validateMiddleware(loginSchema), authController.login);

// Protected routes
router.get('/profile', authMiddleware, authController.getProfile);

export default router;
