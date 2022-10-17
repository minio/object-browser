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

import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { DialogContentText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setErrorSnackMessage } from "../../../systemSlice";
import { ErrorResponseHandler } from "../../../common/types";
import { ConfirmDeleteIcon } from "../../../icons";
import { encodeURLString } from "../../../common/utils";
import { IAM_PAGES } from "../../../common/SecureComponent/permissions";
import useApi from "../Common/Hooks/useApi";
import ConfirmDialog from "../Common/ModalWrapper/ConfirmDialog";
import WarningMessage from "../Common/WarningMessage/WarningMessage";
import TableWrapper from "../Common/TableWrapper/TableWrapper";
import api from "../../../common/api";
import Loader from "../Common/Loader/Loader";
import { useTranslation } from 'react-i18next';

interface IDeleteUserProps {
  closeDeleteModalAndRefresh: (refresh: boolean) => void;
  deleteOpen: boolean;
  selectedUsers: string[] | null;
  setErrorSnackMessage: typeof setErrorSnackMessage;
}

const DeleteUser = ({
  closeDeleteModalAndRefresh,
  deleteOpen,
  selectedUsers,
  setErrorSnackMessage,
}: IDeleteUserProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onDelSuccess = () => closeDeleteModalAndRefresh(true);
  const onDelError = (err: ErrorResponseHandler) => setErrorSnackMessage(err);
  const onClose = () => closeDeleteModalAndRefresh(false);

  const [deleteLoading, invokeDeleteApi] = useApi(onDelSuccess, onDelError);
  const [loadingSA, setLoadingSA] = useState<boolean>(true);
  const [hasSA, setHasSA] = useState<boolean>(false);
  const [userSAList, setUserSAList] = useState<userSACount[]>([]);

  const userLoggedIn = localStorage.getItem("userLoggedIn") || "";

  useEffect(() => {
    if (selectedUsers) {
      api
        .invoke("POST", `/api/v1/users/service-accounts`, selectedUsers)
        .then((res) => {
          setUserSAList(res.userServiceAccountList);
          if (res.hasSA) {
            setHasSA(true);
          }
          setLoadingSA(false);
        })
        .catch((err: ErrorResponseHandler) => {
          setErrorSnackMessage(err);
          setLoadingSA(false);
        });
    }
  }, [selectedUsers, setErrorSnackMessage]);

  if (!selectedUsers) {
    return null;
  }
  const renderUsers = selectedUsers.map((user) => (
    <div key={user}>
      <b>{user}</b>
    </div>
  ));
  const viewAction = (selectionElement: any): void => {
    navigate(
      `${IAM_PAGES.USERS}/${encodeURLString(selectionElement.userName)}`
    );
    onClose();
  };
  const tableActions = [
    {
      type: "view",
      onClick: viewAction,
    },
  ];

  const onConfirmDelete = () => {
    for (let user of selectedUsers) {
      if (user === userLoggedIn) {
        setErrorSnackMessage({
          errorMessage: t("delete_logged_in_error"),
          detailedError: t("delete_logged_in_error") + userLoggedIn,
        });
        closeDeleteModalAndRefresh(true);
      } else {
        invokeDeleteApi("DELETE", `/api/v1/user/${encodeURLString(user)}`);
        closeDeleteModalAndRefresh(true);
        navigate(`${IAM_PAGES.USERS}`);
      }
    }
  };

  interface userSACount {
    userName: string;
    numSAs: number;
  }

  const noSAtext =
    t("are_you_sure_delete") +
    selectedUsers.length +
    " " +
    t("user") +
    (selectedUsers.length > 1 ? "s?" : "?");

  return loadingSA ? (
    <Loader />
  ) : (
    <ConfirmDialog
      title={`${t("delete_user")}${selectedUsers.length > 1 ? "s" : ""}`}
      confirmText={t("delete")}
      isOpen={deleteOpen}
      titleIcon={<ConfirmDeleteIcon />}
      isLoading={deleteLoading}
      onConfirm={onConfirmDelete}
      onClose={onClose}
      confirmationContent={
        <DialogContentText>
          {hasSA ? (
            <Fragment>
              <WarningMessage
                label={t("delete_user_service_account_associated_deleted")}
                title={t("warning_user_selected_has_service_account")}
              />
              <TableWrapper
                itemActions={tableActions}
                columns={[
                  { label: t("username"), elementKey: "userName" },
                  {
                    label: t('associated_service_account'),
                    elementKey: "numSAs",
                  },
                ]}
                isLoading={loadingSA}
                records={userSAList}
                entityName="User Service Accounts"
                idField="userName"
                customPaperHeight="250"
              />
            </Fragment>
          ) : (
            <Fragment>
              {noSAtext}
              {renderUsers}
            </Fragment>
          )}
        </DialogContentText>
      }
    />
  );
};

const mapDispatchToProps = {
  setErrorSnackMessage,
};

const connector = connect(null, mapDispatchToProps);

export default connector(DeleteUser);
