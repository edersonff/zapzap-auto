import React, { HTMLAttributes } from "react";

export default function Ads({ ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="relative w-full border border-neutral-300 rounded-md p-2 min-h-[200px] flex">
      <div className="absolute right-[5%] top-0 transform -translate-y-1/2 text-neutral-700 px-3 leading-3 bg-neutral-100 text-sm z-10">
        Anúncio
      </div>
      <div className="bg-neutral-200 w-full p-3 animate-pulse"></div>
    </div>
  );
}
