"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import MapOne from "../Maps/MapOne";
import { useGetCountQuery } from "@/services/count/getConversationQuery";
import Loader from "../common/Loader";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiMedalFill, RiRobot2Fill } from "react-icons/ri";
import { useSession } from "next-auth/react";

const ECommerce: React.FC = () => {
  const { data: chatbots, isLoading: isLoadingChat } =
    useGetCountQuery("chatbot");
  const { data: whatsapps, isLoading: isLoadingWhatsapp } =
    useGetCountQuery("whatsapp");
  const { data: conversations, isLoading: isLoadingConversations } =
    useGetCountQuery("conversation");

  const { data: session } = useSession() as any;

  if (isLoadingChat || isLoadingWhatsapp || isLoadingConversations) {
    return <Loader />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Quantas IA estão cadastradas"
          total={chatbots + " Chatbots"}
          rate=""
          isEmpty={chatbots === 0}
          isEmptyProperties={{
            title: "Nenhuma IA cadastrada",
            subtitle: "Crie uma IA para começar a interagir com seus clientes",
            link: "/chatbot",
          }}
        >
          <RiRobot2Fill className="fill-primary dark:fill-white" size={22} />
        </CardDataStats>
        <CardDataStats
          title="Quantos numeros de WhatsApp estão cadastrados"
          total={whatsapps + " WhatsApps"}
          rate=""
          isEmpty={whatsapps === 0}
          isEmptyProperties={{
            title: "Nenhum WhatsApp cadastrado",
            subtitle: "Cadastre um número de WhatsApp para começar a interagir",
            link: "/whatsapp/connect",
          }}
        >
          <IoLogoWhatsapp className="fill-primary dark:fill-white" size={22} />
        </CardDataStats>
        <CardDataStats
          title="Quantas conversas(interações) foram realizadas"
          total={conversations + " Conversas"}
          rate=""
          isEmpty={conversations === 0}
          isEmptyProperties={{
            subtitle: "Cadastre um número de WhatsApp para começar a interagir",
            title: "Nenhuma conversa realizada",
            link: "/whatsapp/connect",
          }}
        >
          <IoChatboxEllipses
            className="fill-primary dark:fill-white"
            size={22}
          />
        </CardDataStats>

        <CardDataStats
          title="Status do plano"
          total={"Plano " + session?.user?.subscription}
          rate=""
          isEmpty={!session?.user?.subscription}
          isEmptyProperties={{
            title: "Plano gratuito",
            subtitle:
              "Atualize para um plano pago para ter acesso a mais funcionalidades",
            link: "/subscription",
          }}
        >
          <RiMedalFill className="fill-primary dark:fill-white" size={22} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree planId={session?.user?.subscription} />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
