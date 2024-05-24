import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal as JoyModal,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import React, { EventHandler, useState } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

export default function Modal({
  open,
  title,
  description,
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  onClose: EventHandler<any>;
  onConfirm: EventHandler<any>;
}) {
  return (
    <JoyModal open={open} onClose={onClose}>
      <ModalDialog variant="soft" role="alertdialog">
        <div className="flex justify-between items-center relative">
          <DialogTitle
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <RiErrorWarningFill className="text-3xl text-danger" />
            {title}
          </DialogTitle>
          <ModalClose
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
            }}
          />
        </div>
        <Divider />
        <DialogContent
          sx={{
            fontSize: "0.9rem",
          }}
        >
          {description}
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="danger"
            onClick={(e) => {
              onConfirm(e);

              onClose(e);
            }}
          >
            Confirmar
          </Button>
          <Button variant="plain" color="neutral" onClick={onClose}>
            Cancelar
          </Button>
        </DialogActions>
      </ModalDialog>
    </JoyModal>
  );
}
