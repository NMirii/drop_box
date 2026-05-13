import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Auth.signOut();
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">
          <div className="logo-icon"></div>
          ServerlessBox
        </Link>
      </div>
      <div className="navbar-actions">
        <button onClick={handleLogout} className="btn-logout">Çıxış</button>
      </div>
    </nav>
  );
};

export default Navbar;
