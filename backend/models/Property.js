import pool from '../config/database.js';

const Property = {
  async findAll({ location, minPrice, maxPrice, limit = 10, offset = 0 } = {}) {
    try {
      let query = `
        SELECT id, title, description, location, price, bedrooms, bathrooms, guests, owner_id,
               created_at
        FROM properties 
        WHERE 1=1
      `;
      const params = [];

      if (location) {
        query += ' AND location LIKE ?';
        params.push(`%${location}%`);
      }
      if (minPrice) {
        query += ' AND price >= ?';
        params.push(minPrice);
      }
      if (maxPrice) {
        query += ' AND price <= ?';
        params.push(maxPrice);
      }

      query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.push(parseInt(limit), parseInt(offset));

      const [rows] = await pool.execute(query, params);
      return rows;
    } catch (error) {
      throw new Error(`Properties fetch error: ${error.message}`);
    }
  },

  async findById(id) {
    try {
      const [rows] = await pool.execute(
        `SELECT id, title, description, location, price, bedrooms, bathrooms, guests, owner_id,
                created_at
         FROM properties WHERE id = ?`,
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Property fetch error: ${error.message}`);
    }
  },

  async create(data, ownerId) {
    try {
      const [result] = await pool.execute(
        `INSERT INTO properties (title, description, location, price, bedrooms, bathrooms, guests, owner_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.title, data.description, data.location, data.price, data.bedrooms, data.bathrooms, data.guests, ownerId]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Property creation error: ${error.message}`);
    }
  },

  async update(id, data, ownerId) {
    try {
      const property = await this.findById(id);
      if (!property || property.owner_id !== ownerId) {
        throw new Error('Property not found or access denied');
      }

      const fields = Object.keys(data);
      const values = fields.map(key => data[key]);
      values.push(id);

      const setClause = fields.map(field => `${field} = ?`).join(', ');
      const [result] = await pool.execute(
        `UPDATE properties SET ${setClause} WHERE id = ?`,
        values
      );

      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Property update error: ${error.message}`);
    }
  },

  async delete(id, ownerId) {
    try {
      const property = await this.findById(id);
      if (!property || property.owner_id !== ownerId) {
        throw new Error('Property not found or access denied');
      }

      const [result] = await pool.execute(
        'DELETE FROM properties WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Property delete error: ${error.message}`);
    }
  }
};

export default Property;
