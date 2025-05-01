import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../styles/navBar.css';
import Avatar from './Avatar';
import Cookies from 'js-cookie';
import { LogOutIcon } from 'lucide-react';
import ExternLabsIcon from '../assets/extern_labs_icon.png'; // Or use require if needed

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const isAdmin = pathname.includes('/admin');

  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    setToken(storedToken);
    setRole(storedRole);
  }, []);

  const navItems = [
    { name: 'Explore', href: '/admin/explore' },
    { name: 'Post Jobs', href: '/admin/job-post' },
    { name: 'Jobs', href: '/admin/jobs' },
  ];

  const clearAllCookies = () => {
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
  };

  const handleLogout = () => {
    clearAllCookies();
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={ExternLabsIcon} alt="Logo" className="navbar-logo" />
      </div>

      <div className="navbar-space"></div>

      {isAdmin && (
        <div className="nav-items">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`nav-item ${pathname === item.href ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {token && (
        <div className="auth-section">
          {role?.trim().toLowerCase() !== 'admin' && <Avatar />}
          <div className="logout-wrapper">
            <button onClick={handleLogout} className="logout-button" aria-label="Logout">
              <LogOutIcon className="logout-icon" />
            </button>
            <div className="logout-tooltip">Logout</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
