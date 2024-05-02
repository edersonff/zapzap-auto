import Image from "@/components/Image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { links } from "./links";
import Nav from "./Nav";
import { AiOutlineMenu } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../Button";

export default function Navbar() {
  return (
    <>
      <NavbarItem />
    </>
  );
}

function NavbarItem({
  innerRef,
}: {
  innerRef?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div className="w-full" ref={innerRef}>
      <div className="content flex justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/merlin/logo.svg"
            alt="Logo"
            width={28}
            height={28}
            layout="fixed"
          />
          <h2 className="font-title font-bold text-primary">Zap Auto</h2>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/register"
            className="text-xs small:hidden font-semibold p-[10px] hover:text-primary/75 transition-all duration-200 rounded-md"
          >
            Comece de graça
          </Link>
          <Button className="min-w-main-2">Entrar na plataforma</Button>
        </div>
      </div>
    </div>
  );
}
