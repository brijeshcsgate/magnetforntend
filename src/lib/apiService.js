import useAppStore from '@/store';
import LogoutHelper from '@/utils/LogoutHelper';
import axios from 'axios';
import { toast } from 'sonner';
export const BASE_URL = `${import.meta.env.VITE_APP_BASE_URL_V1}`;

export const BASE_URL_WAPI = `${import.meta.env.VITE_APP_BASE_URL_2}`;
// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a timeout if needed
  headers: {
    'Content-Type': 'application/json',
    'Device-Platform': 'web',
  },
});
export const axiosInstanceWapi = axios.create({
  baseURL: BASE_URL_WAPI,
  timeout: 10000, // Set a timeout if needed
  headers: {
    'Content-Type': 'application/json',
    'Device-Platform': 'web',
  },
});

// Interceptors to handle request/response logging or error handling
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Interceptors to handle request/response logging or error handling
axiosInstanceWapi.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return the whole response to access headers if needed
  },
  (error) => {
    const { response } = error;

    console.log(error);

    if ([401, 403, 429].includes(response?.status)) {
      if (response?.data?.message === 'Unauthorized') {
        return Promise.reject(error);
      }

      toast.error(
        response?.data?.message ||
          'Session has been expired, please login again'
      );

      const setIsAuthenticated = useAppStore.getState().setIsAuthenticated;
      const setUser = useAppStore.getState().setUser;
      const setPermissions = useAppStore.getState().setPermission;

      LogoutHelper({ setIsAuthenticated, setUser, setPermissions });
    }
    return Promise.reject(error);
  }
);

// API service functions
const apiService = {
  get: async (endpoint, config = {}) =>
    axiosInstance.get(endpoint, config).then((response) => response.data),

  post: async (endpoint, data, config = {}) =>
    axiosInstance
      .post(endpoint, data, config)
      .then((response) => response.data),

  put: async (endpoint, data, config = {}) =>
    axiosInstance.put(endpoint, data, config).then((response) => response.data),

  patch: async (endpoint, data, config = {}) =>
    axiosInstance
      .patch(endpoint, data, config)
      .then((response) => response.data),

  delete: async (endpoint, config = {}) =>
    axiosInstance.delete(endpoint, config).then((response) => response.data),
};








// API service functions  without /api
const apiServiceWapi = {
  get: async (endpoint, config = {}) =>
    axiosInstance.get(endpoint, config).then((response) => response.data),

  post: async (endpoint, data, config = {}) =>
    axiosInstance
      .post(endpoint, data, config)
      .then((response) => response.data),

  put: async (endpoint, data, config = {}) =>
    axiosInstance.put(endpoint, data, config).then((response) => response.data),

  patch: async (endpoint, data, config = {}) =>
    axiosInstance
      .patch(endpoint, data, config)
      .then((response) => response.data),

  delete: async (endpoint, config = {}) =>
    axiosInstance.delete(endpoint, config).then((response) => response.data),
};
export default apiService;
