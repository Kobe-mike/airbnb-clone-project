import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminCustomersPage() {
  const navigate = useNavigate();

  const customerItems = [
    {
      icon: '👥',
      title: 'Users',
      description: 'Manage admin users and customers',
      action: () => navigate('/admin/users'),
      color: '#D4AF37'
    },
    {
      icon: '⭐',
      title: 'Reviews',
      description: 'Manage customer reviews and ratings',
      action: () => navigate('/admin/reviews'),
      color: '#B8860B'
    },
  ];

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Customers</h1>
          <p>Manage users and reviews</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {customerItems.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderTop: `4px solid ${item.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onClick={item.action}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {item.icon}
                </div>
                <h2 style={{ margin: '0 0 12px', fontSize: '20px', color: '#1a1a1a' }}>
                  {item.title}
                </h2>
                <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
                  {item.description}
                </p>
              </div>
              <button
                className="btn-primary"
                style={{ marginTop: '20px', width: '100%' }}
              >
                Open {item.title} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminCustomersPage;

