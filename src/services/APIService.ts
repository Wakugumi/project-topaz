import axios, { AxiosInstance } from 'axios';
import AuthService from './AuthService';



const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",

  }
});




// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    const rawToken = sessionStorage.getItem('token');
    const jsonToken = JSON.parse(rawToken as string);
    const token = jsonToken?.IdToken;
    const refreshToken = jsonToken?.RefreshToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.set("Refresh-Token", `${refreshToken}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




/**
 * Intercepting responses
 * API response guarantee for every success request will return { "data", "token" }.
 * This function will handle the formatted response and let the "data" field of the response contains the targeted data which is in the "obj"
 * 
 */
instance.interceptors.response.use(
  (response) => {
    if (response.status == 200 || response.status == 201) {
      const token = response.data?.token;
      const data = response.data?.data;

      response.data = data

      if (token != null || token != undefined) {
        sessionStorage.setItem("token", JSON.stringify(token));
      }
    }

    else if (response.status == 401) {
      AuthService.logout()
    }

    return response;
  },
  (error) => {
    if (error.response?.status == 401 || error.status == 401) {
      console.error('Unauthorized access - maybe redirect to login');
    }

    return Promise.reject(error);
  }
);

export default instance;
