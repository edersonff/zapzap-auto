import { Conversation, Whatsapp } from "@prisma/client";

export type ConversationWithWhatsapp = Conversation & {
  whatsapp: Whatsapp;
};

export type TotalConversations = {
  total: number;
  pages: number;
  conversations: ConversationWithWhatsapp[];
};
