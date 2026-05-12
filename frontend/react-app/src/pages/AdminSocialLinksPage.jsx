import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminSocialLinksPage() {
  const [socialLinks, setSocialLinks] = useState([
    { id: 1, platform: 'Facebook', url: 'https://facebook.com/yourpage', icon: '👍', active: true },
    { id: 2, platform: 'Instagram', url: 'https://instagram.com/yourpage', icon: '📷', active: true },
    { id: 3, platform: 'Twitter', url: 'https://twitter.com/yourpage', icon: '🐦', active: true },
    { id: 4, platform: 'LinkedIn', url: 'https://linkedin.com/company/yourpage', icon: '💼', active: false },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    icon: '',
    active: true,
  });

  const availablePlatforms = [
    { name: 'Facebook', icon: '👍' },
    { name: 'Instagram', icon: '📷' },
    { name: 'Twitter', icon: '🐦' },
    { name: 'LinkedIn', icon: '💼' },
    { name: 'YouTube', icon: '📹' },
    { name: 'TikTok', icon: '🎵' },
    { name: 'Pinterest', icon: '📌' },
    { name: 'Telegram', icon: '✈️' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePlatformChange = (platformName) => {
    const platform = availablePlatforms.find(p => p.name === platformName);
    setFormData(prev => ({
      ...prev,
      platform: platformName,
      icon: platform?.icon || '',
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setSocialLinks(prev => prev.map(link =>
        link.id === editingId ? { ...link, ...formData } : link
      ));
    } else {
      setSocialLinks(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (link) => {
    setFormData(link);
    setEditingId(link.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setSocialLinks(prev => prev.filter(link => link.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setSocialLinks(prev => prev.map(link =>
      link.id === id ? { ...link, active: !link.active } : link
    ));
  };

  const resetForm = () => {
    setFormData({ platform: '', url: '', icon: '', active: true });
    setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Social Links</h1>
          <p>Manage your social media connections</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
            ➕ Add Social Link
          </button>
        </div>

        {/* Active Social Links Grid */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '16px' }}>Active Links</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
            {socialLinks.filter(link => link.active).map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '20px',
                  background: 'white',
                  border: '2px solid var(--primary-color)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.12)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: '32px' }}>{link.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{link.platform}</span>
                <div className="action-icons" style={{ marginTop: '8px' }}>
                  <button className="icon-btn edit" onClick={(e) => { e.preventDefault(); handleEdit(link); }}>✏️</button>
                  <button className="icon-btn delete" onClick={(e) => { e.preventDefault(); handleDelete(link.id); }}>🗑️</button>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* All Social Links Table */}
        <div className="card">
          <div className="card-header">
            <h2>All Social Links ({socialLinks.length})</h2>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>URL</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {socialLinks.map((link) => (
                  <tr key={link.id}>
                    <td>
                      <span style={{ fontSize: '20px', marginRight: '8px' }}>{link.icon}</span>
                      {link.platform}
                    </td>
                    <td style={{ fontSize: '12px', fontFamily: 'monospace' }}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                        {link.url}
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleActive(link.id)}
                        style={{
                          padding: '4px 12px',
                          borderRadius: '20px',
                          border: 'none',
                          background: link.active ? '#dcfce7' : '#fee2e2',
                          color: link.active ? '#16a34a' : '#dc2626',
                          fontSize: '11px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        {link.active ? '✓ Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>
                      <div className="action-icons">
                        <button className="icon-btn edit" onClick={() => handleEdit(link)}>✏️</button>
                        <button className="icon-btn delete" onClick={() => handleDelete(link.id)}>🗑️</button>
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
              <h2>{editingId ? 'Edit Social Link' : 'Add Social Link'}</h2>
              <button className="modal-close" onClick={() => { setShowModal(false); resetForm(); }}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Platform *</label>
                <select value={formData.platform} onChange={(e) => handlePlatformChange(e.target.value)} required>
                  <option value="">Select a platform</option>
                  {availablePlatforms.map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Profile URL *</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  required
                  placeholder="https://..."
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                  />
                  Active
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</button>
                <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add'} Link</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminSocialLinksPage;
