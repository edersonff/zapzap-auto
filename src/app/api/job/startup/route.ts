import { NextResponse } from "next/server";
import { prisma } from "@/db";
import * as whatsapp from "wa-sockets";
import { ChatBotCreator } from "../../whatsapp/chatbot";
import { DateTime } from "luxon";
import { Message } from "@prisma/client";

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

export function initWhatsappListeners(number?: string) {
  if (number) {
    whatsapp.startSession(number);
    prisma.whatsapp
      .update({
        where: {
          number,
        },
        data: {
          status: "pending",
        },
      })
      .then();
  } else {
    whatsapp.loadSessionsFromStorage();
  }

  function startListeners() {
    whatsapp.onMessageReceived(onMessage(number));

    whatsapp.onDisconnected(async (sessionId) => {
      if (number && number !== sessionId) {
        return;
      }

      await prisma.whatsapp.update({
        where: {
          number: sessionId,
        },
        data: {
          status: "error",
        },
      });
    });

    whatsapp.onConnected(async (sessionId) => {
      if (number && number !== sessionId) {
        return;
      }

      await prisma.whatsapp.update({
        where: {
          number: sessionId,
        },
        data: {
          status: "active",
        },
      });
    });

    whatsapp.onQRUpdated(async ({ sessionId, qr }) => {
      if (number && number !== sessionId) {
        return;
      }

      await prisma.whatsapp.update({
        where: {
          number: sessionId,
        },
        data: {
          qr,
        },
      });
    });
  }

  if (!number) {
    return startListeners();
  }

  return new Promise<string>((resolve) => {
    startListeners();

    whatsapp.onQRUpdated(async ({ sessionId, qr }) => {
      if (sessionId === number) {
        resolve(qr);
      }

      await prisma.whatsapp.update({
        where: {
          number: sessionId,
        },
        data: {
          qr,
        },
      });
    });
  });
}

const onMessage =
  (number?: string) =>
  async ({ key, message, sessionId }: whatsapp.MessageReceived) => {
    const jid = key.remoteJid;
    const msg = message?.extendedTextMessage?.text || message?.conversation;

    const interruptVerification =
      !jid || key?.fromMe || key?.remoteJid?.includes("status") || !msg;

    const isSameNumber = !number || number === sessionId;

    if (interruptVerification || !isSameNumber) {
      return;
    }

    const chatbot = await prisma.chatbot.findFirst({
      include: {
        whatsapps: {
          where: {
            number: sessionId,
          },
        },
        conversations: {
          where: {
            to: jid,
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
      await whatsapp.sendTextMessage({
        sessionId: sessionId,
        to: jid,
        text: `Olá, tudo bem? Como posso te ajudar?`,
      });

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

    await prisma.message.create({
      data: {
        message: msg,
        answer: response,
        conversationId: conversation.id,
      },
    });
  };
