import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setDrawerOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__left">
          <button 
            className="navbar__hamburger" 
            onClick={() => setDrawerOpen(true)}
          >
            <span></span><span></span><span></span>
          </button>
          <ul className="navbar__links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li className="navbar__dropdown-item">
              <a href="#stays">Stays</a>
              <ul className="navbar__dropdown">
                <li><a href="#">Rooms</a></li>
                <li><a href="#">Villas</a></li>
                <li><a href="#">Chalets</a></li>
                <li><a href="#">Eco Lodges</a></li>
                <li><a href="#">Heritage</a></li>
              </ul>
            </li>
            <li><a href="#services">Services</a></li>
            <li><a href="#pricing">Pricing</a></li>
          </ul>
        </div>
        <div className="navbar__center">
          <Link to="/" className="navbar__logo" title="Logo">🏛️</Link>
        </div>
        <div className="navbar__right">
          {isAuthenticated ? (
            <>
              <span style={{ color: '#D4AF37', marginRight: '1rem' }}>
                Welcome, {user?.name}!
              </span>
              <button 
                className="btn btn--ghost btn--sm" 
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn--ghost btn--sm">Log In</Link>
          )}
          <button className="btn btn--primary btn--sm">Contact</button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="navbar__drawer active" style={{ display: 'flex' }}>
          <button 
            className="navbar__close" 
            onClick={() => setDrawerOpen(false)}
          >
            &times;
          </button>
          <ul className="navbar__drawer-links">
            <li><a href="#home" onClick={() => setDrawerOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setDrawerOpen(false)}>About Us</a></li>
            <li><a href="#stays" onClick={() => setDrawerOpen(false)}>Stays</a></li>
            <li><a href="#services" onClick={() => setDrawerOpen(false)}>Services</a></li>
            <li><a href="#pricing" onClick={() => setDrawerOpen(false)}>Pricing</a></li>
            {isAuthenticated ? (
              <>
                <li><span style={{ color: '#D4AF37' }}>Welcome, {user?.name}!</span></li>
                <li>
                  <button 
                    className="btn btn--ghost btn--sm btn--full"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <li><Link to="/auth" className="btn btn--ghost btn--sm btn--full">Log In</Link></li>
            )}
            <li><button className="btn btn--primary btn--sm btn--full">Contact</button></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
