import React, { useState } from "react";

export default function Faq({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black w-main-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-4 py-3 text-left"
      >
        <h2 className="font-medium">{question}</h2>
        <svg
          className={`${
            isOpen ? "transform rotate-180" : ""
          } w-4 h-4 transition-transform`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className={"overflow-hidden transition-all duration-300"}
        style={{ maxHeight: isOpen ? "1000px" : "0px" }}
      >
        <div className="p-4 pt-2 text-sm">{children}</div>
      </div>
    </div>
  );
}
