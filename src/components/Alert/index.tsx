import { Alert as AlertType, useAlertStore } from "@/store/alert";
import { IconButton, Alert as MuiAlert, colors } from "@mui/joy";
import React from "react";
import { FaInfo } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { IoIosWarning } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";

export default function Alert({ message, status }: AlertType) {
  const popAlert = useAlertStore((state) => state.popAlert);

  const removeAlert = () => {
    popAlert({ message, status });
  };

  let AlertComponent = <></>;

  const isSucess =
    status === 200 ||
    status === 201 ||
    status === 202 ||
    status === 203 ||
    status === 204 ||
    status === 205 ||
    status === 206 ||
    status === 207 ||
    status === 208 ||
    status === 226;

  if (isSucess) {
    AlertComponent = (
      <MuiAlert
        color="success"
        endDecorator={
          <IconButton variant="soft" color="success" onClick={removeAlert}>
            <IoClose className="text-2xl" />
          </IconButton>
        }
        startDecorator={<FaCheckCircle className="text-2xl" />}
        sx={{
          gap: "20px",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <div>
          <h3 className="text-lg font-bold">Sucesso</h3>
          <p className="text-sm">{message}</p>
        </div>
      </MuiAlert>
    );
  }

  const isWarning =
    status === 400 || status === 401 || status === 403 || status === 404;

  if (isWarning) {
    AlertComponent = (
      <MuiAlert
        color="warning"
        endDecorator={
          <IconButton variant="soft" color="warning" onClick={removeAlert}>
            <IoClose className="text-2xl" />
          </IconButton>
        }
        startDecorator={<IoIosWarning className="text-2xl" />}
        sx={{
          gap: "20px",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <div>
          <h3 className="text-lg font-bold">Atenção</h3>
          <p className="text-xs">{message}</p>
        </div>
      </MuiAlert>
    );
  }

  const isError = status === 500 || status === 501 || status === 502;

  if (isError) {
    AlertComponent = (
      <MuiAlert
        color="danger"
        endDecorator={
          <IconButton variant="soft" color="danger" onClick={removeAlert}>
            <IoClose className="text-2xl" />
          </IconButton>
        }
        startDecorator={<RiErrorWarningFill className="text-2xl" />}
        sx={{
          gap: "20px",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <div>
          <h3 className="text-lg font-bold">Erro</h3>
          <p className="text-sm">{message}</p>
        </div>
      </MuiAlert>
    );
  }

  const isInfo = status === 100 || status === 101;

  if (isInfo) {
    AlertComponent = (
      <MuiAlert
        color="neutral"
        endDecorator={
          <IconButton variant="soft" color="neutral" onClick={removeAlert}>
            <IoClose className="text-2xl" />
          </IconButton>
        }
        startDecorator={<FaInfo className="text-2xl" />}
        sx={{
          gap: "20px",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <div>
          <h3 className="text-lg font-bold">Informação</h3>
          <p className="text-sm">{message}</p>
        </div>
      </MuiAlert>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: "100%" }}
      transition={{ duration: 0.35, delay: 0.5, type: "tween" }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {AlertComponent}
    </motion.div>
  );
}
