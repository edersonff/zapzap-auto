import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import * as whatsapp from "wa-sockets";
import { getUser } from "../lib/token";
import { schemaValidator } from "../lib/schema";
import { z } from "zod";
import { initWhatsappListeners } from "./listener";

export async function GET(req: NextRequest) {
  const { limit, page = 1 } = Object.fromEntries(req.nextUrl.searchParams);

  const user = await getUser();
  const whatsappQuery = prisma.whatsapp.findMany({
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

  const countWhatsappQuery = prisma.whatsapp.count({
    where: {
      userId: user.id,
    },
  });

  const [whatsapps, total] = await Promise.all([
    whatsappQuery,
    countWhatsappQuery,
  ]);

  return NextResponse.json({
    total,
    pages: Math.ceil(total / Number(limit)),
    whatsapps,
  });
}

export async function POST(req: NextRequest) {
  const user = await getUser();
  const body = await req.json();

  const schema = schemaValidator(
    {
      number: z
        .string()
        .min(1, { message: "O número é obrigatório" })
        .max(20, "O número deve ter no mínimo 20 caracteres"),
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

  const whatsappFound = await prisma.whatsapp.findFirst({
    where: {
      number,
    },
  });

  if (whatsappFound) {
    switch (whatsappFound.status) {
      case "inactive":
      case "error":
        const qr = await initWhatsappListeners(number);

        await prisma.whatsapp.update({
          where: {
            id: whatsappFound.id,
          },
          data: {
            qr: String(qr),
          },
        });

        return NextResponse.json({
          qr,
        });
      case "active":
        return NextResponse.redirect(
          req.nextUrl.origin + `/whatsapp/connect/${whatsappFound.id}`
        );

      default:
        return NextResponse.json({
          qr: whatsappFound.qr,
        });
    }
  }

  const qr = await initWhatsappListeners(number);

  await prisma.whatsapp.create({
    data: {
      number,
      status: "inactive",
      chatbotId,
      userId: user.id,
      qr: String(qr),
    },
  });

  return NextResponse.json({
    qr,
  });
}
