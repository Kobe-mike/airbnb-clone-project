import { useState, useEffect } from 'react';

export default function BookingModal({ property, onClose, onSubmit }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Set minimum check-in date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCheckIn(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!checkIn || !checkOut) {
      setError('Please select check-in and check-out dates');
      return;
    }

    if (guests < 1 || guests > property.max_guests) {
      setError(`Please select between 1 and ${property.max_guests} guests`);
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError('Check-out date must be after check-in date');
      return;
    }

    try {
      setLoading(true);
      await onSubmit({
        checkIn,
        checkOut,
        guests: parseInt(guests),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate number of nights and total price
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * property.price_per_night;

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={e => e.stopPropagation()}>
        <button className="booking-modal__close" onClick={onClose}>✕</button>

        <div className="booking-modal__header">
          <div className="booking-modal__property">
            <div className="booking-modal__property-emoji">
              {property.property_type === 'Villa' && '👑'}
              {property.property_type === 'House' && '🏠'}
              {property.property_type === 'Apartment' && '🏢'}
              {property.property_type === 'Condo' && '🏘️'}
              {property.property_type === 'Cabin' && '🏕️'}
              {property.property_type === 'Room' && '🛏️'}
            </div>
            <div>
              <h3 className="booking-modal__property-title">{property.title}</h3>
              <p className="booking-modal__property-location">📍 {property.location}</p>
            </div>
          </div>
          <div className="booking-modal__price-preview">
            <div className="price-item">
              <span>GHS {property.price_per_night}/night</span>
            </div>
          </div>
        </div>

        <form className="booking-modal__form" onSubmit={handleSubmit}>
          {error && <div className="booking-modal__error">{error}</div>}

          <div className="form-section">
            <h4 className="form-section__title">Your Stay</h4>

            <div className="form-group">
              <label htmlFor="checkIn">Check-in</label>
              <input
                type="date"
                id="checkIn"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="checkOut">Check-out</label>
              <input
                type="date"
                id="checkOut"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <div className="guests-input-group">
                <button
                  type="button"
                  className="guests-btn"
                  onClick={() => guests > 1 && setGuests(guests - 1)}
                >
                  −
                </button>
                <input
                  type="number"
                  id="guests"
                  value={guests}
                  onChange={e => {
                    const val = Math.min(property.max_guests, Math.max(1, parseInt(e.target.value) || 1));
                    setGuests(val);
                  }}
                  min="1"
                  max={property.max_guests}
                  className="form-control guests-input"
                  readOnly
                />
                <button
                  type="button"
                  className="guests-btn"
                  onClick={() => guests < property.max_guests && setGuests(guests + 1)}
                >
                  +
                </button>
              </div>
              <p className="form-hint">Max {property.max_guests} guests</p>
            </div>
          </div>

          {/* Price Breakdown */}
          {nights > 0 && (
            <div className="form-section">
              <h4 className="form-section__title">Price Breakdown</h4>
              <div className="price-breakdown">
                <div className="price-row">
                  <span>GHS {property.price_per_night} × {nights} night{nights !== 1 ? 's' : ''}</span>
                  <span>GHS {(property.price_per_night * nights).toFixed(2)}</span>
                </div>
                <div className="price-row price-row--total">
                  <span>Total (GHS)</span>
                  <span>GHS {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn--primary btn--large booking-modal__submit"
            disabled={loading || nights === 0}
          >
            {loading ? 'Creating booking...' : 'Confirm Booking'}
          </button>
        </form>

        <div className="booking-modal__info">
          <p className="info-text">
            💡 You won't be charged until the host accepts your booking.
          </p>
        </div>
      </div>
    </div>
  );
}
