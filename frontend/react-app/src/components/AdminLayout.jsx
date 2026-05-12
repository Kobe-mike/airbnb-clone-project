import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/admin.css';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState({
    overview: false,
    catalog: false,
    sales: false,
    customers: false,
    promotions: false,
    system: false,
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, auth } = useAuth();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const menuItems = [
    {
      icon: '📊',
      label: 'Overview',
      key: 'overview',
      path: '/admin',
      submenu: [
        { label: 'Dashboard', path: '/admin/dashboard' },
        { label: 'Reports', path: '/admin/reports' },
      ]
    },
    {
      icon: '📑',
      label: 'Catalog',
      key: 'catalog',
      submenu: [
        { label: 'Categories', path: '/admin/categories' },
        { label: 'Properties', path: '/admin/properties' },
      ]
    },
    {
      icon: '💰',
      label: 'Sales',
      key: 'sales',
      submenu: [
        { label: 'Bookings', path: '/admin/bookings' },
        { label: 'Payments', path: '/admin/payments' },
      ]
    },
    {
      icon: '👥',
      label: 'Customers',
      key: 'customers',
      submenu: [
        { label: 'Users', path: '/admin/users' },
        { label: 'Reviews', path: '/admin/reviews' },
      ]
    },
    {
      icon: '🎁',
      label: 'Promotions',
      key: 'promotions',
      submenu: [
        { label: 'Campaigns', path: '/admin/promotions/campaigns' },
        { label: 'Discount Codes', path: '/admin/promotions/codes' },
      ]
    },
    {
      icon: '⚙️',
      label: 'System',
      key: 'system',
      submenu: [
        { label: 'Request History', path: '/admin/system/requests' },
        { label: 'Activity Log', path: '/admin/system/activity' },
        { label: 'Social Links', path: '/admin/system/social' },
      ]
    },
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
            <div key={item.key} className="nav-dropdown">
              {item.submenu ? (
                <>
                  <button
                    className={`nav-dropdown-toggle ${expandedMenus[item.key] ? 'expanded' : ''} ${
                      item.submenu.some(sub => isActive(sub.path)) ? 'active' : ''
                    }`}
                    onClick={() => toggleMenu(item.key)}
                    title={!sidebarOpen ? item.label : ''}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span className="nav-icon">{item.icon}</span>
                      {sidebarOpen && <span className="nav-label">{item.label}</span>}
                    </div>
                    {sidebarOpen && <span className="dropdown-arrow">▼</span>}
                  </button>
                  {sidebarOpen && (
                    <ul className={`dropdown-menu ${expandedMenus[item.key] ? 'open' : ''}`}>
                      {item.submenu.map((subitem) => (
                        <li key={subitem.path}>
                          <Link
                            to={subitem.path}
                            className={`dropdown-item ${isActive(subitem.path)}`}
                          >
                            {subitem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-item ${isActive(item.path)}`}
                  title={!sidebarOpen ? item.label : ''}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {sidebarOpen && <span className="nav-label">{item.label}</span>}
                </Link>
              )}
            </div>
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
