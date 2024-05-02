import React from "react";
import { links } from "../links";
import Link from "next/link";

export default function Nav({ label, url }: (typeof links)[0]) {
  return (
    <Link
      href={url}
      className={`px-4 py-4 outline-[2.25px] text-sm active:outline-dashed focus:outline-dashed group relative transition-all duration-150`}
    >
      <div className="flex-center gap-1 py-1.5">{label}</div>
      <div
        className={`w-full h-0 bg-white absolute bottom-0 left-0 opacity-0 group-hover:x-[h-1,opacity-100] transition-all duration-200`}
      />
    </Link>
  );
}
