import { prisma } from "@/db";
import * as whatsapp from "wa-sockets";
import { Whatsapp } from "@prisma/client";
import { DateTime } from "luxon";
import { ChatBotCreator } from "../chatbot";
import { UsageHandler } from "../../lib/usage";

import { Client, LocalAuth, Message } from "whatsapp-web.js";

export function initWhatsappListeners(number?: string) {
  if (number) {
    startWhatsappListener({ number });
    return;
  }

  prisma.whatsapp.findMany().then((whatsapps) => {
    whatsapps.forEach((whatsapp) => {
      startWhatsappListener(whatsapp);
    });
  });
}

async function startWhatsappListener(whatsapp: { number: string }) {
  const client = new Client({
    authStrategy: new LocalAuth({
      dataPath: "sessions",
      clientId: whatsapp.number,
    }),
  });

  client.on("qr", (qr) => {
    prisma.whatsapp.update({
      where: {
        number: whatsapp.number,
      },
      data: {
        qr,
      },
    });
  });

  client.once("authenticated", (session) => {
    prisma.whatsapp.update({
      where: {
        number: whatsapp.number,
      },
      data: {
        status: "active",
      },
    });
  });

  client.once("disconnected", (reason) => {
    prisma.whatsapp.update({
      where: {
        number: whatsapp.number,
      },
      data: {
        status: "error",
      },
    });
  });

  client.on("message_create", onMessage(whatsapp.number, client));

  await client.initialize();
}

const onMessage =
  (number: string, whatsapp: Client) =>
  async (message: Message) => {

    const chatbot = await prisma.chatbot.findFirst({
      include: {
        whatsapps: {
          where: {
            number: number,
          },
        },
        conversations: {
          where: {
            to: message.from,
          },
          include: {
            messages: {
              take: 3,
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });

    let conversation: any = chatbot?.conversations[0];
    let chatWhastapp = chatbot?.whatsapps[0];

    const isFinalizedToday = DateTime.fromJSDate(
      conversation?.finilizedAt
    ).hasSame(DateTime.now(), "day");

    if (!chatbot || !chatWhastapp || isFinalizedToday) {
      return;
    }

    if (!conversation) {
      await whatsapp.sendMessage(message.from, `Olá, tudo bem? Como posso te ajudar?`);

      conversation = await prisma.conversation.create({
        data: {
          to: jid,
          whatsappId: chatWhastapp.id,
          chatbotId: chatbot.id,
          userId: chatbot.userId,
        },
      });
    }

    whatsapp.sendTyping({
      sessionId: sessionId,
      to: jid,
      duration: 3000,
    });

    const bot = new ChatBotCreator(chatbot, conversation?.messages || []);

    const response = await bot.generateMessage(msg);

    if (response === "action.finalize") {
      await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          finilizedAt: new Date(),
        },
      });

      await whatsapp.sendTextMessage({
        sessionId: sessionId,
        to: jid,
        text: "Vamos finalizar a conversa, um atendente irá te responder em breve. \nObrigado por entrar em contato. 🙂",
        // answering: message?.conversation,
      } as any);

      return;
    }

    await whatsapp.sendTextMessage({
      sessionId: sessionId,
      to: jid,
      text: response,
      // answering: message?.conversation,
    } as any);

    await prisma.message.deleteMany({
      where: {
        conversationId: conversation.id,
        id: {
          notIn: conversation.messages.map((msg: Message) => msg.id),
        },
      },
    });

    prisma.message.create({
      data: {
        message: msg,
        answer: response,
        conversationId: conversation.id,
      },
    });

    const usage = new UsageHandler(chatbot.userId);
    usage.updateMessageUsage();
  };
