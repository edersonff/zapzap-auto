"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetWhatsappsQuery } from "@/services/whatsapp/getWhatsappQuery";
import { statusColors, statusColorsWithBg, statusLabels } from "@/utils/status";
import InputMask from "react-input-mask";
import Image from "next/image";
import Link from "next/link";
import { IconButton, Tooltip } from "@mui/joy";
import { FaTrash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Pagination from "@/components/Pagination";
import { useEffect, useMemo, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { whatsappService } from "@/services/whatsapp";
import { queryClient } from "@/provider/react-query";
import Drawer from "@/components/Drawer";
import { useGetChatbotsQuery } from "@/services/chatbot/getChatbotQuery";
import { useAlertStore } from "@/store/alert";
import { useForm } from "react-hook-form";
import { chatbotService } from "@/services/chatbot";
import Input, { Select } from "@/components/Input";
import { RiRobot2Line } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { Whatsapp } from "@prisma/client";
import { QRCodeCanvas } from "qrcode.react";

const LIMIT = 15;

export default function ConnectWhatsapp() {
  const [editing, setEditing] = useState<Whatsapp | null>(null);
  const [deleting, setDeleting] = useState(0);

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetWhatsappsQuery({
    page: page,
    limit: LIMIT,
  });

  async function handleDelete() {
    await whatsappService.delete(deleting);

    await queryClient.invalidateQueries({
      queryKey: ["whatsapps", { page: page, limit: LIMIT }],
    });
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Conectar Whatsapp" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <div className="flex justify-between md:gap-10 flex-col md:flex-row">
            <div>
              <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                Seus números de Whatsapp
              </h4>
              <p className="mb-5 text-sm text-neutral-600 dark:text-neutral-400">
                Conecte seus números de Whatsapp para ser capaz de{" "}
                <b>enviar mensagens</b> ou conectar o <b>Chatbot</b>. O Whatsapp
                limita o numero de dispositivos conectados a 4 por número.
              </p>
            </div>

            <div className="flex-center md:mb-0 mb-5 gap-2">
              <Link
                href="/whatsapp/connect/create"
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
            <div className="rounded-sm bg-white b-2.5 shadow-default dark:bg-boxdark">
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      {["Id", "Numero", "Status", "Ações"].map((item, key) => (
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
                    {data?.whatsapps?.map((whatsapp, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark">
                          <h5 className="font-medium text-black dark:text-white">
                            {whatsapp.id}
                          </h5>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <InputMask
                            mask="(99) 99999-9999"
                            value={whatsapp.number || ""}
                            className="w-full bg-transparent text-black dark:text-white outline-none"
                          />
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                              statusColorsWithBg[whatsapp.status]
                            }`}
                          >
                            {statusLabels[whatsapp.status]}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <div className="flex items-center space-x-1 text-base">
                            <Tooltip
                              title="Visualizar"
                              size="sm"
                              color="success"
                              variant="soft"
                            >
                              <IconButton
                                variant="outlined"
                                className="group hover:bg-primary"
                              >
                                <Link
                                  href={`/whatsapp/connect/${whatsapp.id}`}
                                  className="group-hover:text-success text-black dark:text-white"
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
                              <IconButton
                                onClick={() => setEditing(whatsapp)}
                                variant="outlined"
                                className="group"
                              >
                                <a className="group-hover:text-primary text-black dark:text-white">
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
                                onClick={() => setDeleting(whatsapp.id)}
                                variant="outlined"
                                className="group"
                              >
                                <a className="group-hover:text-danger text-black dark:text-white">
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
        open={deleting > 0}
        onClose={() => setDeleting(0)}
        title="Excluir Conversa"
        onConfirm={handleDelete}
        description="Deseja realmente excluir essa conversa?"
      />

      <UpdateWhatsapp editing={editing} setEditing={setEditing} />
    </DefaultLayout>
  );
}

async function UpdateWhatsapp({
  editing,
  setEditing,
}: {
  editing: Whatsapp | null;
  setEditing: (value: Whatsapp | null) => void;
}) {
  const chatbotRef = useRef<HTMLSelectElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [body, setBody] = useState<any>();

  const { data: chatbots, isLoading } = useGetChatbotsQuery({
    page: 1,
  });

  const pushAlert = useAlertStore((state) => state.pushAlert);

  async function handleGenerateQrCode() {
    const phone = phoneRef.current?.value.replaceAll(/\D/g, "");

    if (!phone) {
      pushAlert({
        message: "Número do Whatsapp é obrigatório",
        status: 400,
      });

      return;
    }

    if (phone.length !== 11) {
      pushAlert({
        message: "Número do Whatsapp deve ter 11 caracteres",
        status: 400,
      });

      return;
    }

    const chatbotId = chatbotRef.current?.value
      ? +chatbotRef.current?.value
      : null;

    const { data } = await whatsappService.create({
      number: phone,
      chatbotId,
    });

    setBody({
      number: phone,
      chatbotId,
    });

    setQrCode(data.qr);
  }

  async function updateQrCode() {
    const { data } = await whatsappService.create(body);

    setQrCode(data.qr);
  }

  const chatbotsOptions = useMemo(() => {
    const chatbotsMap = chatbots?.chatbots?.map(({ id, name }) => ({
      value: String(id),
      label: name + " (id " + id + ")",
    }));

    if (!chatbotsMap) return [];

    return chatbotsMap;
  }, [chatbots]);

  if (editing === null) return null;

  return (
    <Drawer
      open={editing !== null}
      title="Editar Whatsapp"
      onClose={() => {
        setEditing(null);
        setQrCode(null);
      }}
      onConfirm={() => {
        updateQrCode();
        setEditing(null);
      }}
    >
      <form
        action="#"
        className="flex flex-col justify-between h-full px-4 py-4"
      >
        <div>
          <Select
            options={[
              { value: "", label: "Selecione o Chatbot" },
              ...chatbotsOptions,
            ]}
            label="Selecione o Chatbot"
            Icon={RiRobot2Line}
            innerRef={chatbotRef}
            defaultValue={String(editing.chatbotId)}
          />
          <Input
            input={{
              type: "text",
              placeholder: "Número do Whatsapp",
              ref: phoneRef,
              mask: "(99) 99999-9999",
              defaultValue: editing.number,
            }}
            className="w-full"
            Icon={FiPhone}
            label="Número"
          />
        </div>

        <div>
          <div className="flex-1 text-sm font-medium flex-center gap-2 mb-6">
            <p className="text-sm text-black dark:text-white">Status: </p>
            <p
              className={`inline-flex rounded-full bg-opacity-10 px-5 py-1 text-sm font-medium ${
                statusColorsWithBg[editing.status]
              }`}
            >
              {statusLabels[editing.status]}
            </p>
          </div>

          <div className="flex-center mb-6">
            <div className="bg-neutral-100 w-64 h-64 flex items-center justify-center">
              <p className="text-sm text-black dark:text-white">
                QR Code do Whatsapp
              </p>
              {/* <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /> */}
            </div>
            {/* <QRCodeCanvas value={""} size={256} /> */}
          </div>

          <button
            type="submit"
            className="small:w-full w-[50%] flex justify-center mx-auto rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Gerar QR Code
          </button>
        </div>
      </form>
    </Drawer>
  );
}
