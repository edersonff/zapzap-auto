import Providers from "@/provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - ZapAuto",
    default: "ZapAuto - Melhore o seu WhatsApp",
  },
  description:
    "Transforme o seu Whatsapp em uma maquina de vendas com o Zap Auto. Automatize o atendimento e venda mais com ferramentas de automação por IA.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
    languages: {
      pt: "/",
      "pt-BR": "/",
    },
  },

  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: {
      template: "%s - ZapAuto",
      default: "ZapAuto - Melhore o seu WhatsApp",
    },
    description:
      "Transforme o seu Whatsapp em uma maquina de vendas com o Zap Auto. Automatize o atendimento e venda mais com ferramentas de automação por IA.",
    images: [
      {
        url: "/og/image.jpg",
        width: 1280,
        height: 720,
        alt: "ZapZap Auto",
      },
    ],
  },

  applicationName: "Zap Auto",
  referrer: "origin-when-cross-origin",
  creator: "Merlin",
  keywords: [],
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  twitter: {
    site: "@merlin.app",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <Providers>{children}</Providers>
    </html>
  );
}
