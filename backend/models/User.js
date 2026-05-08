import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = {
  async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, username, email, first_name, last_name FROM users WHERE id = ?',
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`User fetch error: ${error.message}`);
    }
  },

  async findByEmail(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, username, email, password FROM users WHERE email = ?',
        [email]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`User email lookup error: ${error.message}`);
    }
  },

  async create({ name, email, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      // Split name into first_name and last_name if possible
      const nameParts = name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const [result] = await pool.execute(
        'INSERT INTO users (username, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)',
        [email, email, hashedPassword, firstName, lastName]
      );
      return { id: result.insertId, name, email };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Email already exists');
      }
      throw new Error(`User creation error: ${error.message}`);
    }
  },

  async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
};

export default User;
