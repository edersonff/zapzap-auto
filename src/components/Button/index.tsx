"use client";

import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes, useMemo, useState } from "react";

export default function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${className} bg-secondary-home border border-primary-home shadow text-xs text-primary-home undraggable font-semibold rounded-md p-[10px] hover:bg-secondary-home/85 transition-all duration-200`}
      {...props}
    >
      {children}
    </button>
  );
}
export function ButtonOutlined({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div className={`${className} relative group`}>
      <button
        className="border relative z-10 w-full bg-white border-primary-home shadow-anim text-xs text-primary-home undraggable font-semibold rounded-md p-[10px] hover:bg-[#77d499] transition-all duration-200"
        {...props}
      >
        {children}
      </button>
      <div className="absolute border border-primary-home rounded-md top-1 left-1 w-full h-full group-hover:bg-primary-home/40 transition-all duration-200"></div>
    </div>
  );
}
