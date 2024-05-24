import React from "react";

export default function Feature({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="big:flex-[45%]">
      <div className="flex items-center gap-7 mb-[18px]">
        {icon}
        <h3 className="text-xl font-black">{title}</h3>
      </div>
      <p className="text-small font-medium">{children}</p>
    </div>
  );
}
