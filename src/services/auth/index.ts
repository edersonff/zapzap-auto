import { User } from "@prisma/client/index";
import api from "../api";
import { Partial } from "@/@types/global";

export const authService = {
  signin: async (user: Partial<User>) =>
    await api.post<string>("/auth/signin", user),
  signup: async (user: Partial<User>) =>
    await api.post<string>("/auth/signup", user),
};
