import express from 'express';
import bookingController from '../controllers/bookingController.js';
import authMiddleware from '../middleware/auth.js';
import limiter from '../middleware/rateLimit.js';
import validateMiddleware from '../middleware/validate.js';
import { createBookingSchema } from '../middleware/validate.js';

const router = express.Router({ mergeParams: true });

// All routes protected
router.use(authMiddleware);

// Create booking
router.post('/', limiter, validateMiddleware(createBookingSchema), bookingController.createBooking);

// Get user's bookings
router.get('/', limiter, bookingController.getUserBookings);

// Get specific booking
router.get('/:id', limiter, bookingController.getBookingById);

export default router;
