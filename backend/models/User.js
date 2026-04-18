import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = {
  async findById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, email FROM users WHERE id = ?',
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
        'SELECT id, name, email, password_hash FROM users WHERE email = ?',
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
      const [result] = await pool.execute(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, hashedPassword]
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
