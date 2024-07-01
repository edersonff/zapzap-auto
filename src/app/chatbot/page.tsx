"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Drawer from "@/components/Drawer";
import Input, { Textarea } from "@/components/Input";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import { queryClient } from "@/provider/react-query";
import { chatbotService } from "@/services/chatbot";
import { useGetChatbotsQuery } from "@/services/chatbot/getChatbotQuery";
import { useAlertStore } from "@/store/alert";
import { BRAND } from "@/types/brand";
import { CircularProgress, IconButton, Tooltip } from "@mui/joy";
import { Chatbot, Subscription } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "@/components/Image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";

const LIMIT = 15;

export default function Chatbots() {
  const { data: session } = useSession() as any;

  const [editing, setEditing] = useState<Chatbot | null>(null);
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

  const isDisabled = useMemo(() => {
    const totalChatbots = data?.total || 0;
    const subscription = session?.user?.subscription as Subscription;

    if (!subscription) {
      return totalChatbots >= 1;
    }

    if (subscription.planId === 1) {
      return totalChatbots >= 3;
    }

    if (subscription.planId === 2) {
      return totalChatbots >= 10;
    }

    return true;
  }, [session?.user?.subscription, data]);

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
                className={
                  "inline-flex items-center justify-center rounded-md bg-meta-3 px-8 py-2.5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 flex-1 md:flex-none " +
                  (isDisabled ? "disabled" : "")
                }
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
                              <IconButton
                                onClick={() => setEditing(chatbot)}
                                variant="outlined"
                                className="group"
                              >
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
            {isLoading && (
              <div className="flex-1 flex-center">
                <CircularProgress />
              </div>
            )}

            {!isLoading && data?.chatbots?.length === 0 && (
              <div className="flex-1 flex-center py-16">
                <div className="bg-gray-2 text-center dark:bg-meta-4 p-10 rounded-md">
                  <Image
                    src="/images/undraw/chatbot.svg"
                    width={200}
                    height={200}
                    alt="Chatbot Ilustração"
                    className="mx-auto"
                  />
                  <div className="flex flex-col gap-2 items-center mt-10 w-full max-w-[500px]">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                      Nenhum Chatbot encontrado
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-5">
                      Não encontramos nenhum Chatbot cadastrado em sua conta.
                      Crie um Chatbot para começar a atender seus clientes pelo
                      Whatsapp.
                    </p>

                    <Link
                      href="/chatbot/create"
                      className="inline-flex items-center text-sm font-bold justify-center bg-primary px-6 py-2.5  text-white hover:bg-opacity-90"
                    >
                      Crie agora
                    </Link>
                  </div>
                </div>
              </div>
            )}
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

      <UpdateChatbot
        editing={editing}
        setEditing={setEditing}
        onUpdated={async () => {
          await queryClient.invalidateQueries({
            queryKey: ["chatbots", { page: page, limit: LIMIT }],
          });
        }}
      />
    </DefaultLayout>
  );
}

type Inputs = {
  name: string;
  about: string;
  objectives: string;
  examples: string;
  finalize: string;
};

function UpdateChatbot({
  editing,
  setEditing,
  onUpdated,
}: {
  editing: Chatbot | null;
  setEditing: (value: Chatbot | null) => void;
  onUpdated?: () => Promise<void> | void;
}) {
  const pushAlert = useAlertStore((state) => state.pushAlert);

  const {
    setValue,
    getValues,

    formState: { errors },
  } = useForm<Inputs>();

  async function handleUpdate() {
    const data = getValues();

    await chatbotService.update({
      ...editing,
      ...data,
    });

    pushAlert({
      message: "Chatbot atualizado com sucesso",
      status: 200,
    });

    await onUpdated?.();

    setEditing(null);
  }

  useEffect(() => {
    if (errors) {
      for (const error in errors) {
        pushAlert({
          message: (errors as any)[error].message,
          status: 400,
        });
      }
    }
  }, [errors]);

  return (
    <Drawer
      open={editing !== null}
      title="Editar Chatbot"
      onClose={() => {
        setEditing(null);
      }}
      onConfirm={async () => {
        await handleUpdate();
        setEditing(null);
      }}
    >
      {editing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <Input
            input={{
              type: "text",
              placeholder: "Nome do Chatbot",
              onChange: (e) => setValue("name", e.target.value),
              required: true,
              name: "chatbot-name",
              defaultValue: String(editing.name),
            }}
            Icon={RiRobot2Line}
            label="Nome do Chatbot"
          />
          <Textarea
            input={{
              placeholder: `Exemplo de sobre:\n
- Somos um Ecommerce de roupas geek
- Temos 10 anos de mercado e atendemos todo o Brasil
- Nosso Whatsapp é 11 99999-9999, estamos disponíveis de segunda a sexta das 9h às 18h
- Nosso site é www.site.com.br
        `,
              required: true,
              onChange: (e) => setValue("about", e.target.value),
              name: "chatbot-about",
              maxLength: 65535,
              defaultValue: String(editing.about),
            }}
            label="Sobre sua Empresa/Loja"
            className="min-h-[200px]"
          />

          <Textarea
            input={{
              placeholder: `Exemplo de objetivos:\n
- Atender novos clientes para descobrir mais sobre a empresa
- Finalizar vendas de produtos que chegam pelo Whatsapp
- Direcionar o cliente para o site e para as redes sociais
        `,
              onChange: (e) => setValue("objectives", e.target.value),
              name: "chatbot-objectives",
              maxLength: 65535,
              defaultValue: String(editing.objectives),
            }}
            label="Qual o objetivo do Chatbot"
            className="min-h-[200px]"
          />

          <Textarea
            input={{
              placeholder: `Quando deve finalizar uma conversa:\n
- Quando o cliente pedir para finalizar a conversa
- Quando o Cliente pedir para falar com um atendente/pessoa real
- Quando a IA não conseguir responder a pergunta do cliente`,
              onChange: (e) => setValue("finalize", e.target.value),
              name: "chatbot-finalize",
              maxLength: 65535,
              defaultValue: String(editing.finalize),
            }}
            className="min-h-[200px]"
            label="Quando a IA deve finalizar a conversa"
          />
        </form>
      )}
    </Drawer>
  );
}
