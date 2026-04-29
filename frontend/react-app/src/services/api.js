import apiClient from './apiClient';

// ============ AUTH SERVICES ============
export const authService = {
  register: (name, email, password) =>
    apiClient.post('/auth/register', { name, email, password }),
  
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  
  getProfile: () =>
    apiClient.get('/auth/profile'),
  
  logout: () => {
    localStorage.removeItem('authToken');
  }
};

// ============ LISTINGS SERVICES ============
export const listingService = {
  // Get all listings with optional filters
  getListings: (location = '', minPrice = 0, maxPrice = 10000, page = 1, limit = 10) =>
    apiClient.get('/listings', {
      params: { location, minPrice, maxPrice, page, limit }
    }),
  
  // Get single listing
  getListingById: (id) =>
    apiClient.get(`/listings/${id}`),
  
  // Create new listing (host only)
  createListing: (listingData) =>
    apiClient.post('/listings', listingData),
  
  // Update listing
  updateListing: (id, listingData) =>
    apiClient.put(`/listings/${id}`, listingData),
  
  // Delete listing
  deleteListing: (id) =>
    apiClient.delete(`/listings/${id}`)
};

// ============ BOOKINGS SERVICES ============
export const bookingService = {
  // Create booking
  createBooking: (listingId, checkIn, checkOut, guests) =>
    apiClient.post('/bookings', {
      listingId,
      checkIn,
      checkOut,
      guests
    }),
  
  // Get user's bookings
  getUserBookings: (status = '', page = 1, limit = 10) =>
    apiClient.get('/bookings', {
      params: { status, page, limit }
    }),
  
  // Get specific booking
  getBookingById: (id) =>
    apiClient.get(`/bookings/${id}`)
};
