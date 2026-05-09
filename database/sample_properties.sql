-- Sample Data for Booking Page Testing
-- Insert these properties to test the booking page

-- Clear existing data (optional)
-- DELETE FROM bookings;
-- DELETE FROM properties;

-- Insert sample properties
INSERT INTO properties (title, description, location, price_per_night, property_type, bedrooms, bathrooms, max_guests, owner_id, rating, reviews_count, availability_status)
VALUES 
-- Villas
('Luxury Beachfront Villa', 'Stunning beachfront villa with private pool and ocean views', 'Accra', 850, 'Villa', 5, 4, 10, 1, 4.9, 42, 'Available'),
('Modern Villa with Garden', 'Contemporary villa set in landscaped gardens', 'Cape Coast', 650, 'Villa', 4, 3, 8, 1, 4.7, 28, 'Available'),
('Coastal Escape Villa', 'Exclusive waterfront villa with private beach access', 'Ho', 750, 'Villa', 4, 3, 8, 1, 4.8, 35, 'Available'),

-- Apartments
('Downtown Modern Apartment', 'Sleek city apartment in prime location', 'Accra', 350, 'Apartment', 2, 1, 4, 1, 4.6, 18, 'Available'),
('Cozy Studio Apartment', 'Comfortable studio with kitchenette', 'Kumasi', 200, 'Apartment', 1, 1, 2, 1, 4.4, 12, 'Available'),
('Luxury Penthouse', 'High-rise penthouse with city views', 'Accra', 550, 'Apartment', 3, 2, 6, 1, 4.8, 31, 'Available'),

-- Houses
('Heritage Colonial House', 'Restored colonial-era mansion with period features', 'Cape Coast', 500, 'House', 4, 2, 8, 1, 4.9, 28, 'Available'),
('Family Home with Yard', 'Spacious family house with large garden', 'Kumasi', 400, 'House', 4, 2, 8, 1, 4.7, 22, 'Available'),
('Beachfront Family House', 'Large family house steps from the beach', 'Accra', 600, 'House', 5, 3, 10, 1, 4.8, 36, 'Available'),

-- Cabins
('Mountain Retreat Cabin', 'Secluded cabin in the hills with forest views', 'Ashanti', 300, 'Cabin', 3, 1, 6, 1, 4.6, 15, 'Available'),
('Eco-Friendly Cabin', 'Sustainable cabin with natural materials', 'Tamale', 250, 'Cabin', 2, 1, 4, 1, 4.5, 20, 'Available'),

-- Rooms
('Luxury Master Suite', 'Spacious room with ensuite bathroom', 'Accra', 150, 'Room', 1, 1, 2, 1, 4.7, 24, 'Available'),
('Cozy Guest Room', 'Intimate room in boutique guesthouse', 'Cape Coast', 100, 'Room', 1, 1, 1, 1, 4.5, 14, 'Available'),
('Premium Double Room', 'Well-appointed room with premium amenities', 'Kumasi', 120, 'Room', 1, 1, 2, 1, 4.6, 19, 'Available'),

-- Condos
('Modern Condo with Terrace', 'Contemporary condo with outdoor space', 'Accra', 450, 'Condo', 2, 2, 5, 1, 4.7, 26, 'Available'),
('Waterfront Condo', 'Condo with water views and balcony', 'Ho', 400, 'Condo', 2, 1, 4, 1, 4.6, 20, 'Available');

-- Sample bookings (optional - only if you want to test booking retrieval)
-- INSERT INTO bookings (property_id, user_id, check_in, check_out, number_of_guests, status, total_price)
-- VALUES 
-- (1, 1, '2026-05-15', '2026-05-20', 4, 'Confirmed', 4250),
-- (5, 1, '2026-06-01', '2026-06-05', 2, 'Confirmed', 800);
