import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // If user is not logged in
  if (!user) {
    return (
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          Lostly
        </div>
        <div className="navbar-links">
          <button className="nav-link" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/register')}>
            Get Started
          </button>
        </div>
      </nav>
    );
  }

  // If user is logged in
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
    Lostly      </div>
      <div className="navbar-links">
        <button className="nav-link" onClick={() => navigate('/dashboard')}>
          Dashboard
        </button>
        <button className="nav-link" onClick={() => navigate('/browse-items')}>
          Browse
        </button>
        <button className="nav-link" onClick={() => navigate('/my-posts')}>
          My Posts
        </button>
        
        {/* Admin-only link */}
        {user?.role === 'admin' && (
          <button className="nav-link" onClick={() => navigate('/admin')}>
            Admin Panel
          </button>
        )}
        
        <div className="profile-dropdown">
          <button className="profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
            <span>{user?.name}</span>
          </button>
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={() => { navigate('/profile'); setDropdownOpen(false); }}>
                👤 My Profile
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item danger" onClick={() => logout(navigate)}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}