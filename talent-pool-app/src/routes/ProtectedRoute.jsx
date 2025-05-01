// components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get('access_token');
    const roleFromUrl = searchParams.get('role');

    if (tokenFromUrl) {
      Cookies.set('token', tokenFromUrl);
      localStorage.setItem('token', tokenFromUrl);
    }

    if (roleFromUrl) {
      Cookies.set('role', roleFromUrl);
      localStorage.setItem('role', roleFromUrl);
    }

    const token = tokenFromUrl || Cookies.get('token') || localStorage.getItem('token');
    const role = roleFromUrl || Cookies.get('role') || localStorage.getItem('role');

    if (!token) {
      setIsAllowed(false);
    } else if (allowedRoles.length === 0 || allowedRoles.includes(role)) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }

    setChecking(false);
  }, [location.search]);

  if (checking) return null; // or a loading spinner

  return isAllowed ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
