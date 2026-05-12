import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/admin.css';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, auth } = useAuth();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const menuItems = [
    { icon: '📊', label: 'Overview', path: '/admin' },
    { icon: '📈', label: 'Dashboard', path: '/admin/dashboard' },
    { icon: '📑', label: 'Catalog', path: '/admin/catalog' },
    { icon: '💰', label: 'Sales', path: '/admin/sales' },
    { icon: '👥', label: 'Customers', path: '/admin/customers' },
    { icon: '🎁', label: 'Promotions', path: '/admin/promotions' },
    { icon: '📄', label: 'Reports', path: '/admin/reports' },
    { icon: '⚙️', label: 'System', path: '/admin/system' },
    { icon: '❓', label: 'Help', path: '/admin/help' },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">AccommodHub</span>
          </div>
          <button 
            className="toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            {sidebarOpen ? '‹' : '›'}
          </button>
        </div>

        <div className="user-profile">
          <div className="avatar">{auth?.user?.name?.charAt(0).toUpperCase() || 'U'}</div>
          {sidebarOpen && (
            <div className="user-info">
              <h4>{auth?.user?.name || 'User'}</h4>
              <p>Account settings</p>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path)}`}
              title={!sidebarOpen ? item.label : ''}
            >
              <span className="nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="nav-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            <span>🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Bar */}
        <div className="admin-topbar">
          <div className="topbar-left">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
          </div>
          <div className="topbar-right">
            <button className="theme-toggle" title="Toggle theme">
              🌙
            </button>
            <button className="notifications-btn" title="Notifications">
              🔔
            </button>
            <div className="user-menu">
              <span>{auth?.user?.name || 'User'}</span>
              <button onClick={handleLogout} title="Logout">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
