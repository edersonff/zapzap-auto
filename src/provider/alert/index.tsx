"use client";

import { useAlertStore } from "@/store/alert";
import Alert from "@/components/Alert";
import { AnimatePresence } from "framer-motion";

export default function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const alerts = useAlertStore((state) => state.alerts);

  return (
    <>
      <div className="full-fixed z-[9999] flex flex-col justify-start p-2 items-end pointer-events-none gap-2">
        <AnimatePresence>
          {alerts.map((alert, index) => (
            <Alert key={index} message={alert.message} status={alert.status} />
          ))}
        </AnimatePresence>
      </div>
      {children}
    </>
  );
}
