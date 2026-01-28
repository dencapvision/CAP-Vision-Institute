import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../lib/auth';

type ProtectedRouteProps = {
  children: React.ReactElement;
  redirectTo?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/join-us',
}) => {
  const location = useLocation();

  if (!isLoggedIn()) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
