import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch reviews from API
  useEffect(() => {
    fetchReviews();
  }, []);

  // Filter reviews
  useEffect(() => {
    let filtered = reviews;

    if (ratingFilter !== 'all') {
      filtered = filtered.filter(r => r.rating === parseInt(ratingFilter));
    }

    if (searchTerm) {
      filtered = filtered.filter(r =>
        r.property_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.reviewer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.comment?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  }, [reviews, ratingFilter, searchTerm]);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reviews');
      const data = await response.json();
      setReviews(data.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Sample data for development
      setReviews([
        {
          id: 1,
          property_title: 'Luxury Apartment Downtown',
          reviewer_name: 'John Doe',
          rating: 5,
          title: 'Excellent stay!',
          comment: 'Amazing property with great amenities. The host was very responsive and helpful. Highly recommended!',
          created_at: '2024-05-20',
        },
        {
          id: 2,
          property_title: 'Beach House',
          reviewer_name: 'Jane Smith',
          rating: 4,
          title: 'Good location',
          comment: 'Nice property near the beach. A bit noisy at night but overall good experience.',
          created_at: '2024-06-08',
        },
        {
          id: 3,
          property_title: 'Cozy Apartment',
          reviewer_name: 'Robert Johnson',
          rating: 5,
          title: 'Perfect for couples',
          comment: 'Perfect little apartment. Very clean and well-maintained. Felt like home.',
          created_at: '2024-04-25',
        },
        {
          id: 4,
          property_title: 'Modern Villa',
          reviewer_name: 'Maria Garcia',
          rating: 3,
          title: 'Average',
          comment: 'The property was okay. Could use some updates. Check-in process was confusing.',
          created_at: '2024-05-12',
        },
        {
          id: 5,
          property_title: 'Downtown Condo',
          reviewer_name: 'David Chen',
          rating: 4,
          title: 'Great value',
          comment: 'Good value for money. Clean and comfortable. Would stay again.',
          created_at: '2024-06-22',
        },
      ]);
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await fetch(`http://localhost:3000/api/reviews/${id}`, { method: 'DELETE' });
        fetchReviews();
      } catch (error) {
        console.error('Error deleting review:', error);
        setReviews(prev => prev.filter(r => r.id !== id));
      }
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Reviews</h1>
          <p>Manage customer reviews and ratings</p>
        </div>

        {/* Search and Filter */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by property, reviewer name, or comment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Rating Filter */}
        <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className="filter-btn"
            onClick={() => setRatingFilter('all')}
            style={ratingFilter === 'all' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            All Ratings
          </button>
          {[5, 4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              className="filter-btn"
              onClick={() => setRatingFilter(rating.toString())}
              style={ratingFilter === rating.toString() ? {
                background: 'var(--primary-color)',
                color: 'white'
              } : {
                background: 'white',
                color: 'var(--primary-color)',
                border: '2px solid var(--primary-color)'
              }}
            >
              {renderStars(rating)}
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="card">
          <div className="card-header">
            <h2>Customer Reviews ({filteredReviews.length})</h2>
          </div>

          {filteredReviews.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    padding: '20px',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    backgroundColor: '#fafafa',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 4px', color: 'var(--text-primary)' }}>
                        {review.title}
                      </h3>
                      <p style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <strong>{review.property_title}</strong> • {review.reviewer_name}
                      </p>
                      <div style={{ marginBottom: '8px' }}>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '16px',
                          color: '#ffa500',
                          letterSpacing: '2px'
                        }}>
                          {renderStars(review.rating)}
                        </span>
                        <span style={{ marginLeft: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                          ({review.rating}/5)
                        </span>
                      </div>
                    </div>
                    <div className="action-icons">
                      <button
                        className="icon-btn delete"
                        onClick={() => handleDeleteReview(review.id)}
                        title="Delete review"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <p style={{
                    margin: '0',
                    fontSize: '13px',
                    color: 'var(--text-primary)',
                    lineHeight: '1.6',
                    marginBottom: '8px'
                  }}>
                    {review.comment}
                  </p>

                  <p style={{
                    margin: '0',
                    fontSize: '12px',
                    color: 'var(--text-light)'
                  }}>
                    📅 {review.created_at}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              No reviews found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminReviewsPage;
