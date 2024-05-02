import { Video } from "@prisma/client";

export type GetAllScriptParams = {
  page?: number;
  limit?: number;
  category?: Category;
};

export type CreateVideoType = {
  url: string;
  sound?: string;
  length?: number;
};
