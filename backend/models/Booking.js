import pool from '../config/database.js';

const Booking = {
  async create({ listingId, userId, checkIn, checkOut, guests }) {
    try {
      // Check availability first
      const overlapping = await pool.execute(
        `SELECT id FROM bookings 
         WHERE listing_id = ? 
         AND status != 'cancelled'
         AND (
           ? >= check_in AND ? < check_out OR
           ? <= check_in AND ? > check_in
         )`,
        [listingId, checkIn, checkIn, checkOut, checkOut]
      );

      if (overlapping[0].length > 0) {
        throw new Error('Dates not available');
      }

      const [result] = await pool.execute(
        `INSERT INTO bookings (listing_id, user_id, check_in, check_out, guests, status)
         VALUES (?, ?, ?, ?, ?, 'confirmed')`,
        [listingId, userId, checkIn, checkOut, guests]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Booking creation error: ${error.message}`);
    }
  },

  async getByUser(userId, limit = 10, offset = 0) {
    try {
      const [rows] = await pool.execute(
        `SELECT b.id, b.listing_id, b.check_in, b.check_out, b.guests, b.status,
                p.title, p.location, p.price
         FROM bookings b
         JOIN properties p ON b.listing_id = p.id
         WHERE b.user_id = ?
         ORDER BY b.created_at DESC
         LIMIT ? OFFSET ?`,
        [userId, parseInt(limit), parseInt(offset)]
      );
      return rows;
    } catch (error) {
      throw new Error(`User bookings error: ${error.message}`);
    }
  },

  async getByListing(listingId, limit = 10, offset = 0) {
    try {
      const [rows] = await pool.execute(
        `SELECT id, user_id, check_in, check_out, guests, status
         FROM bookings 
         WHERE listing_id = ?
         ORDER BY check_in ASC
         LIMIT ? OFFSET ?`,
        [listingId, parseInt(limit), parseInt(offset)]
      );
      return rows;
    } catch (error) {
      throw new Error(`Listing bookings error: ${error.message}`);
    }
  }
};

export default Booking;
