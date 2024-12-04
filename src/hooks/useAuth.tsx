import { useState } from 'react';
import AuthService from '../services/AuthService';

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	if (AuthService.isAuthenticated()) setIsAuthenticated(true);
	else setIsAuthenticated(false)

	return { isAuthenticated };
};
