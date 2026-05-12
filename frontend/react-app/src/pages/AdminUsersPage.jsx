import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import '../styles/admin.css';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userType, setUserType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users
  useEffect(() => {
    let filtered = users;

    if (userType !== 'all') {
      filtered = filtered.filter(u => (userType === 'admin') ? u.is_admin : !u.is_admin);
    }

    if (searchTerm) {
      filtered = filtered.filter(u =>
        u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.first_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [users, userType, searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Sample data for development
      setUsers([
        {
          id: 1,
          username: 'admin_user',
          email: 'admin@example.com',
          first_name: 'Admin',
          last_name: 'User',
          phone: '+233-XXX-XXX',
          is_admin: true,
          is_verified: true,
          created_at: '2024-01-15',
        },
        {
          id: 2,
          username: 'john_doe',
          email: 'john@example.com',
          first_name: 'John',
          last_name: 'Doe',
          phone: '+233-XXX-XXX',
          is_admin: false,
          is_verified: true,
          created_at: '2024-02-10',
        },
        {
          id: 3,
          username: 'jane_smith',
          email: 'jane@example.com',
          first_name: 'Jane',
          last_name: 'Smith',
          phone: '+233-XXX-XXX',
          is_admin: false,
          is_verified: true,
          created_at: '2024-02-20',
        },
        {
          id: 4,
          username: 'bob_manager',
          email: 'bob@example.com',
          first_name: 'Bob',
          last_name: 'Manager',
          phone: '+233-XXX-XXX',
          is_admin: true,
          is_verified: true,
          created_at: '2024-03-01',
        },
        {
          id: 5,
          username: 'maria_garcia',
          email: 'maria@example.com',
          first_name: 'Maria',
          last_name: 'Garcia',
          phone: '+233-XXX-XXX',
          is_admin: false,
          is_verified: false,
          created_at: '2024-04-05',
        },
      ]);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' });
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        setUsers(prev => prev.filter(u => u.id !== id));
      }
    }
  };

  const handleVerifyUser = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/users/${id}/verify`, { method: 'PUT' });
      fetchUsers();
    } catch (error) {
      console.error('Error verifying user:', error);
      setUsers(prev => prev.map(u =>
        u.id === id ? { ...u, is_verified: true } : u
      ));
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="page-header">
          <h1>Users</h1>
          <p>Manage admin users and customer accounts</p>
        </div>

        {/* Search and Filter */}
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search by username, email, or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* User Type Filter */}
        <div style={{ marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className="filter-btn"
            onClick={() => setUserType('all')}
            style={userType === 'all' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            All Users
          </button>
          <button
            className="filter-btn"
            onClick={() => setUserType('admin')}
            style={userType === 'admin' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            Admins
          </button>
          <button
            className="filter-btn"
            onClick={() => setUserType('customer')}
            style={userType === 'customer' ? {
              background: 'var(--primary-color)',
              color: 'white'
            } : {
              background: 'white',
              color: 'var(--primary-color)',
              border: '2px solid var(--primary-color)'
            }}
          >
            Customers
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>All Users ({filteredUsers.length})</h2>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Verified</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="property-name">{user.username}</td>
                      <td>{user.first_name} {user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '600',
                          background: user.is_admin ? 'rgba(212, 175, 55, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                          color: user.is_admin ? 'var(--primary-color)' : 'var(--success-color)',
                        }}>
                          {user.is_admin ? '👑 Admin' : '👤 Customer'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.is_verified ? 'status-completed' : 'status-pending'}`}>
                          {user.is_verified ? '✓ Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td>{user.created_at}</td>
                      <td>
                        <div className="action-icons">
                          {!user.is_verified && (
                            <button
                              className="icon-btn edit"
                              onClick={() => handleVerifyUser(user.id)}
                              title="Verify user"
                            >
                              ✓
                            </button>
                          )}
                          <button
                            className="icon-btn delete"
                            onClick={() => handleDeleteUser(user.id)}
                            title="Delete user"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
                      No users found
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

export default AdminUsersPage;
