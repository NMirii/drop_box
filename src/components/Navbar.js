import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, signOut }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">
          <div className="logo-icon"></div>
          ServerlessBox
        </Link>
      </div>
      <div className="navbar-actions">
        <span className="user-info">Salam, {user?.username || user?.name || 'İstifadəçi'}!</span>
        <button onClick={signOut} className="btn-logout">Çıxış</button>
      </div>
    </nav>
  );
};

export default Navbar;
