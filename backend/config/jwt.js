const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET is required and must be set in environment variables.');
}

const jwtConfig = {
  secret: jwtSecret,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRE || '21d',
    algorithm: 'HS256'
  },
  verifyOptions: {
    algorithms: ['HS256']
  }
};

export default jwtConfig;
