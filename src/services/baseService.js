import axios from 'axios';
import { APIS } from '@/constants/api.constant';
import useAppStore from '@/store';
import LogoutHelper from '@/utils/LogoutHelper';
import { toast } from 'sonner';
const unauthorizedCode = [401, 403];

export const BaseUrl = `${import.meta.env.VITE_APP_BASE_URL_V1}`;

const AxiosInstance = axios.create({
  timeout: 60000,
  baseURL: BaseUrl,
  headers: {
    // 'Content-Type': 'application/json',
    
    'Content-Type': 'multipart/form-data',
    'Device-Platform': 'web',
  },
});


AxiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
AxiosInstance.interceptors.response.use(
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

    response?.data?.message &&
      toast.error(response?.data?.message || 'Something went wrong');
    const isOtpVerificationError = response?.config?.url?.includes(
      APIS?.VERIFYOTP
    );
    if (
      response &&
      unauthorizedCode.includes(response?.status) &&
      !isOtpVerificationError
    ) {
      // store.dispatch(logOutSuccess());
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
