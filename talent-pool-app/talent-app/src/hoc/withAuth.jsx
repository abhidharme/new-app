// hoc/withAuth.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingSpinner from '../components/customComponents/LoadingSpinner';

// eslint-disable-next-line no-unused-vars
const withAuth = (Component) => {
  return function WithAuth(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const pathname = location.pathname;

      const tokenFromUrl = searchParams.get('access_token');
      const roleFromUrl = searchParams.get('role');

      let token = tokenFromUrl || Cookies.get('token') || localStorage.getItem('token');
      let role = roleFromUrl || Cookies.get('role') || localStorage.getItem('role');

      if (tokenFromUrl) {
        Cookies.set('token', tokenFromUrl);
        localStorage.setItem('token', tokenFromUrl);
      }

      if (roleFromUrl) {
        Cookies.set('role', roleFromUrl);
        localStorage.setItem('role', roleFromUrl);
      }

      if (!token) {
          navigate('/');
      } else if (pathname === '/' || pathname === '/login') {
        setIsLoading(false);
        if (role === 'jobseeker') {
          navigate('/profile');
        } else if (role === 'admin') {
          navigate('/admin/explore');
        } else {
          navigate('/login'); // fallback if role is unknown
        }
      } else {
        setIsLoading(false);
      }
    }, [location]);

      if (isLoading) return <LoadingSpinner loader={isLoading} />;

    // Render the wrapped component
    return <Component {...props} />;
  };
};

export default withAuth;
