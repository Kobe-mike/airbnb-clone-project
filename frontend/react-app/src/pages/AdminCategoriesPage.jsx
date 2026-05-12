import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Sample data for development
      setCategories([
        { id: 1, name: 'Luxury Homes', description: 'High-end properties with premium amenities', product_count: 45 },
        { id: 2, name: 'Budget Friendly', description: 'Affordable accommodation options', product_count: 78 },
        { id: 3, name: 'Family Apartments', description: 'Spacious apartments for families', product_count: 32 },
        { id: 4, name: 'Beach Properties', description: 'Properties near beaches', product_count: 28 },
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
        ? `http://localhost:3000/api/categories/${editingId}`
        : 'http://localhost:3000/api/categories';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchCategories();
        resetForm();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      // Local state update for development
      if (editingId) {
        setCategories(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } : c));
      } else {
        setCategories(prev => [...prev, { ...formData, id: Date.now(), product_count: 0 }]);
      }
      resetForm();
      setShowModal(false);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
    });
    setEditingId(category.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`http://localhost:3000/api/categories/${id}`, { method: 'DELETE' });
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        setCategories(prev => prev.filter(c => c.id !== id));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
    });
    setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Categories</h1>
          <p>Manage property categories visible to customers</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <button className="btn-primary" onClick={() => {
            resetForm();
            setShowModal(true);
          }}>
            ➕ Add Category
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>All Categories</h2>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Properties</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="property-name">{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.product_count || 0}</td>
                    <td>
                      <div className="action-icons">
                        <button
                          className="icon-btn edit"
                          onClick={() => handleEdit(category)}
                          title="Edit category"
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-btn delete"
                          onClick={() => handleDelete(category.id)}
                          title="Delete category"
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
              <h2>{editingId ? 'Edit Category' : 'Add New Category'}</h2>
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
                <label>Category Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Luxury Homes"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe this category..."
                  rows="4"
                />
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
                  {editingId ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminCategoriesPage;
