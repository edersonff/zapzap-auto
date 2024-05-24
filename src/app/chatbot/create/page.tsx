"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Button from "@/components/Button";
import Input, { Select, Textarea } from "@/components/Input";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { queryClient } from "@/provider/react-query";
import { chatbotService } from "@/services/chatbot";
import { useGetChatbotsQuery } from "@/services/chatbot/getChatbotQuery";
import { useAlertStore } from "@/store/alert";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RiRobot2Line } from "react-icons/ri";

type Inputs = {
  name: string;
  about: string;
  objectives: string;
  examples: string;
  finalize: string;
};

export default function ChatbotCreate() {
  const pushAlert = useAlertStore((state) => state.pushAlert);
  const { push } = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const {
    setValue,
    getValues,

    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit() {
    const data = getValues();

    await chatbotService.create(data);

    pushAlert({
      message: "Chatbot criado com sucesso",
      status: 200,
    });

    push("/chatbot/");
  }

  function updateInitialValues() {
    const inputs = formRef.current?.querySelectorAll(
      "input, textarea"
    ) as NodeListOf<HTMLInputElement>;

    if (inputs) {
      inputs.forEach((input) => {
        setValue(input.name.replace("chatbot-", "") as any, input.value);
      });
    }
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

  useEffect(() => {
    updateInitialValues();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Criar Chatbot" />

      <div className="grid gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <div>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                  Crie uma nova IA do Chatbot
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Cadastre um novo <b>Chatbot</b> para conectar com o Whatsapp
                  quando receber mensagens.
                </p>
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              ref={formRef}
              hidden
            >
              <Input
                input={{
                  type: "text",
                  placeholder: "Nome do Chatbot",
                  onChange: (e) => setValue("name", e.target.value),
                  required: true,
                  name: "chatbot-name",
                  defaultValue: "Chatbot",
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
                  defaultValue: `- Quando o cliente pedir para falar com algum atendente ou querer finalizar a conversa
- Quando a IA não conseguir responder a pergunta do cliente`,
                  onChange: (e) => setValue("finalize", e.target.value),
                  name: "chatbot-finalize",
                }}
                className="min-h-[200px]"
                label="Quando a IA deve finalizar a conversa"
              />

              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Criar Chatbot
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
