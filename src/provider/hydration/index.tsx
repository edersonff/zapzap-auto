"use client";

import { UserStoreContext, useUserStore } from "@/store/user";
import { useRef } from "react";

export default function HydrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useRef(useUserStore()).current;

  return (
    <UserStoreContext.Provider value={user}>
      {children}
    </UserStoreContext.Provider>
  );
}
