import { Subscription } from "@prisma/client";
import api from "../api";

export const subscriptionService = {
  get: async () => await api.get<Subscription | null>("/subscription"),
};
