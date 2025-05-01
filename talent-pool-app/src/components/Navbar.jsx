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
      <div className="navbar-space" />

      {isAdmin && (
        <div className="nav-items">
          {navItems.map((item) => (
            <Link
              to={item.href}
              className={`nav-item ${pathname === item.href ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {token && (
        <div className="flex items-center gap-4">
          {role?.trim().toLowerCase() !== 'admin' && <Avatar />}
          <div className="relative group">
            <button
              onClick={handleLogout}
              className="p-2 rounded-md bg-transparent text-red-600 hover:text-red-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-200 transition-all duration-200"
              aria-label="Logout"
            >
              <LogOutIcon className="w-5 h-5" />
            </button>

            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
              Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
