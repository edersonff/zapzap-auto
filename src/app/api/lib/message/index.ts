import { Bulk, Whatsapp } from "@prisma/client";
import * as whatsapp from "wa-sockets";
import { makeChatsSocket } from "@whiskeysockets/baileys/lib/Socket/chats";
import {
  BinaryNode,
  S_WHATSAPP_NET,
  getBinaryNodeChild,
  getBinaryNodeChildren,
} from "@whiskeysockets/baileys/lib/WABinary";

const formatStatus = {
  active: "Ativo",
  inactive: "Inativo",
};

export class Message {
  private message: string;
  constructor(
    private bulk: Bulk & { whatsapp: Whatsapp },
    private number: string
  ) {
    this.message = bulk.message;
  }

  private async formatMessage() {
    const session = whatsapp.getSession(this.bulk.whatsapp.number);

    const result = await session?.query({
      tag: "iq",
      attrs: {
        to: S_WHATSAPP_NET,
        type: "get",
        xmlns: "usync",
      },
      content: [
        {
          tag: "usync",
          attrs: {
            sid: session.generateMessageTag(),
            mode: "query",
            last: "true",
            index: "0",
            context: "interactive",
          },
          content: [
            {
              tag: "query",
              attrs: {},
              content: [
                { tag: "name", attrs: {} },
                { tag: "notify", attrs: {} },
                { tag: "status", attrs: {} },
              ],
            },
            {
              tag: "list",
              attrs: {},
              content: [{ tag: "user", attrs: { jid: this.number } }],
            },
          ],
        },
      ],
    });

    const usyncNode = getBinaryNodeChild(result, "usync");
    const listNode = getBinaryNodeChild(usyncNode, "list");
    const users = getBinaryNodeChildren(listNode, "user");
    const [name, notify, status] = [
      getBinaryNodeChild(users[0], "name"),
      getBinaryNodeChild(users[0], "notify"),
      getBinaryNodeChild(users[0], "status"),
    ];

    console.log(
      this.number,
      `Name: ${name?.content}, Notify: ${notify?.content}, Status: ${status?.content}`
    );

    const message = this.bulk.message
      .replace(`{nome_salvo}`, String(name?.content))
      .replace(`{nome}`, String(notify?.content))
      .replace(`{numero}`, this.number);

    this.message = message;

    return message;
  }

  async send() {
    await this.formatMessage();
    const session = whatsapp.getSession(this.bulk.whatsapp.number);

    await session?.sendMessage(this.number, {
      text: this.message,
    });
  }
}
