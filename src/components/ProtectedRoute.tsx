import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
	isAuthenticated: boolean; // Determines if the user is authenticated
	redirectPath?: string;    // Path to redirect if not authenticated (default: '/login')
	children?: React.ReactNode; // Optional: If you want to pass children instead of using Outlet
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	isAuthenticated,
	redirectPath = '/welcome',
	children,
}) => {
	if (!isAuthenticated) {
		console.log("not authed")
		return <Navigate to={redirectPath} replace />;
	}

	return <>{children}</>;
};

export default ProtectedRoute;

