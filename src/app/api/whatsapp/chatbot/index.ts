import { Chatbot, Message } from "@prisma/client";
import { G4F } from "g4f";

const COMMAND_BASE = `
    Regras:
    - Você é um atendente online de Whatsapp, em Português-Brasil, e você receberá mensagens de clientes que deverão ser respondidas diretamente.
    - Se você não tem a informação(sobre a loja) para responder a pergunta do cliente, você deve informar que não tem a informação e não inventar respostas ou deixar campos para prencher. Mas se for uma pergunta geral, não relacionada a loja, você pode responder até certo ponto.
    - Não repita a mesma resposta do histórico de conversas. Para não parecer mecânico.
    - Seed: {seed}

    Historico de conversas:
    $history

    Sobre a empresa:
    $about

    Objetivos:
    $objectives

    Exemplos:
    $examples

    Finalizar:
    $finalize

    - Caso algum requisito acima seja comprido retorne exatamente "action.finalize" sem mais informações, pois o sistema verificará (response === "action.finalize").

    Mensagem do usuário:
    $message

`;

export class ChatBotCreator {
  private g4f: G4F;
  private command = COMMAND_BASE;

  constructor(private chatbot: Chatbot, private history: Message[]) {
    this.g4f = new G4F();
  }

  async generateMessage(message: string) {
    let command = this.command;

    const history = this.getHistory();

    command = command.replace("{seed}", Math.random().toString());

    command = command.replace("$history", history);
    command = command.replace("$about", this.chatbot.about);
    command = command.replace("$objectives", this.chatbot.objectives);
    command = command.replace("$examples", this.chatbot.examples || "");
    command = command.replace("$finalize", this.chatbot.finalize || "");
    command = command.replace("$message", message);

    return await this.g4f.chatCompletion([
      {
        role: "user",
        content: command,
      },
    ]);
  }

  private getHistory() {
    return this.history
      .map(({ id, message, answer }) => {
        return `${id} - message: ${message} - answer: ${answer}`;
      })
      .join("\n");
  }
}
