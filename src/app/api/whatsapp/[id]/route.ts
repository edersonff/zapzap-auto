import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "../../lib/token";
import { schemaValidator } from "../../lib/schema";
import { z } from "zod";

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getUser();
  const body = await req.json();

  const schema = schemaValidator(
    {
      number: z.string().max(20, "O número deve ter no mínimo 20 caracteres"),
      chatbotId: z
        .number()
        .int("O chatbot é obrigatório")
        .nullable()
        .optional(),
    },
    body
  );

  if (schema) return schema;

  const { number, chatbotId } = body;

  const whatsappFound = await prisma.whatsapp.update({
    where: {
      id: Number(id),
      userId: user.id,
    },
    data: {
      number,
      chatbotId,
    },
  });

  return NextResponse.json(whatsappFound);
}

export async function DELETE(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getUser();

  await prisma.whatsapp.delete({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
