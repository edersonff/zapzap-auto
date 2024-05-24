"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Input, { Select, Textarea } from "@/components/Input";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useGetChatbotsQuery } from "@/services/chatbot/getChatbotQuery";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiPhone } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { QRCodeCanvas } from "qrcode.react";
import { whatsappService } from "@/services/whatsapp";
import Loader from "@/components/common/Loader";
import { useForm } from "react-hook-form";
import { useAlertStore } from "@/store/alert";
import { chatbotService } from "@/services/chatbot";
import { queryClient } from "@/provider/react-query";

type Inputs = {
  name: string;
  about: string;
  objectives: string;
  examples: string;
  finalize: string;
};

export default function WhatsappConnectCreate() {
  const pushAlert = useAlertStore((state) => state.pushAlert);

  const chatbotRef = useRef<HTMLSelectElement>(null);
  const inputsParentRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);

  const {
    setValue,
    getValues,

    formState: { errors },
  } = useForm<Inputs>();

  const { data: chatbots, isLoading } = useGetChatbotsQuery({
    page: 1,
  });

  async function onSubmit() {
    const data = getValues();

    if (!chatbotRef.current) return;

    const { data: chatbot } = await chatbotService.create(data);

    await queryClient.invalidateQueries({
      queryKey: ["chatbots"],
    });

    chatbotRef.current.value = chatbot.id.toString();

    pushAlert({
      message: "Chatbot criado com sucesso",
      status: 200,
    });

    setStep(2);
  }

  function updateInitialValues() {
    const inputs = inputsParentRef.current?.querySelectorAll(
      "input, textarea"
    ) as NodeListOf<HTMLInputElement>;

    if (inputs) {
      inputs.forEach((input) => {
        setValue(input.name.replace("chatbot-", "") as any, input.value);
      });
    }
  }

  function setInputsHidden(isHidden: boolean) {
    if (inputsParentRef.current) {
      inputsParentRef.current.hidden = isHidden;
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

  const chatbotsOptions = useMemo(() => {
    const chatbotsMap = chatbots?.chatbots?.map(({ id, name }) => ({
      value: String(id),
      label: name + " (id " + id + ")",
    }));

    if (!chatbotsMap) return [];

    return chatbotsMap;
  }, [chatbots]);

  const isCreateChatbotChecked = useMemo(() => {
    const hasChatbots = chatbots?.chatbots?.length;

    if (!hasChatbots && !isLoading) return true;

    return false;
  }, [chatbots, isLoading]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Criar Whatsapp" />

      <div className="flex gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="h-full flex flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <div>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                  Suas IA do Chatbot
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Cadastre um <b>Chatbot</b> para conectar com o Whatsapp. Você
                  pode criar um novo ou selecionar um já existente.
                </p>
              </div>
            </div>
            <form action="#">
              <div className="p-6.5">
                <Select
                  options={[
                    {
                      value: "",
                      label: "Não selecionar Chatbot",
                    },
                    {
                      value: "criar-novo-chatbot",
                      label: "Criar novo Chatbot",
                      defaultChecked: isCreateChatbotChecked,
                    },
                    ...chatbotsOptions,
                  ]}
                  label="Selecione o Chatbot"
                  Icon={RiRobot2Line}
                  innerRef={chatbotRef}
                  onChange={(e) => {
                    switch (e.target.value) {
                      case "criar-novo-chatbot":
                        setStep(1);
                        setInputsHidden(false);
                        updateInitialValues();
                        break;
                      case "":
                        setStep(2);
                        setInputsHidden(true);
                        break;
                      default:
                        setStep(2);
                        setInputsHidden(true);
                        break;
                    }
                  }}
                />
                <div ref={inputsParentRef} hidden>
                  <Input
                    input={{
                      type: "text",
                      placeholder: "Nome do Chatbot",
                      onChange: (e) => setValue("name", e.target.value),
                      required: true,
                      name: "chatbot-name",
                      defaultValue:
                        "Chatbot " + ((chatbots?.chatbots?.length || 0) + 1),
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
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          {/* <!-- Sign In Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <div>
                <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                  Conectar Whatsapp
                </h3>
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                  Conecte por QR Code o Whatsapp com o Chatbot selecionado.
                </p>
              </div>
            </div>
            <WhatsappForm
              chatbot={chatbotRef}
              step={step}
              onSubmit={async (e) => {
                e.preventDefault();

                if (step === 1) {
                  await onSubmit();
                }

                return errors;
              }}
              onWhatsappCreated={() => {
                setStep(3);
              }}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

function WhatsappForm({
  chatbot,
  step,
  onSubmit,
  onWhatsappCreated,
}: {
  chatbot: React.RefObject<HTMLSelectElement>;
  step: number;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void | any>;
  onWhatsappCreated: () => void | Promise<void>;
}) {
  const [body, setBody] = useState<any>();
  const pushAlert = useAlertStore((state) => state.pushAlert);

  const phoneRef = useRef<HTMLInputElement>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

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

    const chatbotId = chatbot.current?.value ? +chatbot.current?.value : null;

    const { data } = await whatsappService.create({
      number: phone,
      chatbotId,
    });

    setBody({
      number: phone,
      chatbotId,
    });

    setQrCode(data.qr);

    await onWhatsappCreated();
  }

  async function updateQrCode() {
    const { data } = await whatsappService.create(body);

    setQrCode(data.qr);
  }

  useEffect(() => {
    if (step === 3) {
      setInterval(updateQrCode, 5000);
    }
  }, [step]);

  if (step !== 3)
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const errors = await onSubmit(e);

          if (Object.keys(errors).length) {
            return;
          }

          await handleGenerateQrCode();
        }}
      >
        <div className="p-6.5">
          <Input
            input={{
              type: "text",
              placeholder: "Número do Whatsapp",
              ref: phoneRef,
              mask: "(99) 99999-9999",
            }}
            className="w-full"
            Icon={FiPhone}
            label="Número"
          />

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
          >
            Gerar QR Code
          </button>
        </div>
      </form>
    );

  return (
    <div className="p-6.5">
      <div className="flex flex-col items-center">
        <div className="mb-8 text-sm text-neutral-600 dark:text-neutral-400">
          <p className="mb-4 font-medium text-black dark:text-white">
            Entre no seu Whatsapp e siga os passos para conectar com a
            plataforma
          </p>
          <ul className="list-disc list-inside">
            <li>
              Clique nos <b>3 pontos</b> no canto superior direito
            </li>
            <li>
              Selecione <b>"Dispositivos conectados"</b>
            </li>
            <li>
              Acesse <b>"Conectar um dispositivo"</b>
            </li>
            <li>Escaneie o QR Code abaixo</li>
          </ul>
        </div>

        {!qrCode ? (
          <div className="bg-white w-64 h-64 flex items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" />
          </div>
        ) : (
          <QRCodeCanvas value={qrCode || ""} size={256} />
        )}
      </div>
    </div>
  );
}
