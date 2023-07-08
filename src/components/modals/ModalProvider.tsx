import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { SxProps, Theme } from "@mui/material";
import { Colors } from "src/constants";
import { useActions, useSignal } from "@dilane3/gx";
import { ModalState, ModalType } from "src/gx/signals";
import CreateFolder from "./contents/CreateFolder";
import CreateForm from "./contents/CreateForm";

export default function ModalProvider() {
  // Global state
  const { isOpened, type } = useSignal<ModalState>("modal");

  const { close } = useActions("modal");

  // Handlers
  const renderModal = () => {
    switch (type) {
      case ModalType.CREATE_FOLDER: {
        return <CreateFolder />;
      }

      case ModalType.CREATE_FORM: {
        return <CreateForm />
      }

      default:
        return null;
    }
  };

  return (
    <Modal
      open={isOpened}
      onClose={close}
      aria-labelledby="modal-modal"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styles.container}>{renderModal()}</Box>
    </Modal>
  );
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: 400,
    width: "auto",
    height: "auto",
    bgcolor: Colors.background,
    boxShadow: 24,
    p: 4,
    outline: "none",
    borderRadius: 3,
  },
};
