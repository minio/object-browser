// This file is part of MinIO Console Server
// Copyright (c) 2021 MinIO, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import React, { useEffect, useState } from "react";

import { DialogContentText, LinearProgress } from "@mui/material";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import { deleteDialogStyles } from "../../Common/FormComponents/common/styleLibrary";

import { ErrorResponseHandler } from "../../../../common/types";
import api from "../../../../common/api";
import ConfirmDialog from "../../Common/ModalWrapper/ConfirmDialog";
import { ConfirmDeleteIcon } from "../../../../icons";
import { setErrorSnackMessage } from "../../../../systemSlice";
import { useAppDispatch } from "../../../../store";
import { useTranslation } from 'react-i18next';

const styles = (theme: Theme) =>
  createStyles({
    wrapText: {
      maxWidth: "200px",
      whiteSpace: "normal",
      wordWrap: "break-word",
    },
    ...deleteDialogStyles,
  });

interface IResetConfiguration {
  classes: any;
  configurationName: string;
  closeResetModalAndRefresh: (reloadConfiguration: boolean) => void;

  resetOpen: boolean;
}

const ResetConfigurationModal = ({
  classes,
  configurationName,
  closeResetModalAndRefresh,
  resetOpen,
}: IResetConfiguration) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [resetLoading, setResetLoading] = useState<boolean>(false);

  useEffect(() => {
    if (resetLoading) {
      api
        .invoke("POST", `/api/v1/configs/${configurationName}/reset`)
        .then((res) => {
          setResetLoading(false);
          closeResetModalAndRefresh(true);
        })
        .catch((err: ErrorResponseHandler) => {
          setResetLoading(false);
          dispatch(setErrorSnackMessage(err));
        });
    }
  }, [closeResetModalAndRefresh, configurationName, resetLoading, dispatch]);

  const resetConfiguration = () => {
    setResetLoading(true);
  };

  return (
    <ConfirmDialog
      title={t("restore_defaults")}
      confirmText={t("yes_reset_conf")}
      isOpen={resetOpen}
      titleIcon={<ConfirmDeleteIcon />}
      isLoading={resetLoading}
      onConfirm={resetConfiguration}
      onClose={() => {
        closeResetModalAndRefresh(false);
      }}
      confirmationContent={
        <React.Fragment>
          {resetLoading && <LinearProgress />}
          <DialogContentText>
            {t("are_you_sure_reset_conf")}
            <br />
            <b className={classes.wrapText}>
              {t("note_system_may_not_accessible")}
            </b>
          </DialogContentText>
        </React.Fragment>
      }
    />
  );
};

export default withStyles(styles)(ResetConfigurationModal);
