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
import { Button, SelectChangeEvent } from "@mui/material";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import Grid from "@mui/material/Grid";
import {
  formFieldStyles,
  modalStyleUtils,
  spacingUtils,
} from "../../Common/FormComponents/common/styleLibrary";

import { ErrorResponseHandler } from "../../../../common/types";
import api from "../../../../common/api";
import ModalWrapper from "../../Common/ModalWrapper/ModalWrapper";
import SelectWrapper from "../../Common/FormComponents/SelectWrapper/SelectWrapper";
import { ChangeAccessPolicyIcon } from "../../../../icons";
import CodeMirrorWrapper from "../../Common/FormComponents/CodeMirrorWrapper/CodeMirrorWrapper";

import { setModalErrorSnackMessage } from "../../../../systemSlice";
import { useAppDispatch } from "../../../../store";
import { emptyPolicy } from "../../Policies/utils";
import { useTranslation } from 'react-i18next';

const styles = (theme: Theme) =>
  createStyles({
    codeMirrorContainer: {
      marginBottom: 20,
      "& label": {
        marginBottom: ".5rem",
      },
      "& label + div": {
        display: "none",
      },
    },
    ...formFieldStyles,
    ...modalStyleUtils,
    ...spacingUtils,
  });
createStyles({
  ...modalStyleUtils,
  ...spacingUtils,
});

interface ISetAccessPolicyProps {
  classes: any;
  open: boolean;
  bucketName: string;
  actualPolicy: string;
  actualDefinition: string;
  closeModalAndRefresh: () => void;
}

const SetAccessPolicy = ({
  classes,
  open,
  bucketName,
  actualPolicy,
  actualDefinition,
  closeModalAndRefresh,
}: ISetAccessPolicyProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [accessPolicy, setAccessPolicy] = useState<string>("");
  const [policyDefinition, setPolicyDefinition] = useState<string>(emptyPolicy);
  const addRecord = (event: React.FormEvent) => {
    event.preventDefault();
    if (addLoading) {
      return;
    }
    setAddLoading(true);
    api
      .invoke("PUT", `/api/v1/buckets/${bucketName}/set-policy`, {
        access: accessPolicy,
        definition: policyDefinition,
      })
      .then((res) => {
        setAddLoading(false);
        closeModalAndRefresh();
      })
      .catch((err: ErrorResponseHandler) => {
        setAddLoading(false);
        dispatch(setModalErrorSnackMessage(err));
      });
  };

  useEffect(() => {
    setAccessPolicy(actualPolicy);
    setPolicyDefinition(
      actualDefinition
        ? JSON.stringify(JSON.parse(actualDefinition), null, 4)
        : emptyPolicy
    );
  }, [setAccessPolicy, actualPolicy, setPolicyDefinition, actualDefinition]);

  return (
    <ModalWrapper
      title={t("change_access_policy")}
      modalOpen={open}
      onClose={() => {
        closeModalAndRefresh();
      }}
      titleIcon={<ChangeAccessPolicyIcon />}
    >
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          addRecord(e);
        }}
      >
        <Grid container>
          <Grid item xs={12} className={classes.modalFormScrollable}>
            <Grid item xs={12} className={classes.formFieldRow}>
              <SelectWrapper
                value={accessPolicy}
                label={t("access_policy")}
                id="select-access-policy"
                name="select-access-policy"
                onChange={(e: SelectChangeEvent<string>) => {
                  setAccessPolicy(e.target.value as string);
                }}
                options={[
                  { value: "PRIVATE", label: t("private") },
                  { value: "PUBLIC", label: t("public") },
                  { value: "CUSTOM", label: t("custom") },
                ]}
              />
            </Grid>
            {accessPolicy === "CUSTOM" && (
              <Grid item xs={12} className={classes.codeMirrorContainer}>
                <CodeMirrorWrapper
                  label={t("write_policy")}
                  value={policyDefinition}
                  onBeforeChange={(editor, data, value) => {
                    setPolicyDefinition(value);
                  }}
                  editorHeight={"350px"}
                />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} className={classes.modalButtonBar}>
            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={() => {
                closeModalAndRefresh();
              }}
              disabled={addLoading}
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={
                addLoading || (accessPolicy === "CUSTOM" && !policyDefinition)
              }
            >
              {t("set")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </ModalWrapper>
  );
};

export default withStyles(styles)(SetAccessPolicy);
