import Providers from "@/provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Gerenciamento de Vídeos de memes",
    default: "Dropshipping - Gerenciamento de Vídeos de memes",
  },
  description:
    "A Dropshipping oferece soluções de Gerenciamento de Vídeos de memes. Nossa equipe especializada desenvolve ferramentas adaptadas às necessidades específicas de cada negócio. Contate-nos para descobrir como podemos ajudar a impulsionar o seu sucesso.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
    languages: {
      pt: "/",
      en: "/en",
      "pt-BR": "/",
      "en-US": "/en",
    },
  },

  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: {
      template: "%s - Gerenciamento de Vídeos de memes",
      default: "Dropshipping - Gerenciamento de Vídeos de memes",
    },
    description:
      "A Dropshipping oferece soluções de Gerenciamento de Vídeos de memes. Nossa equipe especializada desenvolve ferramentas adaptadas às necessidades específicas de cada negócio. Contate-nos para descobrir como podemos ajudar a impulsionar o seu sucesso.",
    images: [
      {
        url: "/og/image.jpg",
        width: 1280,
        height: 720,
        alt: "Zap Auto Tecnologia",
      },
    ],
  },

  applicationName: "Zap Auto Tecnologia",
  referrer: "origin-when-cross-origin",
  creator: "Zap Auto Tecnologia",
  keywords: [
    "Dublagem de Vídeos",
    "Gerenciamento de Vídeos",
    "Gerenciamento de Redes Sociais",
    "Gerenciamento de Socials",
    "Integração com Redes Sociais",
    "Integração com APIs",
    "Integração com TikTok",
    "Integração com YouTube",
    "Integração com Instagram",
    "Integração com Pinterest",
    "Integração com Twitter",
    "Integração com Snapchat",
    "Integração com Telegram",
    "Integração com Meta",
    "Gerenciamento de Comentários",
    "Respostas Automáticas",
    "Análise de Dados",
  ],
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
