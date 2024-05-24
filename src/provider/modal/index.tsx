"use client";

import Modal from "@/components/Modal";
import { useAlertStore } from "@/store/alert";
import { AnimatePresence } from "framer-motion";

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const alerts = useAlertStore((state) => state.alerts);

  return (
    <>
      <div className="full-fixed z-[99] flex flex-col justify-start p-2 items-end pointer-events-none gap-2">
        {/* {alerts.map((alert, index) => (
          <Modal key={index} message={alert.message} status={alert.status} />
        ))} */}
      </div>
      {children}
    </>
  );
}
