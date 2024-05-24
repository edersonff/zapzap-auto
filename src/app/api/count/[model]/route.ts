import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../lib/token";
import { Prisma } from "@prisma/client";

export async function GET(
  _req: NextRequest,
  { params: { model } }: { params: { model: keyof typeof prisma } }
) {
  const user = await getUser();

  const prismaModel = prisma[model] as Prisma.SubscriptionDelegate;

  switch (model) {
    case "message":
      const messages = await prisma.message.count({
        where: {
          conversation: {
            userId: user.id,
          },
        },
      });

      return NextResponse.json(messages);
    default:
      const count = await prismaModel.count({
        where: {
          userId: user.id,
        },
      });

      return NextResponse.json(count);
  }
}
