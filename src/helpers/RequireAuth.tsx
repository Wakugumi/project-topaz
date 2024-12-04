import React from "react";
import { useNavigate } from "react-router";
import { isAuthenticated } from '../services/AuthService';

export default RequireAuth({ Component }) {
	const navigate = useNavigate();

	if (isAuthenticated()) {
		return <Component />;
	} else {
		navigate("/login");
	}
}
