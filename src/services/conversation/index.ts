import { Conversation } from "@prisma/client";
import api from "../api";
import { Partial } from "@/@types/global";
import { Params } from "@/@types/api/get";
import { TotalConversations } from "./type";

export const conversationService = {
  findAll: async (params: Params) =>
    await api.get<TotalConversations>("/conversation", { params }),
  find: async (id: number) =>
    await api.get<Conversation>(`/conversation/${id}`),
  create: async (conversation: Partial<Conversation>) =>
    await api.post<string>("/conversation", conversation),
  update: async (conversation: Partial<Conversation>) =>
    await api.put<string>("/conversation", conversation),
  delete: async (id: number) => await api.delete<string>(`/conversation/${id}`),
};
