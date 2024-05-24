import Image from "@/components/Image";
import Link from "next/link";
import React, { useMemo } from "react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="content-container bg-dark text-white mt-10">
      <div className="mx-auto w-full content p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="#" className="flex items-center">
              <Image
                src="/merlin/logo.svg"
                width={32}
                height={32}
                className="me-3 undraggable"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                Zap Auto
              </span>
            </Link>
          </div>
        </div>
        <hr className="my-6 border-neutral-200 sm:mx-auto  lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <p className="text-small">
            © {2022}-{new Date().getFullYear()}{" "}
            <Link href="/" className="text-neutral-200 hover:underline">
              Zap Auto
            </Link>
            . Todos os direitos reservados.
          </p>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <SocialFooterItem type="instagram" href="#" />
            <SocialFooterItem type="facebook" href="#" />
            <SocialFooterItem type="linkedin" href="#" />
            <SocialFooterItem type="twitter" href="#" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SocialFooterItem({
  type,
  href,
}: {
  type: "facebook" | "twitter" | "instagram" | "linkedin";
  href: string;
}) {
  const Icon = useMemo(() => {
    const icons = {
      facebook: <FaFacebook />,
      twitter: <BsTwitter />,
      instagram: <BsInstagram />,
      linkedin: <FaLinkedinIn />,
    };
    return icons[type];
  }, [type]);

  return (
    <Link
      target="_blank"
      href={href}
      className="text-neutral-300 hover:text-neutral-200  ms-5"
    >
      {Icon}
      <span className="sr-only">{type} page</span>
    </Link>
  );
}
