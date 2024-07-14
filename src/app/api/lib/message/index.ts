import { Bulk, Prisma, Whatsapp } from "@prisma/client";
import * as whatsapp from "wa-sockets";
import { WASocket } from "@whiskeysockets/baileys";
import {
  BinaryNode,
  S_WHATSAPP_NET,
  getBinaryNodeChild,
  getBinaryNodeChildren,
} from "@whiskeysockets/baileys/lib/WABinary";
import WABinary_1 from "@whiskeysockets/baileys/lib/WABinary";

const formatStatus = {
  active: "Ativo",
  inactive: "Inativo",
};
export class MessageHandler {
  private session: WASocket | undefined;
  private message: string;
  constructor(
    private bulk: Prisma.BulkUncheckedCreateInput & { whatsapp: Whatsapp },
    private number: string
  ) {
    this.message = bulk.message;
  }

  private async interactiveQuery(userNodes: any, queryNode: any) {
    console.log({ userNodes, queryNode });
    const result = await this.session?.query({
      tag: "iq",
      attrs: {
        to: WABinary_1.S_WHATSAPP_NET,
        type: "get",
        xmlns: "usync",
      },
      content: [
        {
          tag: "usync",
          attrs: {
            sid: this.session.generateMessageTag(),
            mode: "query",
            last: "true",
            index: "0",
            context: "interactive",
          },
          content: [
            {
              tag: "query",
              attrs: {},
              content: [queryNode],
            },
            {
              tag: "list",
              attrs: {},
              content: userNodes,
            },
          ],
        },
      ],
    });

    console.log({ result });

    const usyncNode = (0, WABinary_1.getBinaryNodeChild)(result, "usync");
    const listNode = (0, WABinary_1.getBinaryNodeChild)(usyncNode, "list");
    const users = (0, WABinary_1.getBinaryNodeChildren)(listNode, "user");
    return users;
  }

  private async formatMessage() {
    if (!this.session) {
      throw new Error("Sessão não encontrada");
    }

    const query = { tag: "contact", attrs: {} };
    const list = [
      {
        tag: "user",
        attrs: {},
        content: [
          {
            tag: "contact",
            attrs: {},
            content: this.number,
          },
        ],
      },
    ];

    console.log({ list, query });
    const results = await this.interactiveQuery(list, query);

    console.log(
      results.map((result) => {
        const contact = getBinaryNodeChild(result, "contact");
        const name = getBinaryNodeChild(contact, "name");
        const status = getBinaryNodeChild(contact, "status");
        return {
          name: name?.content,
          status: status?.content,
        };
      })
    );

    throw new Error("Not implemented");

    // const message = this.bulk.message
    //   .replace(`{nome_salvo}`, String(name?.content))
    //   .replace(`{nome}`, String(notify?.content))
    //   .replace(`{numero}`, this.number);

    // this.message = message;

    // return message;
  }

  async send() {
    this.session = (await whatsapp.startSession(
      this.bulk.whatsapp.number
    )) as WASocket;

    await whatsapp.loadSessionsFromStorage();
    console.log("Sending message to", this.number);

    await this.formatMessage();

    await this.session?.sendMessage(this.number, {
      text: this.message,
      buttons: [
        {
          buttonId: "1",
          buttonText: {
            displayText: "Sim",
          },
        },
        {
          buttonId: "2",
          buttonText: {
            displayText: "Não",
          },
        },
      ],
    });
  }
}
