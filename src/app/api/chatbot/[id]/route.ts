import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../lib/token";
import { schemaValidator } from "../../lib/schema";
import { z } from "zod";
import { statusType } from "@/utils/status";

export async function GET(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getUser();

  const chatbot = await prisma.chatbot.findFirst({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  return NextResponse.json(chatbot);
}

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await req.json();

  const schema = schemaValidator(
    {
      name: z
        .string()
        .max(100, "O nome deve ter no máximo 100 caracteres")
        .optional(),
      about: z
        .string()
        .max(65535, "O sobre deve ter no máximo 65535 caracteres")
        .optional(),
      objectives: z
        .string()
        .max(65535, "Os objetivos devem ter no máximo 65535 caracteres")
        .optional(),
      examples: z
        .string()
        .max(65535, "Os exemplos devem ter no máximo 65535 caracteres")
        .optional()
        .nullable(),
      finalize: z
        .string()
        .max(65535, "O finalizador deve ter no máximo 65535 caracteres")
        .optional(),
      status: z
        .enum(statusType, {
          message: "Status inválido",
        })
        .optional(),
    },
    body
  );

  if (schema) return schema;

  const user = await getUser();
  const { name, about, objectives, examples, finalize, status } = body;

  await prisma.chatbot.update({
    where: {
      id: Number(id),
      userId: user.id,
    },
    data: { name, about, objectives, examples, finalize, status },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getUser();

  await prisma.chatbot.delete({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
