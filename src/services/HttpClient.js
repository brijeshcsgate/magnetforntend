import useAppStore from '@/store';
import LogoutHelper from '@/utils/LogoutHelper';
import axios from 'axios';
import { toast } from 'sonner';

const BASE_URL = `${import.meta.env.VITE_APP_BASE_URL}`;

const HttpClient = axios.create({
  timeout: 60000,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Device-Platform': 'web',
  },
});

HttpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
HttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if ([401, 403, 429].includes(response?.status)) {
      toast.error(
        response?.data?.message ||
          'Session has been expired, please login again'
      );

      const setIsAuthenticated = useAppStore.getState().setIsAuthenticated;
      const setUser = useAppStore.getState().setUser;
      const setPermissions = useAppStore.getState().setPermission;

      LogoutHelper({ setIsAuthenticated, setUser, setPermissions });
      return;
    }
    return Promise.reject(error);
  }
);

export default HttpClient;
