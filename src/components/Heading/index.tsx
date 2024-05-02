import Image from "@/components/Image";
import React from "react";

export default function Heading({
  subtitle,
  children,
  align = "left",
  white = false,
}: {
  subtitle: string;
  children: React.ReactNode;
  align?: "center" | "left";
  white?: boolean;
}) {
  if (white) {
    return (
      <div className="text-white">
        <p className="text-[15px] mb-2 font-semibold">{subtitle}</p>
        <h2 className="text-5xl mb-7 leading-[1.2]">{children}</h2>
        <Image
          src="/img/svg/bottom-heading-white.svg"
          alt="Zap Auto Logo"
          width={103}
          height={12}
          className="mb-8 undraggable"
        />
      </div>
    );
  }

  if (align === "center") {
    return (
      <div className="text-center">
        <p className="text-primary text-[15px] mb-2 font-semibold">
          {subtitle}
        </p>
        <h2 className="text-5xl mb-7 leading-[1.2]">{children}</h2>
        <div className="flex-center">
          <Image
            src="/img/svg/bottom-heading.svg"
            alt="Zap Auto Logo"
            width={103}
            height={12}
            className="mb-8 undraggable"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-primary text-[15px] mb-2 font-semibold">{subtitle}</p>
      <h2 className="text-5xl mb-7 leading-[1.2]">{children}</h2>
      <Image
        src="/img/svg/bottom-heading.svg"
        alt="Zap Auto Logo"
        width={103}
        height={12}
        className="mb-8 undraggable"
      />
    </div>
  );
}
