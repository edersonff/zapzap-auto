import { Whatsapp } from "@prisma/client";

export type TotalWhatsapps = {
  total: number;
  pages: number;
  whatsapps: Whatsapp[];
};
