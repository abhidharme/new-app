import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Authentication Error
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {error === 'AccessDenied'
            ? 'You do not have permission to access this page.'
            : 'An error occurred during authentication. Please try again.'}
        </p>
        <div className="mt-6">
          <Link to="/auth/login">
            <Button>Return to Login</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
