import { Usage } from "@prisma/client";
import api from "../api";

export const userService = {
  usage: async () => await api.get<Usage>("/user/usage"),
};
