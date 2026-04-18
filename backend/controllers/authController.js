import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.js';
import { registerSchema, loginSchema } from '../middleware/validate.js';

const authController = {
  async register(req, res) {
    try {
      const { error } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { name, email, password } = req.body;
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = await User.create({ name, email, password });
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        jwtConfig.secret,
        jwtConfig.options
      );

      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: newUser.id, name, email }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user || !(await User.comparePassword(password, user.password_hash))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        jwtConfig.secret,
        jwtConfig.options
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export default authController;
