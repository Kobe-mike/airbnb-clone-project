import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminPropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageError, setImageError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    property_type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    max_guests: 2,
    price_per_night: '',
    amenities: '',
    category_id: '',
    availability_status: 'Available',
    images: [],
  });

  // Fetch properties from API
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/listings');
      const data = await response.json();
      setProperties(data.data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Sample data for development
      setProperties([
        {
          id: 1,
          title: 'Luxury Apartment in Downtown',
          description: 'Beautiful apartment with modern amenities',
          location: 'Downtown, Ghana',
          property_type: 'Apartment',
          bedrooms: 3,
          bathrooms: 2,
          max_guests: 6,
          price_per_night: 150,
          availability_status: 'Available',
          rating: 4.8,
          reviews_count: 32,
        },
        {
          id: 2,
          title: 'Cozy House near Beach',
          description: 'Perfect for families',
          location: 'Beach Area, Ghana',
          property_type: 'House',
          bedrooms: 4,
          bathrooms: 3,
          max_guests: 8,
          price_per_night: 200,
          availability_status: 'Available',
          rating: 4.6,
          reviews_count: 18,
        },
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `http://localhost:3000/api/listings/${editingId}`
        : 'http://localhost:3000/api/listings';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchProperties();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving property:', error);
      // For now, just add to local state
      if (editingId) {
        setProperties(prev => prev.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
      } else {
        setProperties(prev => [...prev, { ...formData, id: Date.now(), rating: 0, reviews_count: 0 }]);
      }
      resetForm();
      setShowModal(false);
    }
  };

  const handleEdit = (property) => {
    setFormData(property);
    setEditingId(property.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await fetch(`http://localhost:3000/api/listings/${id}`, { method: 'DELETE' });
        fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
        setProperties(prev => prev.filter(p => p.id !== id));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      location: '',
      property_type: 'Apartment',
      bedrooms: 1,
      bathrooms: 1,
      max_guests: 2,
      price_per_night: '',
      amenities: '',
      availability_status: 'Available',
    });
    setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Properties</h1>
          <p>Manage your property listings</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <button className="btn-primary" onClick={() => {
            resetForm();
            setShowModal(true);
          }}>
            ➕ Add Property
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>All Properties</h2>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Price/Night</th>
                  <th>Status</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id}>
                    <td className="property-name">{property.title}</td>
                    <td>{property.location}</td>
                    <td>{property.property_type}</td>
                    <td>${property.price_per_night}</td>
                    <td>
                      <span className={`status-badge ${property.availability_status === 'Available' ? 'status-completed' : 'status-cancelled'}`}>
                        {property.availability_status}
                      </span>
                    </td>
                    <td>
                      <div className="rating">
                        <span>⭐ {property.rating || 0}</span>
                        <span style={{ fontSize: '12px', color: '#999' }}>({property.reviews_count || 0})</span>
                      </div>
                    </td>
                    <td>
                      <div className="action-icons">
                        <button
                          className="icon-btn edit"
                          onClick={() => handleEdit(property)}
                          title="Edit property"
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-btn delete"
                          onClick={() => handleDelete(property.id)}
                          title="Delete property"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        <div className={`modal ${showModal ? 'open' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Property' : 'Add New Property'}</h2>
              <button
                className="modal-close"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Property Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Luxury Apartment Downtown"
                />
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Describe the property..."
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Downtown, Accra"
                />
              </div>

              <div className="form-group">
                <label>Property Type *</label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleInputChange}
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Condo">Condo</option>
                  <option value="Villa">Villa</option>
                  <option value="Cabin">Cabin</option>
                  <option value="Room">Room</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Bedrooms *</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Bathrooms *</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Max Guests *</label>
                  <input
                    type="number"
                    name="max_guests"
                    value={formData.max_guests}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Price per Night ($) *</label>
                  <input
                    type="number"
                    name="price_per_night"
                    value={formData.price_per_night}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    required
                    placeholder="100.00"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Amenities (comma-separated)</label>
                <textarea
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleInputChange}
                  placeholder="e.g., WiFi, Pool, Kitchen, AC"
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>Availability Status</label>
                <select
                  name="availability_status"
                  value={formData.availability_status}
                  onChange={handleInputChange}
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingId ? 'Update Property' : 'Add Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPropertiesPage;
