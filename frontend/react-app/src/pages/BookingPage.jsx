import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import BookingPropertyCard from '../components/BookingPropertyCard';
import BookingModal from '../components/BookingModal';
import { listingService, bookingService } from '../services/api';
import '../styles/booking.css';

const PROPERTY_CATEGORIES = [
  { id: 'all', label: 'All', icon: '🏠' },
  { id: 'House', label: 'Houses', icon: '🏠' },
  { id: 'Apartment', label: 'Apartments', icon: '🏢' },
  { id: 'Condo', label: 'Condos', icon: '🏘️' },
  { id: 'Villa', label: 'Villas', icon: '👑' },
  { id: 'Cabin', label: 'Cabins', icon: '🏕️' },
  { id: 'Room', label: 'Rooms', icon: '🛏️' },
];

export default function BookingPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Load properties on mount
  useEffect(() => {
    loadProperties();
  }, []);

  // Filter properties based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProperties(properties);
    } else {
      setFilteredProperties(
        properties.filter(p => p.property_type === selectedCategory)
      );
    }
  }, [selectedCategory, properties]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await listingService.getListings('', 0, 10000, 1, 100);
      setProperties(response.data.data || []);
    } catch (err) {
      console.error('Error loading properties:', err);
      setError('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingClick = (property) => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    setSelectedProperty(property);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      await bookingService.createBooking(
        selectedProperty.id,
        bookingData.checkIn,
        bookingData.checkOut,
        bookingData.guests
      );
      setShowBookingModal(false);
      setSelectedProperty(null);
      // Show success message or redirect
      alert('Booking created successfully!');
    } catch (err) {
      console.error('Error creating booking:', err);
      alert(err.response?.data?.message || 'Failed to create booking');
    }
  };

  return (
    <div className="booking-page">
      <Navigation />

      <main className="booking-page__main">
        {/* Hero Section */}
        <section className="booking-hero">
          <div className="booking-hero__content">
            <h1 className="booking-hero__title">Find Your Dream Place</h1>
            <p className="booking-hero__subtitle">Browse our collection of premium accommodations across Ghana</p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="booking-categories">
          <div className="booking-categories__container">
            <div className="category-scroll">
              {PROPERTY_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-pill__icon">{category.icon}</span>
                  <span className="category-pill__label">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="booking-results">
          <div className="booking-results__container">
            <div className="booking-results__header">
              <h2 className="booking-results__title">
                {selectedCategory === 'all' 
                  ? `All Stays (${filteredProperties.length})`
                  : `${PROPERTY_CATEGORIES.find(c => c.id === selectedCategory)?.label} (${filteredProperties.length})`
                }
              </h2>
            </div>

            {loading && (
              <div className="booking-loading">
                <p>Loading properties...</p>
              </div>
            )}

            {error && (
              <div className="booking-error">
                <p>{error}</p>
                <button className="btn btn--primary" onClick={loadProperties}>
                  Retry
                </button>
              </div>
            )}

            {!loading && filteredProperties.length === 0 && (
              <div className="booking-empty">
                <p>No properties found in this category</p>
              </div>
            )}

            {!loading && filteredProperties.length > 0 && (
              <div className="booking-grid">
                {filteredProperties.map(property => (
                  <BookingPropertyCard
                    key={property.id}
                    property={property}
                    onBookClick={() => handleBookingClick(property)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      {showBookingModal && selectedProperty && (
        <BookingModal
          property={selectedProperty}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedProperty(null);
          }}
          onSubmit={handleBookingSubmit}
        />
      )}

      <Footer />
    </div>
  );
}
