import Booking from '../models/Booking.js';
import Property from '../models/Property.js';
import { createBookingSchema } from '../middleware/validate.js';

const bookingController = {
  async createBooking(req, res) {
    try {
      const { error } = createBookingSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { listingId, checkIn, checkOut, guests } = req.body;
      const userId = req.user.id;

      // Check listing exists and availability
      const property = await Property.findById(listingId);
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }

      // Simple availability check: no overlapping bookings (implement properly with query)
      const overlapping = await Booking.findOverlapping(listingId, checkIn, checkOut);
      if (overlapping.length > 0) {
        return res.status(400).json({ message: 'Property not available for selected dates' });
      }

      if (guests > property.guests) {
        return res.status(400).json({ message: 'Too many guests for this property' });
      }

      const bookingId = await Booking.create({
        listing_id: listingId,
        user_id: userId,
        check_in: checkIn,
        check_out: checkOut,
        guests,
        status: 'confirmed'
      });

      res.status(201).json({ id: bookingId, message: 'Booking created successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getUserBookings(req, res) {
    try {
      const userId = req.user.id;
      const { status, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      
      const bookings = await Booking.findByUserId(userId, { status, limit: parseInt(limit), offset });
      res.json({ bookings, page: parseInt(page), limit: parseInt(limit) });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getBookingById(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findById(parseInt(id));
      if (!booking || booking.user_id !== req.user.id) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default bookingController;
