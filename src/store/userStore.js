import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  permissions: [],
  setPermissions: (permissions) => set({ permissions }),
}));

export default useStore;
