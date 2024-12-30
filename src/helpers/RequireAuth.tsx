import React from "react";
import { useNavigate } from "react-router";
import AuthService from '../services/AuthService';

interface RequireAuthProps {
	Component: React.FC
}

const RequireAuth = ({ Component } : RequireAuthProps) => {
	const navigate = useNavigate();

	if (AuthService.isAuthenticated()) {
		return <Component />;
	} else {
		navigate("/login");
	}
}

export default RequireAuth;