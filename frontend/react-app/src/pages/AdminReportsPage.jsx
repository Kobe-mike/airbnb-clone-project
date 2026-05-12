import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminReportsPage() {
  const [reportType, setReportType] = useState('bookings');

  // Sample reports data
  const bookingReport = [
    { month: 'Jan', bookings: 0, revenue: '$0.00' },
    { month: 'Feb', bookings: 0, revenue: '$0.00' },
    { month: 'Mar', bookings: 0, revenue: '$0.00' },
    { month: 'Apr', bookings: 0, revenue: '$0.00' },
    { month: 'May', bookings: 0, revenue: '$0.00' },
    { month: 'Jun', bookings: 0, revenue: '$0.00' },
  ];

  const propertyPerformance = [
    { name: '', occupancy: '0%', rating: '0.0', revenue: '$0.00', guests: 0 },
    { name: '', occupancy: '0%', rating: '0.0', revenue: '$0.00', guests: 0 },
    { name: '', occupancy: '0%', rating: '0.0', revenue: '$0.00', guests: 0 },
    { name: '', occupancy: '0%', rating: '0.0', revenue: '$0.00', guests: 0 },
    { name: '', occupancy: '0%', rating: '0.0', revenue: '$0.00', guests: 0 },
  ];

  const guestDemographics = [
    { source: 'Direct Booking', count: 0, percentage: '0%' },
    { source: 'Search Engines', count: 0, percentage: '0%' },
    { source: 'Social Media', count: 0, percentage: '0%' },
    { source: 'Referrals', count: 0, percentage: '0%' },
  ];

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Reports</h1>
          <p>Analytics and performance insights</p>
        </div>

        {/* Report Type Selector */}
        <div className="report-selector">
          <button 
            className={`report-btn ${reportType === 'bookings' ? 'active' : ''}`}
            onClick={() => setReportType('bookings')}
          >
            📅 Booking Trends
          </button>
          <button 
            className={`report-btn ${reportType === 'properties' ? 'active' : ''}`}
            onClick={() => setReportType('properties')}
          >
            🏠 Property Performance
          </button>
          <button 
            className={`report-btn ${reportType === 'guests' ? 'active' : ''}`}
            onClick={() => setReportType('guests')}
          >
            👥 Guest Analysis
          </button>
        </div>

        {/* Booking Trends Report */}
        {reportType === 'bookings' && (
          <div className="reports-grid">
            <div className="card">
              <div className="card-header">
                <h2>Monthly Booking Trends</h2>
              </div>
              <div className="chart-container">
                <div className="simple-chart">
                  {bookingReport.map((data, index) => (
                    <div key={index} className="chart-bar">
                      <div className="bar-stack">
                        <div 
                          className="bar" 
                          style={{ height: `${(data.bookings / 42) * 100}%` }}
                          title={`${data.bookings} bookings`}
                        ></div>
                      </div>
                      <span className="bar-label">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
              <table className="data-table compact">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Bookings</th>
                    <th>Revenue</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingReport.map((data, index) => (
                    <tr key={index}>
                      <td>{data.month}</td>
                      <td>{data.bookings}</td>
                      <td>{data.revenue}</td>
                      <td>
                        <span className="trend positive">
                          {index > 0 && bookingReport[index].bookings > bookingReport[index - 1].bookings ? '↑' : '↓'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Property Performance Report */}
        {reportType === 'properties' && (
          <div className="reports-grid">
            <div className="card">
              <div className="card-header">
                <h2>Property Performance Metrics</h2>
              </div>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Property</th>
                      <th>Occupancy Rate</th>
                      <th>Rating</th>
                      <th>Revenue</th>
                      <th>Guests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {propertyPerformance.map((property, index) => (
                      <tr key={index}>
                        <td className="property-name">{property.name}</td>
                        <td>
                          <div className="progress-bar small">
                            <div 
                              className="progress" 
                              style={{ width: property.occupancy }}
                            ></div>
                          </div>
                          <span>{property.occupancy}</span>
                        </td>
                        <td className="rating">
                          <span className="stars">⭐</span> {property.rating}
                        </td>
                        <td className="amount">{property.revenue}</td>
                        <td className="center">{property.guests}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Guest Analysis Report */}
        {reportType === 'guests' && (
          <div className="reports-grid">
            <div className="card">
              <div className="card-header">
                <h2>Guest Source Analysis</h2>
              </div>
              <div className="demographics-list">
                {guestDemographics.map((source, index) => (
                  <div key={index} className="demographic-item">
                    <div className="demographic-info">
                      <h4>{source.source}</h4>
                      <p className="demographic-count">{source.count} guests</p>
                    </div>
                    <div className="demographic-bar">
                      <div 
                        className="demographic-progress" 
                        style={{ width: source.percentage }}
                      ></div>
                    </div>
                    <span className="demographic-percentage">{source.percentage}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2>Key Metrics</h2>
              </div>
              <div className="metrics-list">
                <div className="metric">
                  <span className="metric-label">Total Guests</span>
                  <span className="metric-value">0</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Avg. Rating</span>
                  <span className="metric-value">0.0/5.0</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Return Guests</span>
                  <span className="metric-value">0%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Avg. Stay</span>
                  <span className="metric-value">0 days</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Options */}
        <div className="card export-section">
          <h3>Export Report</h3>
          <div className="export-buttons">
            <button className="export-btn">📥 Download PDF</button>
            <button className="export-btn">📊 Export CSV</button>
            <button className="export-btn">📧 Email Report</button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminReportsPage;
