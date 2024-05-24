"use client";

import Loader from "@/components/common/Loader";
import { useEffect, useState } from "react";

export default function HydrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return <>{hydrated ? children : <Loader />}</>;
}
