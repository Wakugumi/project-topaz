import axios from 'axios';
import api from './APIService';
import { Token } from '../types/Token';
import { Login, Worker } from '../types/Worker';
import { Navigate } from 'react-router-dom';

const AuthService = {
  async initUser() {
    let user = sessionStorage.getItem("user");
    let userObj = JSON.parse(user)

    const data: Worker = userObj

    sessionStorage.setItem("divisionId", data.divisionId);
    sessionStorage.setItem("name", data.name);
  },


  /**
    * Authenticate the current session
  * The token returned from server is added in browser session storage
  * @returns Promise<Token>
  **/
  async login(form: Login): Promise<Token> {

    return axios.post(import.meta.env.VITE_API_URL + "users/login", { "email": form?.email, "password": form?.password })
      .then(resolve => {
        if (resolve.status == 200) {

          sessionStorage.setItem("token", JSON.stringify(resolve.data?.token));
          sessionStorage.setItem("user", JSON.stringify(resolve.data?.data))
          this.initUser();
          return resolve.data;
        }


      })
      .catch(reject => {

        console.error('AuthService.tsx: ' + reject);
        throw new Error(reject || 'Error while logging in');

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

    const data = JSON.parse(sessionStorage.getItem('user') as string);
    return data as Worker;

  }

}

export default AuthService;
