import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch payments from API
  useEffect(() => {
    fetchPayments();
  }, []);

  // Filter payments
  useEffect(() => {
    let filtered = payments;

    if (filterStatus !== 'all') {
      filtered = filtered.filter(p => p.status.toLowerCase() === filterStatus.toLowerCase());
    }

    if (selectedProvider !== 'all') {
      filtered = filtered.filter(p => p.payment_method === selectedProvider);
    }

    if (dateFrom) {
      filtered = filtered.filter(p => new Date(p.created_at) >= new Date(dateFrom));
    }

    if (dateTo) {
      filtered = filtered.filter(p => new Date(p.created_at) <= new Date(dateTo));
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.id.toString().includes(searchTerm) ||
        p.transaction_id?.includes(searchTerm)
      );
    }

    setFilteredPayments(filtered);
  }, [payments, filterStatus, selectedProvider, dateFrom, dateTo, searchTerm]);

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/payments');
      const data = await response.json();
      setPayments(data.data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
      // Sample data for development
      setPayments([
        {
          id: 'RID001',
          booking_id: 'BK001',
          user_id: 1,
          amount: 750.00,
          payment_method: 'Credit Card',
          transaction_id: 'TXN20240515001',
          status: 'Completed',
          created_at: '2024-05-15',
        },
        {
          id: 'RID002',
          booking_id: 'BK002',
          user_id: 2,
          amount: 1400.00,
          payment_method: 'Debit Card',
          transaction_id: 'TXN20240601001',
          status: 'Pending',
          created_at: '2024-06-01',
        },
        {
          id: 'RID003',
          booking_id: 'BK003',
          user_id: 3,
          amount: 400.00,
          payment_method: 'PayPal',
          transaction_id: 'TXN20240420001',
          status: 'Completed',
          created_at: '2024-04-20',
        },
        {
          id: 'RID004',
          booking_id: 'BK004',
          user_id: 4,
          amount: 500.00,
          payment_method: 'Bank Transfer',
          transaction_id: 'TXN20240510001',
          status: 'Failed',
          created_at: '2024-05-10',
        },
        {
          id: 'RID005',
          booking_id: 'BK005',
          user_id: 5,
          amount: 1050.00,
          payment_method: 'Credit Card',
          transaction_id: 'TXN20240615001',
          status: 'Completed',
          created_at: '2024-06-15',
        },
      ]);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'failed':
        return 'status-cancelled';
      case 'refunded':
        return 'status-processing';
      default:
        return 'status-pending';
    }
  };

  const calculateTotals = () => {
    const completed = filteredPayments
      .filter(p => p.status.toLowerCase() === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
    
    const pending = filteredPayments
      .filter(p => p.status.toLowerCase() === 'pending')
      .reduce((sum, p) => sum + p.amount, 0);

    return { completed, pending };
  };

  const totals = calculateTotals();

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Payments</h1>
          <p>Manage payment transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <p className="stat-label">Total Completed</p>
              <h3 className="stat-value">${totals.completed.toFixed(2)}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <p className="stat-label">Pending Payments</p>
              <h3 className="stat-value">${totals.pending.toFixed(2)}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <p className="stat-label">Total Transactions</p>
              <h3 className="stat-value">{filteredPayments.length}</h3>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            <div className="form-group">
              <label>Search by RID or Transaction ID</label>
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>From Date</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>To Date</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Provider</label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
              >
                <option value="all">All Providers</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
          </div>
          <button className="filter-btn" onClick={() => {
            setFilterStatus('all');
            setDateFrom('');
            setDateTo('');
            setSelectedProvider('all');
            setSearchTerm('');
          }}>
            🔄 Reset Filters
          </button>
        </div>

        {/* Status Filter */}
        <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ display: 'flex', alignItems: 'center', fontWeight: '600', color: '#333' }}>
            Status:
          </span>
          <button
            className="filter-btn"
            onClick={() => setFilterStatus('all')}
            style={filterStatus === 'all' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            All Statuses
          </button>
          <button
            className="filter-btn"
            onClick={() => setFilterStatus('pending')}
            style={filterStatus === 'pending' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            Pending
          </button>
          <button
            className="filter-btn"
            onClick={() => setFilterStatus('completed')}
            style={filterStatus === 'completed' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            Completed
          </button>
          <button
            className="filter-btn"
            onClick={() => setFilterStatus('failed')}
            style={filterStatus === 'failed' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            Failed
          </button>
          <button
            className="filter-btn"
            onClick={() => setFilterStatus('refunded')}
            style={filterStatus === 'refunded' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            Refunded
          </button>
        </div>

        {/* Payments Table */}
        <div className="card">
          <div className="card-header">
            <h2>Payment Transactions ({filteredPayments.length})</h2>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>RID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Provider</th>
                  <th>Transaction ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="order-id">{payment.id}</td>
                      <td>{payment.created_at}</td>
                      <td className="order-amount">${payment.amount.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td>{payment.payment_method}</td>
                      <td style={{ fontSize: '12px', fontFamily: 'monospace' }}>{payment.transaction_id}</td>
                      <td>
                        <div className="action-icons">
                          <button className="icon-btn edit" title="View details">
                            👁️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminPaymentsPage;
