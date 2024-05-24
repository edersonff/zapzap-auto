import React from "react";

export default function Step({
  number,
  title,
  children,
  others,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  others?: React.ReactNode;
}) {
  return (
    <div className="relative max-w-main-3 hover:bg-white py-6 px-4 group hover:text-primary-home transition-all duration-200 rounded-lg cursor-pointer">
      <div className="flex items-center gap-3 font-black mb-4">
        <h3 className="text-xl flex-center font-black w-7 h-7 bg-white group-hover:bg-primary-home rounded-full text-primary-home group-hover:text-white transition-all duration-200">
          {number}
        </h3>
        <h3>{title}</h3>
      </div>
      <p className="text-small font-medium">{children}</p>

      {others}
    </div>
  );
}
