import api from "../api";
import { prisma } from "@/db";

export type Model = keyof typeof prisma;

export const countService = {
  find: async (model: Model) =>
    await api.get<number>("/count/" + String(model)),
};
