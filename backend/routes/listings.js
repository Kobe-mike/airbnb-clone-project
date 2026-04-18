import express from 'express';
import listingController from '../controllers/listingController.js';
import authMiddleware from '../middleware/auth.js';
import limiter from '../middleware/rateLimit.js';
import validateMiddleware from '../middleware/validate.js';
import { createListingSchema, updateListingSchema } from '../middleware/validate.js';

const router = express.Router();

// Public routes - browse listings
router.get('/', limiter, listingController.getListings);
router.get('/:id', limiter, listingController.getListingById);

// Protected routes - host actions
router.post('/', authMiddleware, limiter, validateMiddleware(createListingSchema), listingController.createListing);
router.put('/:id', authMiddleware, limiter, validateMiddleware(updateListingSchema), listingController.updateListing);
router.delete('/:id', authMiddleware, limiter, listingController.deleteListing);

export default router;
