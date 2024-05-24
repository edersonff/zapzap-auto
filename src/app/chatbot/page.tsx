"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import { queryClient } from "@/provider/react-query";
import { chatbotService } from "@/services/chatbot";
import { useGetChatbotsQuery } from "@/services/chatbot/getChatbotQuery";
import { BRAND } from "@/types/brand";
import { IconButton, Tooltip } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const LIMIT = 15;

export default function Chatbots() {
  const [deleting, setDeleting] = useState(0);

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetChatbotsQuery({
    page: page,
    limit: LIMIT,
  });

  async function handleDelete() {
    await chatbotService.delete(deleting);

    await queryClient.invalidateQueries({
      queryKey: ["chatbots", { page: page, limit: LIMIT }],
    });
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Conectar Chatbot" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <div className="flex justify-between md:gap-10 flex-col md:flex-row">
            <div>
              <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                Seus Chatbots
              </h4>
              <p className="mb-5 text-sm text-neutral-600 dark:text-neutral-400">
                Visualize as conversas que foram criadas para outros Whatsapp a
                partir de um <b>Chatbot</b> ou de um <b>Agendamento</b>{" "}
                conectado ao Whatsapp. Para uma visualização geral, acesse a{" "}
                <Link href="/dashboard" className="text-primary">
                  Dashboard
                </Link>
              </p>
            </div>

            <div className="flex-center md:mb-0 mb-5 gap-2">
              <Link
                href="/chatbot/create"
                className="inline-flex items-center justify-center rounded-md bg-meta-3 px-8 py-2.5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 flex-1 md:flex-none"
              >
                Criar
              </Link>
              {/* <Link
                href="#"
                className="inline-flex items-center justify-center bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Button
              </Link> */}
            </div>
          </div>

          <div className="flex flex-col min-h-[55vh]">
            <div className="rounded-sm bg-white shadow-default dark:bg-boxdark">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      {["Nome", "Sobre", "Objetivo", "Finalizar", "Ações"].map(
                        (item, key) => (
                          <th
                            key={key}
                            className={`min-w-[220px] px-4 py-4 font-medium text-black dark:text-white ${
                              item === "Id" && "pl-9"
                            }`}
                          >
                            {item}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {data?.chatbots?.map((chatbot, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <h5 className="font-medium text-black dark:text-white">
                            {chatbot.name}
                          </h5>
                        </td>

                        {[
                          chatbot.about,
                          chatbot.objectives,
                          chatbot.finalize,
                        ].map((item, key) => (
                          <td
                            key={key}
                            className="border-b border-[#eee] px-4 py-5 dark:border-strokedark max-w-[220px]"
                          >
                            <p className="text-black dark:text-white whitespace-nowrap text-ellipsis overflow-hidden">
                              {item}
                            </p>
                          </td>
                        ))}

                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <div className="flex items-center space-x-1 text-base">
                            <Tooltip
                              title="Visualizar"
                              size="sm"
                              color="success"
                              variant="soft"
                            >
                              <IconButton variant="outlined" className="group">
                                <a className="group-hover:text-success">
                                  <IoEye />
                                </a>
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Editar"
                              size="sm"
                              color="primary"
                              variant="soft"
                            >
                              <IconButton variant="outlined" className="group">
                                <a className="group-hover:text-primary">
                                  <MdEdit />
                                </a>
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Excluir"
                              size="sm"
                              color="danger"
                              variant="soft"
                            >
                              <IconButton
                                variant="outlined"
                                onClick={() => setDeleting(chatbot.id)}
                                className="group"
                              >
                                <a className="group-hover:text-danger">
                                  <FaTrash />
                                </a>
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
        title="Excluir Chatbot"
        description="Deseja realmente excluir este Chatbot?"
        open={deleting !== 0}
        onClose={() => setDeleting(0)}
        onConfirm={handleDelete}
      />
    </DefaultLayout>
  );
}
