import { Params } from "@/@types/api/get";
import { Bulk, BulkType } from "@prisma/client";

export type TotalBulks = {
  total: number;
  pages: number;
  bulks: Bulk[];
};

export type BulkParams = Params & {
  type?: BulkType[];
};
