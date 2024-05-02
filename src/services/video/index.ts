import { Video } from "@prisma/client";
import api from "../api";
import { CreateVideoType, GetAllScriptParams } from "./type";
export const scriptsService = {
  get: async (params: GetAllScriptParams) =>
    await api.get<Video[]>("/scripts", { params }),
  find: async (slug: string) => await api.get<Video>(`/scripts/${slug}`),
  script: async (data: CreateVideoType) => await api.post("/scripts", data),
  scriptMany: async (data: CreateVideoType[]) =>
    await api.post("/scripts/many", data),
};
