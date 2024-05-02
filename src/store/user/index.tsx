import { create } from "zustand";
import { persistNSync } from "persist-and-sync";
import { createContext } from "react";

export type UserStore = {
  token: string | null;
  isAuth: boolean;
  user: any | null;
  setToken: (token: string) => void;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: any) => void;
};

const userPersist = persistNSync<UserStore>(
  (set) => ({
    token: null,
    setToken: (token) => set({ token }),
    isAuth: false,
    setIsAuth: (isAuth) => set({ isAuth }),
    user: null,
    setUser: (user) => set({ user }),
  }),
  {
    name: "user-store",
    storage: "cookies",
  }
);

export const UserStoreContext = createContext<UserStore | null>(null);

export const useUserStore = create(userPersist);
