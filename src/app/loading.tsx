import Image from "@/components/Image";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed w-full h-full flex-center">
      <Image src="/merlin/logo.svg" alt="Loading Logo" width={30} height={30} />
    </div>
  );
}
