import Link, { LinkProps } from "next/link";
import React, { useMemo } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export default function Social({
  type,
  label,
  className,
  href: url,
  ...props
}: {
  type:
    | "facebook"
    | "instagram"
    | "twitter"
    | "linkedin"
    | "github"
    | "whatsapp"
    | "email"
    | "phone";
  label: string;
  className?: string;
} & LinkProps) {
  const Icon = useMemo(() => {
    switch (type) {
      case "facebook":
        return FaFacebook;
      case "instagram":
        return FaInstagram;
      case "twitter":
        return FaTwitter;
      case "linkedin":
        return FaLinkedin;
      case "github":
        return FaGithub;
      case "whatsapp":
        return FaWhatsapp;
      case "email":
        return FaEnvelope;
      case "phone":
        return FaPhone;
      default:
        return FaFacebook;
    }
  }, [type]);

  return (
    <Link
      href={url}
      className={
        className +
        " text-neutral-800 text-2xl p-1 hover:x-[scale-110] transition-all duration-100"
      }
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <Icon />
    </Link>
  );
}
