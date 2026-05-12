import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminOverviewPage() {
  // Sample stats data
  const stats = [
    { label: 'Total Revenue', value: '$0.00', change: '0%', icon: '💰' },
    { label: 'Total Bookings', value: '0', change: '0', icon: '📅' },
    { label: 'Active Properties', value: '0', change: '0', icon: '🏠' },
    { label: 'Avg. Rating', value: '0.0/5', change: '0', icon: '⭐' },
  ];

  const recentActivities = [
    { id: 1, action: 'New booking received', property: '', time: '' },
    { id: 2, action: 'Property review posted', property: '', time: '' },
    { id: 3, action: 'Payment received', amount: '', time: '' },
    { id: 4, action: 'New inquiry from guest', property: '', time: '' },
    { id: 5, action: 'Property approved', property: '', time: '' },
  ];

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Overview</h1>
          <p>Welcome to your admin dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
                <span className="stat-change positive">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Row */}
        <div className="overview-row">
          {/* Recent Activity */}
          <div className="card full-width">
            <div className="card-header">
              <h2>Recent Activity</h2>
              <a href="/admin/reports" className="view-all-link">View all →</a>
            </div>
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-info">
                    <p className="activity-action">{activity.action}</p>
                    <p className="activity-detail">
                      {activity.property || activity.amount}
                    </p>
                  </div>
                  <span className="activity-time">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="card">
            <h3>Quick Actions</h3>
            <button className="action-btn">➕ Add Property</button>
            <button className="action-btn">📝 Create Promotion</button>
            <button className="action-btn">📧 Send Message</button>
          </div>

          <div className="card">
            <h3>Performance</h3>
            <div className="performance-stat">
              <span>Booking Rate</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '78%' }}></div>
              </div>
              <span>78%</span>
            </div>
            <div className="performance-stat">
              <span>Guest Satisfaction</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '96%' }}></div>
              </div>
              <span>96%</span>
            </div>
            <div className="performance-stat">
              <span>Response Rate</span>
              <div className="progress-bar">
                <div className="progress" style={{ width: '85%' }}></div>
              </div>
              <span>85%</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminOverviewPage;
