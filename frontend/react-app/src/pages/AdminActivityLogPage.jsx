import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminActivityLogPage() {
  const [activities] = useState([
    { id: 1, action: 'User Login', user: 'admin_user', details: 'Admin logged in', timestamp: '2024-06-15 14:45:00', severity: 'info' },
    { id: 2, action: 'Property Created', user: 'admin_user', details: 'New property "Luxury Apartment" added', timestamp: '2024-06-15 14:35:22', severity: 'success' },
    { id: 3, action: 'Payment Processed', user: 'system', details: 'Payment of $750 processed for booking BK001', timestamp: '2024-06-15 14:25:10', severity: 'success' },
    { id: 4, action: 'Booking Cancelled', user: 'john_doe', details: 'Booking BK004 cancelled', timestamp: '2024-06-15 14:15:45', severity: 'warning' },
    { id: 5, action: 'Category Deleted', user: 'admin_user', details: 'Category "Outdated" removed', timestamp: '2024-06-15 14:05:30', severity: 'warning' },
    { id: 6, action: 'Review Posted', user: 'jane_smith', details: '5-star review posted for property', timestamp: '2024-06-15 13:55:15', severity: 'info' },
  ]);

  const getSeverityIcon = (severity) => {
    const icons = {
      'info': 'ℹ️',
      'success': '✓',
      'warning': '⚠️',
      'error': '✕',
    };
    return icons[severity] || 'ℹ️';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      'info': '#3b82f6',
      'success': '#10b981',
      'warning': '#f59e0b',
      'error': '#ef4444',
    };
    return colors[severity] || '#6b7280';
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Activity Log</h1>
          <p>Monitor all system activity and changes</p>
        </div>

        <div className="card">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activities.map((activity) => (
              <div
                key={activity.id}
                style={{
                  padding: '16px',
                  borderLeft: `4px solid ${getSeverityColor(activity.severity)}`,
                  backgroundColor: `${getSeverityColor(activity.severity)}05`,
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{getSeverityIcon(activity.severity)}</span>
                    <div>
                      <h3 style={{ margin: '0', fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>
                        {activity.action}
                      </h3>
                      <p style={{ margin: '0', fontSize: '12px', color: '#666' }}>
                        {activity.details}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#999' }}>
                    <span>👤 {activity.user}</span>
                    <span>🕐 {activity.timestamp}</span>
                  </div>
                </div>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: getSeverityColor(activity.severity),
                  color: 'white',
                  whiteSpace: 'nowrap',
                  marginLeft: '16px',
                }}>
                  {activity.severity.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminActivityLogPage;
