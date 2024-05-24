import { Bulk } from "@prisma/client";
import api from "../api";
import { Partial } from "@/@types/global";
import { BulkParams, TotalBulks } from "./type";

export const bulkService = {
  findAll: async (params: BulkParams) =>
    await api.get<TotalBulks>("/bulk", { params }),
  find: async (id: number) => await api.get<Bulk>(`/bulk/${id}`),
  create: async (bulk: Partial<Bulk>) => await api.post<string>("/bulk", bulk),
  update: async (bulk: Partial<Bulk>) => await api.put<string>("/bulk", bulk),
  delete: async (id: number) => await api.delete<string>(`/bulk/${id}`),
};
