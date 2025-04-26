import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth();

  if (!isAuthenticated) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (currentUser?.role !== 'admin') {
    // Logged in but not an admin, redirect to dashboard (or a forbidden page)
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and is an admin
  return <>{children}</>;
};

export default AdminRoute; 