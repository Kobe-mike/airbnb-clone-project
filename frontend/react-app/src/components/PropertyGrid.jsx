import { useState } from 'react';
import { useListings } from '../hooks/useListings';
import PropertyCard from './PropertyCard';

export default function PropertyGrid() {
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [page, setPage] = useState(1);
  
  const { listings, loading, error } = useListings('', priceRange.min, priceRange.max, page);

  // Fallback sample data for when no listings are available
  const sampleListings = [
    {
      id: 1,
      name: 'Luxury Beach Villa',
      location: 'Accra',
      rating: 4.8,
      price: 250,
      image: '🏖️',
      category: 'villas'
    },
    {
      id: 2,
      name: 'Heritage Hotel',
      location: 'Cape Coast',
      rating: 4.9,
      price: 180,
      image: '🏰',
      category: 'heritage'
    },
    {
      id: 3,
      name: 'Eco Lodge',
      location: 'Kumasi',
      rating: 4.7,
      price: 150,
      image: '🌿',
      category: 'eco'
    },
    {
      id: 4,
      name: 'Boutique Hotel',
      location: 'Tamale',
      rating: 4.6,
      price: 120,
      image: '🏨',
      category: 'rooms'
    },
    {
      id: 5,
      name: 'Beachfront Chalet',
      location: 'Ho',
      rating: 4.8,
      price: 200,
      image: '⛱️',
      category: 'chalets'
    },
    {
      id: 6,
      name: 'Mountain Resort',
      location: 'Ashanti',
      rating: 4.7,
      price: 160,
      image: '⛰️',
      category: 'villas'
    }
  ];

  // Use API listings if available, otherwise use sample data
  const displayListings = listings && listings.length > 0 ? listings : sampleListings;

  return (
    <section className="property-grid-section">
      <h2 className="section-title">Featured Accommodations</h2>
      
      {error && (
        <div style={{ 
          textAlign: 'center', 
          padding: '1rem', 
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderRadius: '8px',
          marginBottom: '2rem',
          color: '#D4AF37'
        }}>
          Note: Using sample data. {error}
        </div>
      )}
      
      <div className="filters-section">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'rooms' ? 'active' : ''}`}
          onClick={() => setFilter('rooms')}
        >
          Rooms
        </button>
        <button 
          className={`filter-btn ${filter === 'villas' ? 'active' : ''}`}
          onClick={() => setFilter('villas')}
        >
          Villas
        </button>
        <button 
          className={`filter-btn ${filter === 'chalets' ? 'active' : ''}`}
          onClick={() => setFilter('chalets')}
        >
          Chalets
        </button>
        <button 
          className={`filter-btn ${filter === 'eco' ? 'active' : ''}`}
          onClick={() => setFilter('eco')}
        >
          Eco Lodges
        </button>
        <button 
          className={`filter-btn ${filter === 'heritage' ? 'active' : ''}`}
          onClick={() => setFilter('heritage')}
        >
          Heritage
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#D4AF37' }}>Loading accommodations...</p>
        </div>
      )}

      {!loading && (
        <div className="property-grid">
          {displayListings.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
}
