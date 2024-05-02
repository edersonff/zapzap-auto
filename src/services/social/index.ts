import api from "../api";
import { CreateSocial, Social } from "./type";
export const socialsService = {
  get: async () => await api.get<Social[]>("/social"),
  find: async (id: number) => await api.get<Social>(`/social/${id}`),
  script: async (data: CreateSocial) => await api.post("/social", data),
  put: async (id: number, data: Partial<CreateSocial>) =>
    await api.put(`/social/${id}`, data),
  delete: async (id: number) => await api.delete(`/social/${id}`),
};
