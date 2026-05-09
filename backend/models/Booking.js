import pool from '../config/database.js';

const Booking = {
  async create({ listing_id, user_id, check_in, check_out, guests }) {
    try {
      // Check availability first
      const [overlapping] = await pool.execute(
        `SELECT id FROM bookings 
         WHERE property_id = ? 
         AND status != 'Cancelled'
         AND (
           ? >= check_in AND ? < check_out OR
           ? <= check_in AND ? > check_in
         )`,
        [listing_id, check_in, check_in, check_out, check_out]
      );

      if (overlapping.length > 0) {
        throw new Error('Dates not available');
      }

      const [result] = await pool.execute(
        `INSERT INTO bookings (property_id, user_id, check_in, check_out, number_of_guests, status)
         VALUES (?, ?, ?, ?, ?, 'Confirmed')`,
        [listing_id, user_id, check_in, check_out, guests]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Booking creation error: ${error.message}`);
    }
  },

  async getByUser(userId, limit = 10, offset = 0) {
    try {
      const [rows] = await pool.execute(
        `SELECT b.id, b.property_id, b.check_in, b.check_out, b.number_of_guests, b.status,
                p.title, p.location, p.price_per_night
         FROM bookings b
         JOIN properties p ON b.property_id = p.id
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
        `SELECT id, user_id, check_in, check_out, number_of_guests, status
         FROM bookings 
         WHERE property_id = ?
         ORDER BY check_in ASC
         LIMIT ? OFFSET ?`,
        [listingId, parseInt(limit), parseInt(offset)]
      );
      return rows;
    } catch (error) {
      throw new Error(`Listing bookings error: ${error.message}`);
    }
  },

  async findById(id) {
    try {
      const [rows] = await pool.execute(
        `SELECT id, property_id, user_id, check_in, check_out, number_of_guests, status, total_price, created_at
         FROM bookings 
         WHERE id = ?`,
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Booking fetch error: ${error.message}`);
    }
  },

  async findByUserId(userId, { status, limit = 10, offset = 0 } = {}) {
    try {
      let query = `
        SELECT b.id, b.property_id, b.check_in, b.check_out, b.number_of_guests, b.status,
               p.title, p.location, p.price_per_night
        FROM bookings b
        JOIN properties p ON b.property_id = p.id
        WHERE b.user_id = ?
      `;
      const params = [userId];

      if (status) {
        query += ' AND b.status = ?';
        params.push(status);
      }

      query += ' ORDER BY b.created_at DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));

      const [rows] = await pool.execute(query, params);
      return rows;
    } catch (error) {
      throw new Error(`User bookings error: ${error.message}`);
    }
  }
};

export default Booking;
