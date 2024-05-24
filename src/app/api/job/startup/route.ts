import { NextResponse } from "next/server";
import { prisma } from "@/db";
import * as whatsapp from "wa-sockets";
import { ChatBotCreator } from "../../whatsapp/chatbot";
import { DateTime } from "luxon";
import { Message } from "@prisma/client";
import { initWhatsappListeners } from "../../whatsapp/listener";

export async function POST() {
  const whatsapps = await prisma.whatsapp.findMany({
    where: {
      status: {
        not: "error",
      },
    },
  });

  for (const { number } of whatsapps) {
    await whatsapp.startSession(number);
  }

  initWhatsappListeners();

  return NextResponse.json({
    message: "Sessões carregadas",
  });
}
