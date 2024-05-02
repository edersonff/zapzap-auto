"use client";

import React from "react";
import NextImage, { ImageProps } from "next/image";

export default function Image({ className, ...props }: ImageProps) {
  return (
    <NextImage
      onDragStart={(e) => e.preventDefault()}
      className={`undraggable unselectable ${className}`}
      {...props}
    />
  );
}
