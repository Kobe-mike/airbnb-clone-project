import rateLimit from 'express-rate-limit';

const baseRateLimitConfig = {
  standardHeaders: true,
  legacyHeaders: false
};

const limiter = rateLimit({
  ...baseRateLimitConfig,
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    message: 'Too many requests from this IP, please try again later.'
  },
  skip: (req) => req.path === '/health'
});

export const authLimiter = rateLimit({
  ...baseRateLimitConfig,
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: 'Too many authentication attempts. Please try again later.'
  }
});

export default limiter;
