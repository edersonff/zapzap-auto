import { Chatbot } from "@prisma/client";

export type TotalChatbots = {
  total: number;
  pages: number;
  chatbots: Chatbot[];
};
