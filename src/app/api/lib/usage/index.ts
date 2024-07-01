import { prisma } from "@/db";
import { DateTime } from "luxon";

export class UsageHandler {
  constructor(private userId: number) {}
  async updateMessageUsage() {
    const [month, year]: string[] = DateTime.now()
      .toFormat("MM-yyyy")
      .split("-");
    const usage = await prisma.usage.findFirst({
      where: {
        userId: this.userId,
        month: +month,
        year: +year,
      },
    });

    if (usage) {
      return await prisma.usage.update({
        where: {
          id: usage.id,
        },
        data: {
          totalMessages: usage.totalMessages + 1,
        },
      });
    }

    return await prisma.usage.create({
      data: {
        totalMessages: 1,
        month: +month,
        year: +year,
        userId: this.userId,
      },
    });
  }
}
