import axios from 'axios';
import api from './APIService';
import { Token } from '../types/Token';
import { Login, Worker } from '../types/Worker';
import { Navigate } from 'react-router-dom';

const AuthService = {
	async initUser() {
		await api.get("workers/auth").then(resolve => {

			const data: Worker = resolve.data;

			sessionStorage.setItem("divisionId", data.divisionId);
			sessionStorage.setItem("name", data.name);
		}).catch(error => {
			console.error(error || "Unknown error initializing user @ AuthService");
		});
	},


	/**
		* Authenticate the current session
	* The token returned from server is added in browser session storage
	* @returns Promise<Token>
	**/
	async login(form: Login): Promise<Token> {

		return axios.post<Token>(import.meta.env.VITE_API_URL + "workers/login", { "email": form?.email, "password": form?.password })
			.then(resolve => {
				if (resolve.status == 200) {

					sessionStorage.setItem("token", JSON.stringify(resolve.data));
					this.initUser();
				}

				return resolve.data;
			})
			.catch(reject => {

				console.error('AuthService.tsx: ' + reject);
				throw new Error(reject.respone.data?.message || 'Error while logging in');

			});


	},


	/**
		* Logout current user
	* @returns void
	*/
	logout() {
		sessionStorage.clear()
	},


	/**
		* Helper function. Checks if the sessions store a token
	* @returns boolean
	**/
	isAuthenticated() {
		const token = sessionStorage.getItem("token");
		return token && token !== '';

	},

	async getUser<Worker>() {
		return api.get<Worker>("workers/auth").then((resolve) => {


			return resolve.data;
		}).catch(error => { throw new Error(error) });
	}

}

export default AuthService;
