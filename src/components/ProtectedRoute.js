import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const token = localStorage.getItem('token');
  // check if token exists
  const isLoggedIn = token !== null;

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;