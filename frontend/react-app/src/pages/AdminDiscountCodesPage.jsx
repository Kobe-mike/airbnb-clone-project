import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminDiscountCodesPage() {
  const [codes, setCodes] = useState([
    { id: 1, code: 'SUMMER20', discount: '20%', uses: 45, max_uses: 100, status: 'Active', created_at: '2024-06-01' },
    { id: 2, code: 'WELCOME15', discount: '15%', uses: 120, max_uses: 200, status: 'Active', created_at: '2024-05-15' },
    { id: 3, code: 'VIP25', discount: '25%', uses: 35, max_uses: 50, status: 'Active', created_at: '2024-06-10' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    max_uses: '',
    status: 'Active',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCodes(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      setCodes(prev => [...prev, { ...formData, id: Date.now(), uses: 0, created_at: new Date().toISOString().split('T')[0] }]);
    }
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (codeItem) => {
    setFormData({ code: codeItem.code, discount: codeItem.discount, max_uses: codeItem.max_uses, status: codeItem.status });
    setEditingId(codeItem.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setCodes(prev => prev.filter(c => c.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ code: '', discount: '', max_uses: '', status: 'Active' });
    setEditingId(null);
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Discount Codes</h1>
          <p>Generate and manage discount codes</p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <button className="btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
            ➕ Generate Code
          </button>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount</th>
                  <th>Uses</th>
                  <th>Max Uses</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((codeItem) => (
                  <tr key={codeItem.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: '600', color: 'var(--primary-color)' }}>{codeItem.code}</td>
                    <td><strong>{codeItem.discount}</strong></td>
                    <td>{codeItem.uses}/{codeItem.max_uses}</td>
                    <td>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#eee',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${(codeItem.uses / codeItem.max_uses) * 100}%`,
                          height: '100%',
                          background: 'var(--primary-color)'
                        }} />
                      </div>
                    </td>
                    <td><span className={`status-badge ${codeItem.status === 'Active' ? 'status-completed' : 'status-cancelled'}`}>{codeItem.status}</span></td>
                    <td>{codeItem.created_at}</td>
                    <td>
                      <div className="action-icons">
                        <button className="icon-btn edit" onClick={() => handleEdit(codeItem)}>✏️</button>
                        <button className="icon-btn delete" onClick={() => handleDelete(codeItem.id)}>🗑️</button>
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
              <h2>{editingId ? 'Edit Code' : 'Generate Code'}</h2>
              <button className="modal-close" onClick={() => { setShowModal(false); resetForm(); }}>✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Discount Code *</label>
                <input type="text" name="code" value={formData.code} onChange={handleInputChange} required placeholder="e.g., SUMMER20" />
              </div>
              <div className="form-group">
                <label>Discount *</label>
                <input type="text" name="discount" value={formData.discount} onChange={handleInputChange} required placeholder="e.g., 20%" />
              </div>
              <div className="form-group">
                <label>Max Uses *</label>
                <input type="number" name="max_uses" value={formData.max_uses} onChange={handleInputChange} required min="1" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</button>
                <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Generate'} Code</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDiscountCodesPage;
