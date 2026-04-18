import Joi from 'joi';

// Auth schemas
export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Listing schemas
export const createListingSchema = Joi.object({
  title: Joi.string().min(10).max(100).required(),
  description: Joi.string().min(20).required(),
  location: Joi.string().required(),
  price: Joi.number().positive().required(),
  bedrooms: Joi.number().integer().min(1).required(),
  bathrooms: Joi.number().integer().min(1).required(),
  guests: Joi.number().integer().min(1).required()
});

export const updateListingSchema = createListingSchema.keys({
  title: Joi.string().min(10).max(100),
  price: Joi.number().positive()
}).min(1); // At least one field

// Booking schemas
export const createBookingSchema = Joi.object({
  listingId: Joi.number().integer().positive().required(),
  checkIn: Joi.date().iso().required(),
  checkOut: Joi.date().iso().greater(Joi.ref('checkIn')).required(),
  guests: Joi.number().integer().min(1).required()
});

const validateMiddleware = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export default validateMiddleware;
