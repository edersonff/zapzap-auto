"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Input, { Select, Textarea } from "@/components/Input";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import { bulkService } from "@/services/bulk";
import { useGetWhatsappsQuery } from "@/services/whatsapp/getWhatsappQuery";
import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaWhatsapp } from "react-icons/fa6";

export default function BulkCreate() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Enviar Mensagems" />

      <div className="grid gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <div>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                  Envie varias mensagens ao mesmo tempo
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Utilize os Whatsapp cadastrados para enviar mensagens para{" "}
                  <b>vários clientes</b> de uma só vez. Com a possibilidade de
                  personalizar a mensagem com o <b>nome</b>, <b>telefone</b> e{" "}
                  <b>outros campos</b>.
                </p>
              </div>
            </div>
            <BulkForm />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export type Inputs = {
  "bulk-numbers": string;
  "bulk-message": string;
  "bulk-whatsapp": string;
};

function BulkForm() {
  const { data: whatsapp, isLoading } = useGetWhatsappsQuery({
    page: 1,
  });

  const { register, setValue, handleSubmit } = useForm<Inputs>();

  async function onSubmit(data: Inputs) {
    const numbers = data["bulk-numbers"]
      .replaceAll(",", "\n")
      .replaceAll(" ", "\n")
      .replaceAll("\n\n", "\n")
      .replaceAll(/[^0-9\n]/g, "");

    await bulkService.create({
      numbers,
      message: data["bulk-message"],
      whatsappId: +data["bulk-whatsapp"],
      type: "now",
    });

    return;
  }

  const whatsappOptions = useMemo(() => {
    const options = whatsapp?.whatsapps?.map((item) => ({
      label: item.number,
      value: String(item.id),
    }));

    return options || [];
  }, [whatsapp]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6.5 pt-4">
        <p className="text-sm mb-6 font-medium text-neutral-600 dark:text-neutral-400">
          Caso deseje enviar mensagens recorrentes ou agendar o envio de
          mensagens, utilize a opção de{" "}
          <Link href="/messages/schedule" className="text-primary">
            Agendamentos
          </Link>
        </p>

        {!isLoading && whatsapp?.whatsapps?.length === 0 ? (
          <p>Não há nenhum whatsapp cadastrado</p>
        ) : (
          <Select
            options={[...whatsappOptions]}
            Icon={FaWhatsapp}
            onChange={(e) => {
              setValue("bulk-whatsapp", e.target.value);
            }}
            label="Selecione o Whatsapp"
          />
        )}
        <Textarea
          label="Numeros de telefone"
          input={{
            placeholder: `Exemplo de numeros de telefone:\n
11999999999
11999999998
48999999997
47999999996`,
            maxLength: 65535,
            ...register("bulk-numbers", {
              required: "Campo obrigatório",
            }),
          }}
          className="min-h-[200px]"
        />

        <Textarea
          label="Mensagem a ser enviada"
          input={{
            placeholder: `Exemplo de mensagem:\n
Olá {nome}, tudo bem? Aqui é da empresa Merlin, estamos entrando em contato para informar que temos uma promoção especial para você. Acesse nosso site e confira!`,
            defaultValue: `Olá {nome}, tudo bem? \nAqui é da empresa, estamos entrando em contato para informar ...`,
            ...register("bulk-message", {
              required: "Campo obrigatório",
              maxLength: 65535,
            }),
          }}
          className="min-h-[200px]"
        />

        {/* Variaveis da mensagem */}
        <div className="flex flex-col mb-6 mt-2">
          <div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4">
            {["Variaveis da mensagem", "Sobre"].map((item, key) => (
              <div key={key} className={`py-2.5 px-1 xl:py-5 xl:px-2.5`}>
                <h5 className="text-xs font-semibold uppercase xsm:text-sm">
                  {item}
                </h5>
              </div>
            ))}
          </div>

          {[
            {
              variable: "{nome}",
              description: "O nome que aparece no Whatsapp",
            },
            {
              variable: "{telefone}",
              description: "O telefone para qual foi enviado",
            },
            { variable: "{email}", description: "O email do contato" },
          ].map((item, key) => (
            <div
              className={`grid text-sm font-medium grid-cols-2 ${
                key % 2 === 0
                  ? "bg-gray-2 dark:bg-meta-4"
                  : ""
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <div className="p-2.5 xl:p-5">
                <p className="text-black dark:text-white font-bold">
                  {item.variable}
                </p>
              </div>

              <div className={`py-2.5 px-1 xl:py-5 xl:px-2.5`}>
                <p className="text-black dark:text-white">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="flex w-full mt-6 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
        >
          Enviar Mensagens
        </button>
      </div>
    </form>
  );
}
