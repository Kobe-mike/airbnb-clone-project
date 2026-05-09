import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HeroSection({ onExploreClick }) {
  const scrollCueRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = () => {
    navigate('/bookings');
  };

  return (
    <section className="hero" id="home">
      <div className="hero__left">
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <span className="hero__badge">★ 4.8 Rating — Trusted by Ghana Tourism Authority</span>
          <h1 className="hero__headline">
            Find Your Perfect Stay
            <br />
            <span>Across Ghana</span>
          </h1>
          <p className="hero__subheadline">Discover premium accommodations across Ghana, from beachfront retreats to heritage hotels</p>
          <div className="hero__buttons">
            <button className="btn btn--primary" onClick={handleScroll}>Explore Stays</button>
            <button className="btn btn--ghost" onClick={() => navigate('/auth')}>Log In</button>
          </div>
        </div>
        <div className="hero__scroll-cue" ref={scrollCueRef} onClick={handleScroll}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 5v14M5 16l7 7 7-7" stroke="currentColor" fill="none" strokeWidth="2"/>
          </svg>
        </div>
      </div>
      <BookingWidget navigate={navigate} />
    </section>
  );
}

function BookingWidget({ navigate }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/bookings');
  };

  return (
    <form className="booking-widget" onSubmit={handleSubmit}>
      <h2 className="booking-widget__title">Plan Your Visit</h2>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <select id="location" className="form-control">
          <option value="">Select city</option>
          <option value="accra">Accra</option>
          <option value="kumasi">Kumasi</option>
          <option value="cape-coast">Cape Coast</option>
          <option value="tamale">Tamale</option>
          <option value="ho">Ho</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="checkin">Check-in</label>
        <input type="date" id="checkin" className="form-control" />
      </div>
      <div className="form-group">
        <label htmlFor="checkout">Check-out</label>
        <input type="date" id="checkout" className="form-control" />
      </div>
      <div className="form-group">
        <label>Guests</label>
        <div className="guests-stepper">
          <button type="button" className="stepper-btn">−</button>
          <input type="number" id="guests" defaultValue="1" min="1" readOnly className="form-control stepper-input" />
          <button type="button" className="stepper-btn">+</button>
        </div>
      </div>
      <button type="submit" className="btn btn--primary">Search</button>
    </form>
  );
}
