const jwtConfig = {
  secret: process.env.JWT_SECRET,
  options: {
    expiresIn: process.env.JWT_EXPIRE || '21d',
    algorithm: 'HS256'
  }
};

export default jwtConfig;
