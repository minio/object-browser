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

import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import { Box, Grid } from "@mui/material";
import get from "lodash/get";
import {
  BucketObjectLocking,
  BucketQuota,
  BucketVersioning,
} from "../types";
import { BucketList } from "../../Watch/types";
import {
  spacingUtils,
  textStyleUtils,
} from "../../Common/FormComponents/common/styleLibrary";
import {
  ErrorResponseHandler,
  IRetentionConfig,
} from "../../../../common/types";
import api from "../../../../common/api";

import { IAM_SCOPES } from "../../../../common/SecureComponent/permissions";
import {
  hasPermission,
  SecureComponent,
} from "../../../../common/SecureComponent";

import withSuspense from "../../Common/Components/withSuspense";
import LabelValuePair from "../../Common/UsageBarWrapper/LabelValuePair";
import LabelWithIcon from "./SummaryItems/LabelWithIcon";
import { DisabledIcon, EnabledIcon } from "../../../../icons";
import EditablePropertyItem from "./SummaryItems/EditablePropertyItem";
import ReportedUsage from "./SummaryItems/ReportedUsage";
import SectionTitle from "../../Common/SectionTitle";
import { selDistSet, setErrorSnackMessage } from "../../../../systemSlice";
import {
  selBucketDetailsInfo,
  selBucketDetailsLoading,
  setBucketDetailsLoad,
} from "./bucketDetailsSlice";
import { useAppDispatch } from "../../../../store";
import { useTranslation } from 'react-i18next';
import BucketHealthInfo from "./BucketHealthInfo";


const SetAccessPolicy = withSuspense(
  React.lazy(() => import("./SetAccessPolicy"))
);
const SetRetentionConfig = withSuspense(
  React.lazy(() => import("./SetRetentionConfig"))
);
const EnableVersioningModal = withSuspense(
  React.lazy(() => import("./EnableVersioningModal"))
);
const BucketTags = withSuspense(
  React.lazy(() => import("./SummaryItems/BucketTags"))
);

const styles = (theme: Theme) =>
  createStyles({
    ...spacingUtils,
    ...textStyleUtils,
  });

const twoColCssGridLayoutConfig = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" },
  gridAutoFlow: { xs: "dense", sm: "row" },
  gap: 2,
};

interface IBucketSummaryProps {
  classes: any;
}

