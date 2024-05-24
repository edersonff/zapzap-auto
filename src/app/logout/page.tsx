"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    async function logout() {
      await signOut();
      location.href = "/auth/signin";
    }

    logout();
  }, []);

  return null;
}
