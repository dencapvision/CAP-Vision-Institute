import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../lib/auth';

type ProtectedRouteProps = {
  children: React.ReactElement;
  redirectTo?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
}) => {
  const [authStatus, setAuthStatus] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    isLoggedIn().then(setAuthStatus);
  }, []);

  if (authStatus === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-[#0f3460] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!authStatus) {
    return <Navigate to={redirectTo} replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