const BucketSummary = ({ classes }: IBucketSummaryProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const params = useParams();

  const loadingBucket = useSelector(selBucketDetailsLoading);
  const bucketInfo = useSelector(selBucketDetailsInfo);

  const distributedSetup = useSelector(selDistSet);
  const [bucketSize, setBucketSize] = useState<string>("0");
  const [hasObjectLocking, setHasObjectLocking] = useState<boolean>(false);
  const [accessPolicyScreenOpen, setAccessPolicyScreenOpen] =
    useState<boolean>(false);
  const [loadingObjectLocking, setLoadingLocking] = useState<boolean>(true);
  const [loadingSize, setLoadingSize] = useState<boolean>(true);
  const [bucketLoading, setBucketLoading] = useState<boolean>(true);
  const [loadingVersioning, setLoadingVersioning] = useState<boolean>(true);
  const [loadingRetention, setLoadingRetention] = useState<boolean>(true);
  const [isVersioned, setIsVersioned] = useState<boolean>(false);
  const [retentionEnabled, setRetentionEnabled] = useState<boolean>(false);
  const [retentionConfig, setRetentionConfig] =
    useState<IRetentionConfig | null>(null);
  const [retentionConfigOpen, setRetentionConfigOpen] =
    useState<boolean>(false);

  const [enableVersioningOpen, setEnableVersioningOpen] =
    useState<boolean>(false);

  const bucketName = params.bucketName || "";

  let accessPolicy = "n/a";
  let policyDefinition = "";

  if (bucketInfo !== null) {
    accessPolicy = bucketInfo.access;
    policyDefinition = bucketInfo.definition;
  }

  const displayGetBucketObjectLockConfiguration = hasPermission(bucketName, [
    IAM_SCOPES.S3_GET_BUCKET_OBJECT_LOCK_CONFIGURATION,
  ]);

  useEffect(() => {
    if (loadingBucket) {
      setBucketLoading(true);
    } else {
      setBucketLoading(false);
    }
  }, [loadingBucket, setBucketLoading]);

  useEffect(() => {
    if (loadingVersioning && distributedSetup) {
      api
        .invoke("GET", `/api/v1/buckets/${bucketName}/versioning`)
        .then((res: BucketVersioning) => {
          setIsVersioned(res.is_versioned);
          setLoadingVersioning(false);
        })
        .catch((err: ErrorResponseHandler) => {
          dispatch(setErrorSnackMessage(err));
          setLoadingVersioning(false);
        });
    }
  }, [loadingVersioning, dispatch, bucketName, distributedSetup]);


  useEffect(() => {
    if (loadingVersioning && distributedSetup) {
      if (displayGetBucketObjectLockConfiguration) {
        api
          .invoke("GET", `/api/v1/buckets/${bucketName}/object-locking`)
          .then((res: BucketObjectLocking) => {
            setHasObjectLocking(res.object_locking_enabled);
            setLoadingLocking(false);
          })
          .catch((err: ErrorResponseHandler) => {
            dispatch(setErrorSnackMessage(err));
            setLoadingLocking(false);
          });
      } else {
        setLoadingLocking(false);
      }
    }
  }, [
    loadingObjectLocking,
    dispatch,
    bucketName,
    loadingVersioning,
    distributedSetup,
    displayGetBucketObjectLockConfiguration,
  ]);

  useEffect(() => {
    if (loadingSize) {
      api
        .invoke("GET", `/api/v1/buckets`)
        .then((res: BucketList) => {
          const resBuckets = get(res, "buckets", []);
          
          const bucketInfo = resBuckets.find(
            (bucket) => bucket.name === bucketName
          );

          const size = get(bucketInfo, "size", "0");

          setLoadingSize(false);
          setBucketSize(size);
        })
        .catch((err: ErrorResponseHandler) => {
          setLoadingSize(false);
          dispatch(setErrorSnackMessage(err));
        });
    }
  }, [loadingSize, dispatch, bucketName]);

  useEffect(() => {
    if (loadingRetention && hasObjectLocking) {
      api
        .invoke("GET", `/api/v1/buckets/${bucketName}/retention`)
        .then((res: IRetentionConfig) => {
          setLoadingRetention(false);
          setRetentionEnabled(true);
          setRetentionConfig(res);
        })
        .catch((err: ErrorResponseHandler) => {
          setRetentionEnabled(false);
          setLoadingRetention(false);
          setRetentionConfig(null);
        });
    }
  }, [loadingRetention, hasObjectLocking, bucketName]);

  const loadAllBucketData = () => {
    dispatch(setBucketDetailsLoad(true));
    setBucketLoading(true);
    setLoadingSize(true);
    setLoadingVersioning(true);
    setLoadingRetention(true);
  };

  const setBucketVersioning = () => {
    setEnableVersioningOpen(true);
  };

  const closeSetAccessPolicy = () => {
    setAccessPolicyScreenOpen(false);
    loadAllBucketData();
  };

  const closeRetentionConfig = () => {
    setRetentionConfigOpen(false);
    loadAllBucketData();
  };

  const closeEnableVersioning = (refresh: boolean) => {
    setEnableVersioningOpen(false);
    if (refresh) {
      loadAllBucketData();
    }
  };

  // @ts-ignore
  return (
    <Fragment>
      {accessPolicyScreenOpen && (
        <SetAccessPolicy
          bucketName={bucketName}
          open={accessPolicyScreenOpen}
          actualPolicy={accessPolicy}
          actualDefinition={policyDefinition}
          closeModalAndRefresh={closeSetAccessPolicy}
        />
      )}
      {retentionConfigOpen && (
        <SetRetentionConfig
          bucketName={bucketName}
          open={retentionConfigOpen}
          closeModalAndRefresh={closeRetentionConfig}
        />
      )}
      {enableVersioningOpen && (
        <EnableVersioningModal
          closeVersioningModalAndRefresh={closeEnableVersioning}
          modalOpen={enableVersioningOpen}
          selectedBucket={bucketName}
          versioningCurrentState={isVersioned}
        />
      )}

      <SectionTitle>{t("summary")}</SectionTitle>
      <Grid container spacing={1}>
        <SecureComponent
          scopes={[IAM_SCOPES.S3_GET_BUCKET_POLICY]}
          resource={bucketName}
        >
          <Grid item xs={12}>
            <Box sx={{ ...twoColCssGridLayoutConfig }}>
              <Box sx={{ ...twoColCssGridLayoutConfig }}>
                <SecureComponent
                  scopes={[IAM_SCOPES.S3_GET_BUCKET_POLICY]}
                  resource={bucketName}
                >
                  <EditablePropertyItem
                    iamScopes={[IAM_SCOPES.S3_PUT_BUCKET_POLICY]}
                    resourceName={bucketName}
                    property={t("access_policy")+":"}
                    value={t(accessPolicy.toLowerCase())}
                    onEdit={() => {
                      setAccessPolicyScreenOpen(true);
                    }}
                    isLoading={bucketLoading}
                  />
                </SecureComponent>

                <SecureComponent
                  scopes={[IAM_SCOPES.S3_GET_BUCKET_OBJECT_LOCK_CONFIGURATION]}
                  resource={bucketName}
                >
                  <LabelValuePair
                    label={t("object_locking")+":"}
                    value={
                      <LabelWithIcon
                        icon={
                          hasObjectLocking ? <EnabledIcon /> : <DisabledIcon />
                        }
                        label={
                          <label className={classes.textMuted}>
                            {hasObjectLocking ? t("enabled") : t("disabled")}
                          </label>
                        }
                      />
                    }
                  />
                </SecureComponent>
                <Box className={classes.spacerTop}>
                  <LabelValuePair
                    label={t("tags"+":")}
                    value={<BucketTags bucketName={bucketName} />}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  alignItems: "flex-start",
                }}
              >
                <ReportedUsage bucketSize={bucketSize} />
              </Box>
            </Box>
          </Grid>
        </SecureComponent>

        {distributedSetup && (
          <SecureComponent
            scopes={[IAM_SCOPES.S3_GET_BUCKET_VERSIONING]}
            resource={bucketName}
          >
            <Grid item xs={12}>
              <SectionTitle>{t("versioning")}</SectionTitle>

              <Box
                sx={{
                  ...twoColCssGridLayoutConfig,
                }}
              >
                <Box
                  sx={{
                    ...twoColCssGridLayoutConfig,
                  }}
                >
                  <EditablePropertyItem
                    iamScopes={[IAM_SCOPES.S3_PUT_BUCKET_VERSIONING]}
                    resourceName={bucketName}
                    property={"Current Status:"}
                    value={isVersioned ? t("versioned") : t("unversioned")}
                    onEdit={setBucketVersioning}
                    isLoading={loadingVersioning}
                  />
                </Box>
              </Box>
            </Grid>
          </SecureComponent>
        )}

        {hasObjectLocking && (
          <SecureComponent
            scopes={[IAM_SCOPES.S3_GET_OBJECT_RETENTION]}
            resource={bucketName}
          >
            <Grid item xs={12}>
              <SectionTitle>{t("retention")}</SectionTitle>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" },
                  gridAutoFlow: { xs: "dense", sm: "row" } /* NEW */,
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "2fr 1fr" },
                    gridAutoFlow: { xs: "dense", sm: "row" } /* NEW */,
                    gap: 2,
                  }}
                >
                  <EditablePropertyItem
                    iamScopes={[IAM_SCOPES.ADMIN_SET_BUCKET_QUOTA]}
                    resourceName={bucketName}
                    property={t("retention")+":"}
                    value={retentionEnabled ? t("enabled") : t("disabled")}
                    onEdit={() => {
                      setRetentionConfigOpen(true);
                    }}
                    isLoading={loadingRetention}
                  />

                  <LabelValuePair
                    label={"Mode:"}
                    value={
                      <label
                        className={classes.textMuted}
                        style={{ textTransform: "capitalize" }}
                      >
                        {retentionConfig && retentionConfig.mode
                          ? retentionConfig.mode
                          : "-"}
                      </label>
                    }
                  />
                  <LabelValuePair
                    label={t("validity")+":"}
                    value={
                      <label
                        className={classes.textMuted}
                        style={{ textTransform: "capitalize" }}
                      >
                        {retentionConfig && retentionConfig.validity}{" "}
                        {retentionConfig &&
                          (retentionConfig.validity === 1
                            ? retentionConfig.unit.slice(0, -1)
                            : retentionConfig.unit)}
                      </label>
                    }
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    alignItems: "flex-start",
                  }}
                >
                  {/*Spacer*/}
                </Box>
              </Box>
            </Grid>
          </SecureComponent>
        )}
      </Grid>
      <BucketHealthInfo></BucketHealthInfo>
    </Fragment>
  );
};

export default withStyles(styles)(BucketSummary);
