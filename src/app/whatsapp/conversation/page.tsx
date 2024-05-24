"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import { queryClient } from "@/provider/react-query";
import { conversationService } from "@/services/conversation";
import { useGetConversationsQuery } from "@/services/conversation/getConversationQuery";
import { statusColorsWithBg, statusLabels } from "@/utils/status";
import { IconButton, Tooltip } from "@mui/joy";
import { Conversation } from "@prisma/client";
import { DateTime } from "luxon";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import ReactInputMask from "react-input-mask";

const LIMIT = 15;

export default function ConversationWhatsapp() {
  const [deleting, setDeleting] = useState(0);

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetConversationsQuery({
    page: page,
    limit: LIMIT,
  });

  async function handleDelete() {
    await conversationService.delete(deleting);

    await queryClient.invalidateQueries({
      queryKey: ["conversations", { page: page, limit: LIMIT }],
    });
  }

  const from = useCallback((conversation: Conversation) => {
    if (conversation.chatbotId) {
      return "A partir do Chatbot - " + conversation.chatbotId;
    }
    return "A partir do Agendamento - " + conversation.BulkId;
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Conversas Whatsapp" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <div className="flex justify-between md:gap-10 flex-col md:flex-row">
            <div>
              <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                Suas Conversas
              </h4>
              <p className="mb-5 text-sm text-neutral-600 dark:text-neutral-400">
                Crie e configure os <b>Chatbots IA</b> para se conectarem com o
                Whatsapp, recebendo e enviando mensagens. É possivel configurar
                o <b>sobre a empresa</b>, o <b>objetivo da IA</b>,{" "}
                <b>exemplos de conversas</b> e quando{" "}
                <b>finalizar a conversa</b>.
              </p>
            </div>
          </div>

          <div className="flex flex-col min-h-[55vh]">
            <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      {[
                        "Identificador",
                        "Whatsapp",
                        "Destinatário",
                        "Ações",
                      ].map((item, key) => (
                        <th
                          key={key}
                          className={`min-w-[220px] px-4 py-4 font-medium text-black dark:text-white ${
                            item === "Id" && "pl-9"
                          }`}
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {data?.conversations?.map((conversation, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <h5 className="font-medium text-black dark:text-white">
                            {from(conversation)}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <ReactInputMask
                            mask="+55 (99) 99999-9999"
                            value={conversation.whatsapp.number}
                            className="bg-transparent text-black dark:text-white outline-none"
                          />
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <ReactInputMask
                            mask="+55 (99) 9999-9999"
                            value={conversation.to.replace(
                              "@s.whatsapp.net",
                              ""
                            )}
                            className="bg-transparent text-black dark:text-white outline-none"
                          />
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <div className="flex items-center space-x-1 text-base">
                            <Tooltip
                              title="Visualizar"
                              size="sm"
                              color="success"
                              variant="soft"
                            >
                              <IconButton variant="outlined" className="group">
                                <Link
                                  href={`/whatsapp/connect/${conversation.id}`}
                                  className="group-hover:text-success"
                                >
                                  <IoEye />
                                </Link>
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Editar"
                              size="sm"
                              color="primary"
                              variant="soft"
                            >
                              <IconButton variant="outlined" className="group">
                                <Link
                                  href={`/whatsapp/connect/${conversation.id}/edit`}
                                  className="group-hover:text-primary"
                                >
                                  <MdEdit />
                                </Link>
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Excluir"
                              size="sm"
                              color="danger"
                              variant="soft"
                            >
                              <IconButton
                                onClick={() => setDeleting(conversation.id)}
                                variant="outlined"
                                className="group"
                              >
                                <Link
                                  href="#"
                                  className="group-hover:text-danger"
                                >
                                  <FaTrash />
                                </Link>
                              </IconButton>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination
            page={page}
            totalPages={Math.ceil(Number(data?.total) / LIMIT)}
            totalItems={Number(data?.total)}
            perPage={LIMIT}
            onPageChange={setPage}
          />
        </div>
      </div>

      <Modal
        open={deleting > 0}
        onClose={() => setDeleting(0)}
        title="Excluir Conversa"
        onConfirm={handleDelete}
        description="Deseja realmente excluir essa conversa?"
      />
    </DefaultLayout>
  );
}
