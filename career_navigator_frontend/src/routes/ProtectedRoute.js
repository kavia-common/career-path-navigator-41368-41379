import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export function ProtectedRoute({ children }) {
  /** Redirects to /login if not authenticated */
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div role="status" aria-live="polite" className="loading">Loading...</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}
