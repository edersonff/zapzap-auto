"use client";

import React, { useState } from "react";
import { IconType } from "react-icons";
import InputMask, { Props as InputMaskProps } from "react-input-mask";

export default function Input({
  className,
  input: { ref, mask, ...input },
  label,
  Icon,
}: {
  className?: string;
  input: Partial<InputMaskProps> & {
    ref?: any;
  };
  label: string;
  Icon?: IconType;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="mb-2.5 block font-medium text-sm text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <InputMask
          mask={mask || ""}
          ref={ref}
          {...input}
          className="w-full rounded-lg border text-sm border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />

        {Icon && (
          <span className="absolute right-4 top-4">
            <Icon className="text-[#7E7E7E] text-2xl" />
          </span>
        )}
      </div>
    </div>
  );
}

export function Textarea({
  className,
  input: { ref, ...input },
  label,
  Icon,
}: {
  className?: string;
  input: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    ref?: any;
  };
  label: string;
  Icon?: IconType;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="mb-2.5 block font-medium text-sm text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <textarea
          {...input}
          ref={ref}
          className={
            className +
            " w-full rounded-lg border text-sm border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          }
        />

        {Icon && (
          <span className="absolute right-4 top-4">
            <Icon className="text-[#7E7E7E] text-2xl" />
          </span>
        )}
      </div>
    </div>
  );
}

type Option = {
  value: string;
  label: string;
  defaultChecked?: boolean;
};

export function Select({
  options,
  label,
  Icon,
  innerRef,
  onChange,
  ...props
}: {
  options: Option[];
  label: string;
  Icon?: IconType;
  innerRef?: React.RefObject<HTMLSelectElement>;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  return (
    <div className="mb-4">
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
          {Icon && <Icon className="text-[#7E7E7E] text-2xl" />}
        </span>

        <select
          onChange={(e) => {
            onChange && onChange(e);
            setIsOptionSelected(true);
          }}
          ref={innerRef}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            isOptionSelected ? "text-black dark:text-white" : ""
          }`}
          {...props}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            {label}
          </option>
          {options.map((option) => (
            <option
              value={option.value}
              className="text-body dark:text-bodydark"
            >
              {option.label}
            </option>
          ))}
        </select>

        <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  );
}
