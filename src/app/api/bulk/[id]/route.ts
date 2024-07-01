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

  const bulk = await prisma.bulk.findFirst({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  return NextResponse.json(bulk);
}

export async function PUT(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await req.json();

  const schema = schemaValidator(
    {
      numbers: z
        .string()
        .min(1, { message: "Os números de envio são obrigatórios" })
        .max(65535, "Os números de envio devem ter no máximo 65535 caracteres"),
      message: z
        .string()
        .min(1, { message: "A mensagem é obrigatória" })
        .max(65535, "A mensagem deve ter no máximo 65535 caracteres"),
      whatsappId: z.number().int({ message: "O whatsapp é inválido" }),
      type: z.enum(
        [
          "now",
          "daily",
          "hourly",
          "minute",
          "monthly",
          "specific",
          "weekly",
          "yearly",
        ],
        { message: "O tipo de envio é inválido" }
      ),
      time: z.string().optional(),
    },
    body
  );

  if (schema) return schema;

  const user = await getUser();
  const { numbers, message, type, time, status } = body;

  await prisma.bulk.update({
    where: {
      id: Number(id),
      userId: user.id,
    },
    data: { numbers, message, type, time, status },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const user = await getUser();

  await prisma.bulk.delete({
    where: {
      id: Number(id),
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
