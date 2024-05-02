import React, { useState } from "react";
import { Input, InputProps } from "@mui/joy";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({
  type: __,
  endDecorator: _,
  ...props
}: InputProps) {
  const [show, setShow] = useState(false);

  const Icon = show ? FaEyeSlash : FaEye;

  return (
    <Input
      type={show ? "text" : "password"}
      endDecorator={
        <Icon onClick={() => setShow(!show)} className="cursor-pointer" />
      }
      {...props}
    />
  );
}
