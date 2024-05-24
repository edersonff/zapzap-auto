import { prisma } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Bulk, BulkType, Prisma } from "@prisma/client";
import * as whatsapp from "wa-sockets";
import { getUser } from "@/app/api/lib/token";
import { schemaValidator } from "@/app/api/lib/schema";

export async function GET(req: NextRequest) {
  const {
    limit,
    page = 1,
    type,
  }: {
    limit?: number;
    page?: number;
    type?: BulkType[];
  } = Object.fromEntries(req.nextUrl.searchParams);

  const user = await getUser();

  const bulkQuery = prisma.bulk.findMany({
    where: {
      userId: user.id,

      ...(type ? { type: { in: type } } : {}),
    },

    ...(limit
      ? {
          take: Number(limit),
          skip: Number(limit) * (Number(page) - 1),
        }
      : {}),
  });

  const countBulkQuery = prisma.bulk.count({
    where: {
      userId: user.id,
    },
  });

  const [bulks, total] = await Promise.all([bulkQuery, countBulkQuery]);

  return NextResponse.json({
    total,
    pages: Math.ceil(total / Number(limit)),
    bulks: bulks,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await getUser();

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

  const { numbers, whatsappId, message, type, time } = body;

  if (type === "now") {
    await nowBulk({
      numbers,
      message,
      whatsappId,
      type,
      time: new Date(),
      status: "active",
      userId: user.id,
    });
  } else {
    await prisma.bulk.create({
      data: {
        numbers,
        message,
        whatsappId,
        type,
        time,
        status: "active",
        userId: user.id,
      },
    });
  }

  return NextResponse.json({
    created: true,
  });
}

async function nowBulk(bulk: Prisma.BulkUncheckedCreateInput) {
  const phones = bulk.numbers.split("\n");
  const jids = phones.map((phone) =>
    whatsapp.phoneToJid({
      to: phone,
    })
  );

  await prisma.bulk.create({
    data: bulk,
  });

  const whatsapps = await prisma.whatsapp.findFirst({
    where: {
      id: bulk.whatsappId,
    },
  });

  const conversations = await prisma.conversation.findMany({
    where: {
      userId: bulk.userId,
      whatsappId: bulk.whatsappId,
      to: {
        in: jids,
      },
    },
  });

  try {
    for (const phone of phones) {
      let conversation = conversations.find((conversation) =>
        conversation.to.includes(phone)
      );

      if (!conversation) {
      }
    }
  } catch (error) {
    console.log(error);
  }

  return;
}
