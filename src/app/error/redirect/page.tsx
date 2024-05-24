"use client";

import Loader from "@/components/common/Loader";
import { useAlertStore } from "@/store/alert";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

type Params = {
  link: string;
  message: string;
  status: string;
};

export default function ErrorRedirect() {
  const initialized = useRef(false);

  const pushAlert = useAlertStore((state) => state.pushAlert);
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams) as Params;

  const { push } = useRouter();

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    pushAlert({
      message: params.message,
      status: Number(params.status),
    });

    push(params.link);
  }, []);

  return Loader;
}
