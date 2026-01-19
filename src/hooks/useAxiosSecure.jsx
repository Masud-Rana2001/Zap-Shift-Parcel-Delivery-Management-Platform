import axios from 'axios';
import { useEffect } from 'react';
import useAuthProvider from './useAuthProvider';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: "https://zap-shift-server-blue.vercel.app"
});

function useAxiosSecure() {
  const navigate = useNavigate();
  const { user, logout } = useAuthProvider();
  

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        console.log(error);

        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          logout();
          navigate("/logout")
          
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user,logout,navigate]);

  return axiosSecure;
}

export default useAxiosSecure;
