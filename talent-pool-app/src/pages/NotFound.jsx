import React from 'react';
import '../styles/NotFound.css'; // Import the custom CSS file

function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Page Not Found</p>
      <a href="/">Go Home</a>
    </div>
  );
}

export default NotFound;

