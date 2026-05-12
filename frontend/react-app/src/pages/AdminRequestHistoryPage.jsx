import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminRequestHistoryPage() {
  const [requests] = useState([
    { id: 1, endpoint: '/api/listings', method: 'GET', status: 200, timestamp: '2024-06-15 14:23:45', duration: '125ms' },
    { id: 2, endpoint: '/api/bookings', method: 'POST', status: 201, timestamp: '2024-06-15 14:22:10', duration: '234ms' },
    { id: 3, endpoint: '/api/users/1', method: 'GET', status: 200, timestamp: '2024-06-15 14:21:05', duration: '89ms' },
    { id: 4, endpoint: '/api/payments', method: 'GET', status: 200, timestamp: '2024-06-15 14:20:30', duration: '156ms' },
    { id: 5, endpoint: '/api/properties/5', method: 'PUT', status: 200, timestamp: '2024-06-15 14:19:45', duration: '198ms' },
    { id: 6, endpoint: '/api/categories', method: 'GET', status: 200, timestamp: '2024-06-15 14:18:20', duration: '112ms' },
  ]);

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return '#10b981';
    if (status >= 400) return '#ef4444';
    return '#3b82f6';
  };

  const getMethodColor = (method) => {
    const colors = {
      'GET': '#3b82f6',
      'POST': '#10b981',
      'PUT': '#f59e0b',
      'DELETE': '#ef4444',
    };
    return colors[method] || '#6b7280';
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Request History</h1>
          <p>View all API and system requests</p>
        </div>

        <div className="card">
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Endpoint</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{request.endpoint}</td>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                        background: getMethodColor(request.method),
                        color: 'white',
                      }}>
                        {request.method}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                        background: `${getStatusColor(request.status)}20`,
                        color: getStatusColor(request.status),
                      }}>
                        {request.status}
                      </span>
                    </td>
                    <td>{request.timestamp}</td>
                    <td style={{ fontWeight: '600' }}>{request.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminRequestHistoryPage;
