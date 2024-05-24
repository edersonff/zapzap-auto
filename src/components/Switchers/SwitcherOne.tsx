import { HTMLProps, useState } from "react";

const SwitcherOne = ({
  label,
  innerRef,
  onChange,
  ...props
}: {
  label: string;
  innerRef?: React.RefObject<HTMLInputElement>;
} & HTMLProps<HTMLInputElement>) => {
  const [enabled, setEnabled] = useState<boolean>(false);

  return (
    <div className="mb-4">
      <label
        htmlFor="toggle1"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle1"
            className="sr-only"
            ref={innerRef}
            onChange={(e) => {
              setEnabled(!enabled);
              onChange && onChange(e);
            }}
            {...props}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition ${
              enabled && "!right-1 !translate-x-full !bg-primary dark:!bg-white"
            }`}
          ></div>
        </div>
        <div className="ml-3 text-sm">
          <span className="text-black dark:text-white">{label}</span>
        </div>
      </label>
    </div>
  );
};

export default SwitcherOne;
