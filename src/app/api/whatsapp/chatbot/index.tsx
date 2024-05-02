import { Chatbot } from "@prisma/client";
import { G4F } from "g4f";

const COMMAND_BASE = `
    Instrução básica:
    - Você é um atendente online de Whatsapp, e você receberá mensagens de clientes que deverão ser respondidas diretamente.

    Historico de conversas:
    $history

    Sobre a empresa:
    $about

    Requisitos:
    $requirements

    Objetivos:
    $objectives

    Exemplos:
    $examples

    Adicional:
    $additional
`;

export class ChatBotCreator {
  private g4f: G4F;
  private command = COMMAND_BASE;

  constructor(private chatbot: Chatbot, private history: string) {
    this.g4f = new G4F();
  }

  generateCommand() {
    const command = this.command;

    command.replace("$history", this.history);
    command.replace("$about", this.chatbot.about);
    command.replace("$requirements", this.chatbot.requirements);
    command.replace("$objectives", this.chatbot.objectives);
    command.replace("$examples", this.chatbot.examples);
    command.replace("$additional", this.chatbot.additional);

    this.command = command;
  }
}
