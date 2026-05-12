import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminDashboardPage() {
  // Sample orders data
  const [orders] = useState([
    { id: '', date: '', amount: '$0.00', status: 'Pending', property: '' },
    { id: '', date: '', amount: '$0.00', status: 'Pending', property: '' },
    { id: '', date: '', amount: '$0.00', status: 'Pending', property: '' },
    { id: '', date: '', amount: '$0.00', status: 'Pending', property: '' },
    { id: '', date: '', amount: '$0.00', status: 'Pending', property: '' },
  ]);

  // Sample properties data
  const [products] = useState([
    { id: 1, name: '', image: '🏡', orders: 0, rank: 1 },
    { id: 2, name: '', image: '🏠', orders: 0, rank: 2 },
    { id: 3, name: '', image: '🏘️', orders: 0, rank: 3 },
    { id: 4, name: '', image: '🏢', orders: 0, rank: 4 },
    { id: 5, name: '', image: '🏰', orders: 0, rank: 5 },
  ]);

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'cancelled':
        return 'status-cancelled';
      case 'processing':
        return 'status-processing';
      case 'completed':
        return 'status-completed';
      default:
        return 'status-pending';
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Manage your bookings and properties</p>
        </div>

        {/* Two Column Layout */}
        <div className="dashboard-grid">
          {/* Recent Orders */}
          <div className="card">
            <div className="card-header">
              <div className="header-title">
                <span className="icon">📅</span>
                <h2>Recent Orders</h2>
              </div>
              <a href="/admin/orders" className="view-all-link">View all →</a>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Property</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="order-id">{order.id}</td>
                      <td className="order-date">{order.date}</td>
                      <td className="order-property">{order.property}</td>
                      <td className="order-amount">{order.amount}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products/Properties */}
          <div className="card">
            <div className="card-header">
              <div className="header-title">
                <span className="icon">⭐</span>
                <h2>Top Properties</h2>
              </div>
              <a href="/admin/properties" className="view-all-link">View all →</a>
            </div>
            <div className="products-list">
              {products.map((product) => (
                <div key={product.id} className="product-item">
                  <div className="product-rank">{product.rank}</div>
                  <div className="product-image">{product.image}</div>
                  <div className="product-info">
                    <h4 className="product-name">{product.name || 'Property'}</h4>
                    <p className="product-orders">{product.orders} bookings</p>
                  </div>
                  <div className="product-count">{product.orders}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="dashboard-summary">
          <div className="summary-card">
            <h3>This Month</h3>
            <div className="summary-stat">
              <span className="label">Bookings</span>
              <span className="value">0</span>
            </div>
            <div className="summary-stat">
              <span className="label">Revenue</span>
              <span className="value">$0.00</span>
            </div>
          </div>
          <div className="summary-card">
            <h3>Performance</h3>
            <div className="summary-stat">
              <span className="label">Avg. Rating</span>
              <span className="value">0.0/5.0</span>
            </div>
            <div className="summary-stat">
              <span className="label">Response Rate</span>
              <span className="value">0%</span>
            </div>
          </div>
          <div className="summary-card">
            <h3>Alerts</h3>
            <div className="alert-item warning">
              ⚠️ 1 Property needs attention
            </div>
            <div className="alert-item info">
              ℹ️ New message from guest
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboardPage;
