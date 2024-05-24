import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../lib/token";

export async function GET(req: NextRequest) {
  const { limit, page = 1 } = Object.fromEntries(req.nextUrl.searchParams);

  const user = await getUser();

  const findConversationQuery = prisma.conversation.findMany({
    where: {
      userId: user.id,
    },

    select: {
      id: true,
      to: true,
      chatbotId: true,
      BulkId: true,
      userId: true,
      finilizedAt: true,
      whatsappId: true,
      whatsapp: {
        select: {
          id: true,
          number: true,
          status: true,
        },
      },
    },

    ...(limit
      ? {
          take: Number(limit),
          skip: Number(limit) * (Number(page) - 1),
        }
      : {}),
  });

  const countConversationQuery = prisma.conversation.count({
    where: {
      userId: user.id,
    },
  });

  const [conversations, total] = await Promise.all([
    findConversationQuery,
    countConversationQuery,
  ]);

  return NextResponse.json({
    total,
    pages: Math.ceil(total / Number(limit)),
    conversations,
  });
}
