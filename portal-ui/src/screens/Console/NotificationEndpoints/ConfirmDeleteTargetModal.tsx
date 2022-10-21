import React from "react";
import ConfirmDialog from "../Common/ModalWrapper/ConfirmDialog";
import { ConfirmModalIcon } from "../../../icons";
import { DialogContentText } from "@mui/material";
import { useTranslation } from 'react-i18next';

const ConfirmDeleteTargetModal = ({
  onConfirm,
  onClose,
  serviceName,
  status,
}: {
  onConfirm: () => void;
  onClose: () => void;
  serviceName: string;
  status: string;
}) => {
  const { t } = useTranslation();

  return (
    <ConfirmDialog
      title={t("delete_endpoint")}
      confirmText={t("delete")}
      isOpen={true}
      titleIcon={<ConfirmModalIcon />}
      isLoading={false}
      onConfirm={onConfirm}
      onClose={onClose}
      confirmationContent={
        <React.Fragment>
          <DialogContentText>
           {t("are_you_sure_delete_notif")}
            <br />
            <b>{serviceName}</b> {t("which_is")} <b>{status}</b>
          </DialogContentText>
        </React.Fragment>
      }
    />
  );
};

export default ConfirmDeleteTargetModal;
