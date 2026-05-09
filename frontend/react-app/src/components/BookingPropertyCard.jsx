import { useState } from 'react';

export default function BookingPropertyCard({ property, onBookClick }) {
  const {
    id,
    title,
    location,
    rating,
    reviews_count,
    price_per_night,
    property_type,
    bedrooms,
    bathrooms,
    max_guests,
  } = property;

  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="booking-card">
      <div className="booking-card__image-wrapper">
        <div className="booking-card__image">
          {/* Placeholder emoji based on property type */}
          {property_type === 'Villa' && '👑'}
          {property_type === 'House' && '🏠'}
          {property_type === 'Apartment' && '🏢'}
          {property_type === 'Condo' && '🏘️'}
          {property_type === 'Cabin' && '🏕️'}
          {property_type === 'Room' && '🛏️'}
        </div>
        <button
          className={`booking-card__save-btn ${isSaved ? 'saved' : ''}`}
          onClick={() => setIsSaved(!isSaved)}
          title="Save property"
        >
          ♡
        </button>
      </div>

      <div className="booking-card__content">
        <div className="booking-card__header">
          <div>
            <h3 className="booking-card__title">{title}</h3>
            <p className="booking-card__location">📍 {location}</p>
          </div>
        </div>

        <div className="booking-card__meta">
          <div className="booking-card__rating">
            {rating > 0 ? (
              <>
                <span className="rating-star">★</span>
                <span className="rating-value">{rating.toFixed(1)}</span>
                <span className="rating-count">({reviews_count} reviews)</span>
              </>
            ) : (
              <span className="rating-new">New</span>
            )}
          </div>
        </div>

        <div className="booking-card__amenities">
          <div className="amenity">
            <span className="amenity-icon">🛏️</span>
            <span className="amenity-label">{bedrooms} bed{bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="amenity">
            <span className="amenity-icon">🚿</span>
            <span className="amenity-label">{bathrooms} bath</span>
          </div>
          <div className="amenity">
            <span className="amenity-icon">👥</span>
            <span className="amenity-label">{max_guests} guest{max_guests !== 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="booking-card__footer">
          <div className="booking-card__price">
            <span className="price-amount">GHS {price_per_night}</span>
            <span className="price-period">/night</span>
          </div>
          <button
            className="btn btn--primary booking-card__book-btn"
            onClick={onBookClick}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
