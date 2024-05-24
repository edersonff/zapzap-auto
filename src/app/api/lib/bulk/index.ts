import { BulkType } from "@prisma/client";

export class Bulk {
  constructor(private type: BulkType) {}
}
