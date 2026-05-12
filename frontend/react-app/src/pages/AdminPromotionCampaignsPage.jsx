import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminPromotionCampaignsPage() {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Summer Sale 2024', description: 'Big summer discount', discount: '20%', status: 'Active', start_date: '2024-06-01', end_date: '2024-08-31' },
    { id: 2, name: 'Early Bird Offer', description: 'Early booking discount', discount: '15%', status: 'Active', start_date: '2024-05-01', end_date: '2024-05-31' },
    { id: 3, name: 'Winter Special', description: 'Winter season promotion', discount: '25%', status: 'Scheduled', start_date: '2024-12-01', end_date: '2025-02-28' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    discount: '',
    status: 'Active',
    start_date: '',
    end_date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCampaigns(prev => prev.map(c => c.id === editingId ? { ...formData, id: editingId } : c));
    } else {
      setCampaigns(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (campaign) => {
    setFormData(campaign);
    setEditingId(campaign.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', discount: '', status: 'Active', start_date: '', end_date: '' });
    setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Promotional Campaigns</h1>
          <p>Create and manage promotional campaigns</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
            ➕ Create Campaign
          </button>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campaign Name</th>
                  <th>Description</th>
                  <th>Discount</th>
                  <th>Status</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td className="property-name">{campaign.name}</td>
                    <td>{campaign.description}</td>
                    <td><strong style={{ color: 'var(--primary-color)' }}>{campaign.discount}</strong></td>
                    <td><span className={`status-badge ${campaign.status === 'Active' ? 'status-completed' : 'status-pending'}`}>{campaign.status}</span></td>
                    <td>{campaign.start_date} to {campaign.end_date}</td>
                    <td>
                      <div className="action-icons">
                        <button className="icon-btn edit" onClick={() => handleEdit(campaign)}>✏️</button>
                        <button className="icon-btn delete" onClick={() => handleDelete(campaign.id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        <div className={`modal ${showModal ? 'open' : ''}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Campaign' : 'Create Campaign'}</h2>
              <button className="modal-close" onClick={() => { setShowModal(false); resetForm(); }}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Campaign Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" />
              </div>
              <div className="form-group">
                <label>Discount *</label>
                <input type="text" name="discount" value={formData.discount} onChange={handleInputChange} required placeholder="e.g., 20%" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Active">Active</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Ended">Ended</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Start Date *</label>
                  <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>End Date *</label>
                  <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</button>
                <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Create'} Campaign</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPromotionCampaignsPage;
