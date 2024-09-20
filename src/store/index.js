import { create } from 'zustand';

const useAppStore = create((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  token: null,
  setToken: (token) => set({ token }),
  user: null,
  setUser: (user) => set({ user }),
  permissions: null,
  setPermission: (permissions) => set({ permissions }),
}));

export default useAppStore;
