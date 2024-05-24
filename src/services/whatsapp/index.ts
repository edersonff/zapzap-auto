import { Whatsapp } from "@prisma/client";
import api from "../api";
import { Partial } from "@/@types/global";
import { TotalWhatsapps } from "./type";
import { Params } from "@/@types/api/get";

export const whatsappService = {
  findAll: async (params: Params) =>
    await api.get<TotalWhatsapps>("/whatsapp", { params }),
  find: async (id: number) => await api.get<Whatsapp>(`/whatsapp/${id}`),
  create: async (whatsapp: Partial<Whatsapp>) =>
    await api.post<{ qr: string }>("/whatsapp", whatsapp),
  update: async (whatsapp: Partial<Whatsapp>) =>
    await api.put<string>("/whatsapp", whatsapp),
  delete: async (id: number) => await api.delete<string>(`/whatsapp/${id}`),
};
