import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../lib/token";
import { schemaValidator } from "../lib/schema";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const { limit, page = 1 } = Object.fromEntries(req.nextUrl.searchParams);

  const user = await getUser();
  const chatbotQuery = prisma.chatbot.findMany({
    where: {
      userId: user.id,
    },

    ...(limit
      ? {
          take: Number(limit),
          skip: Number(limit) * (Number(page) - 1),
        }
      : {}),
  });

  const countChatbotQuery = prisma.chatbot.count({
    where: {
      userId: user.id,
    },
  });

  const [chatbots, total] = await Promise.all([
    chatbotQuery,
    countChatbotQuery,
  ]);

  return NextResponse.json({
    total,
    pages: Math.ceil(total / Number(limit)),
    chatbots,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await getUser();

  const schema = schemaValidator(
    {
      name: z.string().max(100, "O nome deve ter no máximo 100 caracteres"),
      about: z
        .string()
        .min(1, { message: "O sobre é obrigatório" })
        .max(65535, "O sobre deve ter no máximo 65535 caracteres"),
      objectives: z
        .string()
        .min(1, { message: "Os objetivos são obrigatórios" })
        .max(65535, "Os objetivos devem ter no máximo 65535 caracteres"),
      examples: z
        .string()
        .max(65535, "Os exemplos devem ter no máximo 65535 caracteres")
        .optional(),
      finalize: z
        .string()
        .max(65535, "O finalizador deve ter no máximo 65535 caracteres")
        .optional(),
    },
    body
  );

  if (schema) return schema;

  const { name, about, objectives, examples, finalize } = body;

  const chatbot = await prisma.chatbot.create({
    data: {
      name,
      about,
      objectives,
      examples,
      finalize,
      status: "active",
      userId: user.id,
    },
  });

  return NextResponse.json(chatbot);
}
