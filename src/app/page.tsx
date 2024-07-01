"use client";

import Button, { ButtonOutlined } from "@/components/Button";
import Faq from "@/components/Faq";
import Feature from "@/components/Feature";
import Footer from "@/components/Footer";
import Image from "@/components/Image";
import Navbar from "@/components/Navbar";
import Step from "@/components/Step";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaClock, FaWhatsappSquare } from "react-icons/fa";
import { MdOutlineChatBubble } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";
import { TbFileDescription } from "react-icons/tb";
export default function Home() {
  const { push } = useRouter();

  return (
    <div className="bg-white">
      <div className="bg-neutral-100 pt-11">
        <Navbar />

        <div className="w-full py-32">
          <div className="content flex small:flex-col small:justify-center justify-between items-center gap-20">
            <div className="mb-20">
              <h1 className="text-7xl small:text-5xl text-primary-home mb-7">
                <span className="text-secondary-home">Whatsapp </span>
                Automatizado
              </h1>
              <p className="text-neutral-500 text-xs font-medium small:text-small leading-[200%] mb-12">
                Melhore o seu Whatsapp com o <b>Zap Auto</b> e transforme-o em
                uma ferramenta de marketing poderosa. Com ferramentas de{" "}
                <b>automação por IA</b>, você pode atender seus clientes de
                forma automática e gerar mais vendas.
              </p>
              <div className="flex gap-7">
                <Button
                  onClick={() => push("/auth/signup")}
                  className="big:min-w-main-3 small:flex-1"
                >
                  Melhore seu Whatsapp{" "}
                </Button>
                <ButtonOutlined
                  onClick={() => {
                    const section = document.querySelector("#faq");
                    section?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="big:min-w-main-2 small:flex-1"
                >
                  Saiba Mais
                </ButtonOutlined>
              </div>
            </div>
            <div>
              <Image
                src="/images/hero/hero.jpg"
                alt="Hero"
                width={1500}
                height={1500}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="py-24 content flex-center flex-col gap-7">
          <h2 className="text-2xl flex-center gap-3">
            Vamos lá
            <Image
              src="/images/svg/asterisk.svg"
              alt="Asterisco"
              width={18}
              height={18}
            />
          </h2>
          <Button className="min-w-main-4" onClick={() => push("/auth/signup")}>
            Melhore seu Whatsapp
          </Button>
          <Image src="/images/svg/fun.svg" alt="Fun" width={90} height={90} />
        </div>
      </div>

      <div className="py-14 border-y-[6px] border-black text-white bg-gradient-to-tr from-primary-home to-blue-900">
        <div className="content flex flex-col items-center gap-10">
          <div className="text-center relative mb-4">
            <div className="flex-center mb-3">
              <h2 className="text-[28px] font-bold">Inicie ainda hoje!</h2>
              <Image
                src="/images/svg/circled-arrow-green.svg"
                className="undraggable absolute right-3"
                alt="Circulo com seta apontando para a baixo"
                width={30}
                height={30}
              />
            </div>
            <p className="text-small font-medium max-w-main-4">
              Com apenas 3 passos você pode começar a usar o <b>Zap Auto</b>{" "}
              para conectar ao <b>Whatsapp</b>
            </p>
          </div>

          <div className="flex gap-20 small:gap-10 small:flex-col small:w-full">
            <Step
              number={1}
              title="Emparelhar telefone"
              others={
                <>
                  <Image
                    src="/images/svg/arrow-green.svg"
                    className="undraggable cursor-default absolute -top-2 -right-[70px] small:hidden z-999"
                    alt="Seta apontando para a direita"
                    width={70}
                    height={70}
                  />
                  <Image
                    src="/images/svg/arrow-green.svg"
                    className="undraggable cursor-default absolute -bottom-7 right-0 rotate-90 big:hidden z-999"
                    alt="Seta apontando para a direita"
                    width={70}
                    height={70}
                  />
                </>
              }
            >
              Emparelhe o telefone digitalizando um <b>código QR</b> para
              conectar-se ao Maytapi.
            </Step>

            <Step
              number={2}
              title="Mande mensagens"
              others={
                <>
                  <Image
                    src="/images/svg/dashed-arrow-green.svg"
                    className="undraggable cursor-default absolute bottom-4 -right-[75px] -rotate-4 small:hidden z-999"
                    alt="Seta tracejada apontando para a direita"
                    width={70}
                    height={70}
                  />
                  <Image
                    src="/images/svg/dashed-arrow-green.svg"
                    className="undraggable cursor-default absolute -bottom-12.5 -left-1 rotate-[115deg] big:hidden z-999"
                    alt="Seta tracejada apontando para a direita"
                    width={70}
                    height={70}
                  />
                </>
              }
            >
              Emparelhe o telefone digitalizando um <b>código QR</b> para
              conectar-se ao Maytapi.
            </Step>

            <Step number={3} title="Emparelhar telefone">
              Emparelhe o telefone digitalizando um <b>código QR</b> para
              conectar-se ao Maytapi.
            </Step>
          </div>
        </div>
      </div>

      <div className="w-full mt-36 mb-44">
        <div className="content">
          <div className="flex-center flex-col text-primary-home">
            <div className="text-center relative mb-28">
              <p className="text-small font-medium">Os recursos</p>
              <h2 className="text-[32px] font-black">
                Os Poderosos Recursos da{" "}
                <span className="font-normal">Zap Auto</span>
              </h2>

              <div className="flex-center my-4">
                <Image
                  src="/images/svg/bottom-heading.svg"
                  alt="Bottom heading"
                  width={103}
                  height={12}
                />
              </div>
              <p className="text-small font-medium">
                Experimente uso ilimitado com preço fixo
              </p>

              <Image
                src="/images/svg/check.svg"
                alt="Check"
                className="absolute top-10 -right-12 small:right-0"
                width={52}
                height={52}
              />
            </div>

            <div className="w-full flex flex-wrap gap-x-8 gap-y-20 basis-1/2">
              <Feature
                title="Envio de Mensagens em Massa"
                icon={
                  <FaWhatsappSquare
                    size={50}
                    color="#00E676"
                    className="cursor-pointer"
                  />
                }
              >
                Envie mensagens em massa para seus clientes com apenas um
                clique.
              </Feature>

              <Feature
                title="Automatização de Mensagens"
                icon={
                  <RiRobot2Fill
                    size={50}
                    color="#00E676"
                    className="cursor-pointer"
                  />
                }
              >
                Utilizando a versão mais inteligente de automação de
                mensagens(Chatgpt4) você pode deixar uma robô trabalhar como seu
                atendente.
              </Feature>

              <Feature
                title="Agendamento de Mensagens"
                icon={
                  <FaClock
                    size={50}
                    color="#00E676"
                    className="cursor-pointer"
                  />
                }
              >
                Agende mensagens para serem enviadas em um horário específico,
                como também para se repetir em um intervalo de tempo.
              </Feature>

              <Feature
                title="Customização de Mensagens geradas por IA"
                icon={
                  <TbFileDescription
                    size={50}
                    color="#00E676"
                    className="cursor-pointer"
                  />
                }
              >
                Personalize as mensagens geradas pela IA para que sejam mais
                humanas e se encaixem com a identidade da sua empresa.
              </Feature>

              <Feature
                title="Envio de Mensagens"
                icon={
                  <MdOutlineChatBubble
                    size={50}
                    color="#00E676"
                    className="cursor-pointer"
                  />
                }
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Eveniet, voluptatem aspernatur assumenda esse laboriosam
                accusantium quis
              </Feature>

              <Feature
                title="Envio de Mensagens"
                icon={
                  <MdOutlineChatBubble
                    size={50}
                    color="#00E676"
                    className="cursor-pointer"
                  />
                }
              >
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Eveniet, voluptatem aspernatur assumenda esse laboriosam
                accusantium quis
              </Feature>
            </div>
            <div className="w-full flex-center mt-24">
              <Button className="min-w-main-4">Comece de graça</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-14 border-y-[6px] border-black text-white bg-gradient-to-tr from-blue-900 to-primary-home">
        <div className="content flex flex-col items-center gap-10">
          <div className="text-center relative">
            <div className="flex-center mb-3">
              <h2 className="text-[28px] font-bold">Inicie ainda hoje!</h2>
            </div>
            <p className="text-small font-medium">
              Após a conexão, você pode enviar sua primeira mensagem do{" "}
              <b>WhatsApp</b> via API com o <b>idioma</b> de sua preferência.
            </p>
          </div>

          <div className="flex gap-20"></div>
        </div>
      </div>

      <div className="w-full mt-32 mb-44">
        <div className="content">
          <div className="flex-center flex-col text-primary-home">
            <div className="text-center relative mb-16">
              <p className="text-small font-medium">Planos</p>
              <h2 className="text-[26px] font-bold max-w-main-5">
                Nossos planos que atendem a todas as suas necessidades
              </h2>

              <div className="flex-center my-4">
                <Image
                  src="/images/svg/bottom-heading.svg"
                  alt="Bottom heading"
                  width={103}
                  height={12}
                />
              </div>
            </div>
            <div className="w-full relative">
              <iframe
                style={{
                  display: "block",
                  margin: "0px",
                  padding: "0px",
                  border: "medium",
                  width: "100%",
                  transition: "height 0.01s linear",
                }}
                className="sm:h-[462px] h-[900px] w-full"
                scrolling="no"
                src="/pricing/page.html"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full my-24">
        <div className="content" id="faq">
          <div className="flex-center  flex-col text-primary-home">
            <div className="text-center relative mb-20">
              <p className="text-small font-medium">Perguntas frequentes</p>
              <h2 className="text-[26px] font-bold">
                Tire suas duvidas sobre nossa aplicação
              </h2>

              <div className="flex-center my-4">
                <Image
                  src="/images/svg/bottom-heading.svg"
                  alt="Bottom heading"
                  width={103}
                  height={12}
                />
              </div>
            </div>
            <Faq question="Quais são os beneficios de usar a API do Whatsapp que oferecemos?">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, quidem.
              </p>
            </Faq>
            <Faq question="Quais são os beneficios de usar a API do Whatsapp que oferecemos?">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, quidem.
              </p>
            </Faq>
            <Faq question="Quais são os beneficios de usar a API do Whatsapp que oferecemos?">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, quidem.
              </p>
            </Faq>
            <Faq question="Quais são os beneficios de usar a API do Whatsapp que oferecemos?">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Aspernatur, quidem.
              </p>
            </Faq>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
