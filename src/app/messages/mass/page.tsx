"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Modal from "@/components/Modal";
import Pagination from "@/components/Pagination";
import { queryClient } from "@/provider/react-query";
import { bulkService } from "@/services/bulk";
import { useGetBulksQuery } from "@/services/bulk/getBulkQuery";
import { BRAND } from "@/types/brand";
import { statusColors, statusColorsWithBg, statusLabels } from "@/utils/status";
import { CircularProgress, IconButton, Tooltip } from "@mui/joy";
import { DateTime } from "luxon";
import Image from "@/components/Image";
import Link from "next/link";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

const LIMIT = 15;

export default function MassMessages() {
  const [deleting, setDeleting] = useState(0);

  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetBulksQuery({
    page: page,
    limit: LIMIT,
    type: ["now"],
  });

  async function handleDelete() {
    await bulkService.delete(deleting);

    await queryClient.invalidateQueries({
      queryKey: ["bulks", { page: page, limit: LIMIT, type: ["now"] }],
    });
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Mensagens em Massa" />

      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <div className="flex justify-between gap-5 md:gap-10 flex-col md:flex-row">
            <div>
              <h4 className="mb-3 text-xl font-semibold text-black dark:text-white">
                Mensagens em Massa
              </h4>
              <p className="mb-5 text-sm text-neutral-600 dark:text-neutral-400">
                Utilize os Whatsapp cadastrados para enviar mensagens para{" "}
                <b>vários clientes</b> de uma só vez. Com a possibilidade de
                personalizar a mensagem com o <b>nome</b>, <b>telefone</b> e{" "}
                <b>outros campos</b>.
              </p>
            </div>

            <div className="flex-center md:mb-0 mb-5 gap-2">
              <Link
                href="/messages/mass/create"
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
                      {["Id", "Mensagem", "Criação", "Status", "Ações"].map(
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
                    {data?.bulks?.map((bulk, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] pl-9 px-4 py-5 dark:border-strokedark">
                          <h5 className="font-medium text-black dark:text-white">
                            {bulk.id}
                          </h5>
                        </td>

                        <td
                          key={key}
                          className="border-b border-[#eee] px-4 py-5 dark:border-strokedark max-w-[220px]"
                        >
                          <p className="text-black dark:text-white whitespace-nowrap text-ellipsis overflow-hidden">
                            {bulk.message}
                          </p>
                        </td>

                        <td
                          key={key}
                          className="border-b border-[#eee] px-4 py-5 dark:border-strokedark max-w-[220px]"
                        >
                          <p className="text-black dark:text-white whitespace-nowrap text-ellipsis overflow-hidden">
                            {DateTime.fromISO(
                              bulk.createdAt as any
                            ).toRelative()}
                          </p>
                        </td>

                        <td
                          key={key}
                          className="border-b border-[#eee] px-4 py-5 dark:border-strokedark max-w-[220px]"
                        >
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 px-5 py-1 text-sm font-medium ${
                              statusColorsWithBg[
                                String(bulk.status) as keyof typeof statusColors
                              ]
                            }`}
                          >
                            {
                              statusLabels[
                                String(bulk.status) as keyof typeof statusLabels
                              ]
                            }
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
                              <IconButton variant="outlined" className="group">
                                <a className="group-hover:text-success">
                                  <IoEye />
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
                                onClick={() => setDeleting(bulk.id)}
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

            {!isLoading && data?.bulks?.length === 0 && (
              <div className="flex-1 flex-center py-16">
                <div className="bg-gray-2 text-center dark:bg-meta-4 p-10 rounded-md">
                  <Image
                    src="/images/undraw/schedule.svg"
                    width={200}
                    height={200}
                    alt="Agendamento Ilustração"
                    className="mx-auto"
                  />
                  <div className="flex flex-col gap-2 items-center mt-10 w-full max-w-[500px]">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                      Nenhuma mensagem em massa encontrada
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-5">
                      Envie mensagens para vários clientes de uma só vez
                      utilizando os Whatsapps cadastrados. Envie mensagens agora
                      mesmo!
                    </p>

                    <Link
                      href="/messages/mass/create"
                      className="inline-flex items-center text-sm font-bold justify-center bg-primary px-6 py-2.5  text-white hover:bg-opacity-90"
                    >
                      Crie agora
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex-1 flex-center">
                <CircularProgress />
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
        title="Excluir Mensagem"
        description="Deseja realmente excluir essa mensagem?"
        open={deleting !== 0}
        onClose={() => setDeleting(0)}
        onConfirm={handleDelete}
      />
    </DefaultLayout>
  );
}
