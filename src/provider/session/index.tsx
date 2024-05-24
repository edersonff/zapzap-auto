"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  return <SessionProvider baseUrl="/api/auth">{children}</SessionProvider>;
}
