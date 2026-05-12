import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch bookings from API
  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings based on status and search
  useEffect(() => {
    let filtered = bookings;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(b => b.status.toLowerCase() === filterStatus.toLowerCase());
    }

    if (searchTerm) {
      filtered = filtered.filter(b =>
        b.id.toString().includes(searchTerm) ||
        b.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.property_title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  }, [bookings, filterStatus, searchTerm]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/bookings');
      const data = await response.json();
      setBookings(data.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Sample data for development
      setBookings([
        {
          id: 'BK001',
          user_name: 'John Doe',
          property_title: 'Luxury Apartment Downtown',
          check_in: '2024-05-15',
          check_out: '2024-05-20',
          total_price: 750,
          status: 'Confirmed',
          number_of_guests: 4,
        },
        {
          id: 'BK002',
          user_name: 'Jane Smith',
          property_title: 'Beach House',
          check_in: '2024-06-01',
          check_out: '2024-06-08',
          total_price: 1400,
          status: 'Pending',
          number_of_guests: 6,
        },
        {
          id: 'BK003',
          user_name: 'Robert Johnson',
          property_title: 'Cozy Apartment',
          check_in: '2024-04-20',
          check_out: '2024-04-25',
          total_price: 400,
          status: 'Completed',
          number_of_guests: 2,
        },
        {
          id: 'BK004',
          user_name: 'Maria Garcia',
          property_title: 'Modern Villa',
          check_in: '2024-05-10',
          check_out: '2024-05-12',
          total_price: 500,
          status: 'Cancelled',
          number_of_guests: 5,
        },
        {
          id: 'BK005',
          user_name: 'David Chen',
          property_title: 'Downtown Condo',
          check_in: '2024-06-15',
          check_out: '2024-06-22',
          total_price: 1050,
          status: 'Pending',
          number_of_guests: 3,
        },
      ]);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-success';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:3000/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      setBookings(prev => prev.map(b =>
        b.id === bookingId ? { ...b, status: newStatus } : b
      ));
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Bookings</h1>
          <p>Manage property bookings and reservations</p>
        </div>

        {/* Search and Filter */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by booking ID, guest name, or property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
            style={filterStatus === 'all' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            All Statuses
          </button>
          <button
            className="filter-btn"
            onClick={() => setFilterStatus('pending')}
            style={filterStatus === 'pending' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            Pending
          </button>
          <button
            className="filter-btn"
            onClick={() => setFilterStatus('confirmed')}
            style={filterStatus === 'confirmed' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            Confirmed
          </button>
          <button
            className="filter-btn"
            onClick={() => setFilterStatus('completed')}
            style={filterStatus === 'completed' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            Completed
          </button>
          <button
            className="filter-btn"
            onClick={() => setFilterStatus('cancelled')}
            style={filterStatus === 'cancelled' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            Cancelled
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>All Bookings ({filteredBookings.length})</h2>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Guest Name</th>
                  <th>Property</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Guests</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="order-id">{booking.id}</td>
                      <td>{booking.user_name}</td>
                      <td className="property-name">{booking.property_title}</td>
                      <td>{booking.check_in}</td>
                      <td>{booking.check_out}</td>
                      <td>{booking.number_of_guests}</td>
                      <td className="order-amount">${booking.total_price}</td>
                      <td>
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            border: '1px solid var(--primary-color)',
                            color: 'var(--primary-color)',
                            fontWeight: '600',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td>
                        <div className="action-icons">
                          <button
                            className="icon-btn edit"
                            title="View details"
                          >
                            👁️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                      No bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminBookingsPage;
