import { Chatbot } from "@prisma/client";
import api from "../api";
import { Partial } from "@/@types/global";
import { Params } from "@/@types/api/get";
import { TotalChatbots } from "./type";

export const chatbotService = {
  findAll: async (params: Params) =>
    await api.get<TotalChatbots>("/chatbot", { params }),
  find: async (id: number) => await api.get<Chatbot>(`/chatbot/${id}`),
  create: async (chatbot: Partial<Chatbot>) =>
    await api.post<Chatbot>("/chatbot", chatbot),
  update: async (id: number, chatbot: Partial<Chatbot>) =>
    await api.put<string>("/chatbot" + id, chatbot),
  delete: async (id: number) => await api.delete<string>(`/chatbot/${id}`),
};
