// This file is part of MinIO Console Server
// Copyright (c) 2022 MinIO, Inc.
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

import React, { Fragment } from "react";
import { Box } from "@mui/material";
import {
  ArrowRightIcon,
  BucketsIcon,
  DrivesIcon,
  HealIcon,
  PrometheusErrorIcon,
  ServersIcon,
  TotalObjectsIcon,
  UptimeIcon,
} from "../../../../icons";
import HelpBox from "../../../../common/HelpBox";
import { calculateBytes, representationNumber } from "../../../../common/utils";
import { IDriveInfo, Usage } from "../types";
import StatusCountCard from "./StatusCountCard";
import groupBy from "lodash/groupBy";
import ServersList from "./ServersList";
import CounterCard from "./CounterCard";
import ReportedUsage from "./ReportedUsage";
import { DiagnosticsMenuIcon } from "../../../../icons/SidebarMenus";
import RBIconButton from "../../Buckets/BucketDetails/SummaryItems/RBIconButton";
import { Link } from "react-router-dom";
import { IAM_PAGES } from "../../../../common/SecureComponent/permissions";
import TimeStatItem from "../TimeStatItem";
import { useTranslation } from 'react-i18next';

const BoxItem = ({ children }: { children: any }) => {
  return (
    <Box
      sx={{
        border: "1px solid #f1f1f1",
        padding: {
          md: "15px",
          xs: "5px",
        },
        height: "136px",
        maxWidth: {
          sm: "100%",
        },
      }}
    >
      {children}
    </Box>
  );
};

interface IDashboardProps {
  usage: Usage | null;
}

const getServersList = (usage: Usage | null) => {
  if (usage !== null) {
    return usage.servers.sort(function (a, b) {
      const nameA = a.endpoint.toLowerCase();
      const nameB = b.endpoint.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  return [];
};

const prettyUsage = (usage: string | undefined) => {
  if (usage === undefined) {
    return { total: "0", unit: "Mi" };
  }

  return calculateBytes(usage);
};

const BasicDashboard = ({ usage }: IDashboardProps) => {
  const { t } = useTranslation();

  const usageValue = usage && usage.usage ? usage.usage.toString() : "0";
  const usageToRepresent = prettyUsage(usageValue);

  const { lastScan = "n/a", lastHeal = "n/a", upTime = "n/a" } = usage || {};

  const serverList = getServersList(usage || null);

  let allDrivesArray: IDriveInfo[] = [];

  serverList.forEach((server) => {
    const drivesInput = server.drives.map((drive) => {
      return drive;
    });

    allDrivesArray = [...allDrivesArray, ...drivesInput];
  });

  const serversGroup = groupBy(serverList, "state");
  const { offline: offlineServers = [], online: onlineServers = [] } =
    serversGroup;
  const drivesGroup = groupBy(allDrivesArray, "state");
  const { offline: offlineDrives = [], ok: onlineDrives = [] } = drivesGroup;

  return (
    <Box
      sx={{
        maxWidth: "1536px",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "1fr",
          gridTemplateColumns: "1fr",
          gap: "27px",
          marginBottom: "40px",
          marginTop: "40px",
          marginLeft: "40px",
          marginRight: "40px",
        }}
      >
        <Box>
          {usage?.prometheusNotReady && (
            <HelpBox
              iconComponent={<PrometheusErrorIcon />}
              title={t('cant_retrieve_metrics')}
              help={
                <Fragment>
                  {t("console_display_basic_metrics")}
                  <br /> <br />
                  {t("try_again_few_minutes")}
                </Fragment>
              }
            />
          )}

          {!usage?.prometheusNotReady && (
            <HelpBox
              iconComponent={<PrometheusErrorIcon />}
              title={"We can’t retrieve advanced metrics at this time."}
              help={
                <Box>
                  <Box
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    {t("dashboard_display_basic_couldnt_connect_prometheus")}
                  </Box>
                </Box>
              }
            />
          )}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "136px",
              gridTemplateColumns: {
                sm: "1fr 1fr 1fr",
                xs: "1fr",
              },
              gap: {
                md: "20px",
                xs: "20px",
              },
            }}
          >
            <BoxItem>
              <CounterCard
                label={"Buckets"}
                icon={<BucketsIcon />}
                counterValue={usage ? representationNumber(usage.buckets) : 0}
                actions={
                  <Link
                    to={IAM_PAGES.BUCKETS}
                    style={{
                      zIndex: 999,
                      textDecoration: "none",
                      top: "40px",
                      position: "relative",
                      marginRight: "75px",
                    }}
                  >
                    <RBIconButton
                      tooltip={t("browse")}
                      onClick={() => {}}
                      text={t("browse")}
                      icon={<ArrowRightIcon />}
                      color={"primary"}
                      variant={"outlined"}
                    />
                  </Link>
                }
              />
            </BoxItem>
            <BoxItem>
              <CounterCard
                label={"Objects"}
                icon={<TotalObjectsIcon />}
                counterValue={usage ? representationNumber(usage.objects) : 0}
              />
            </BoxItem>

            <BoxItem>
              <StatusCountCard
                onlineCount={onlineServers.length}
                offlineCount={offlineServers.length}
                label={t("servers")}
                icon={<ServersIcon />}
              />
            </BoxItem>
            <BoxItem>
              <StatusCountCard
                offlineCount={offlineDrives.length}
                onlineCount={onlineDrives.length}
                label={t("drives")}
                icon={<DrivesIcon />}
              />
            </BoxItem>

            <Box
              sx={{
                gridRowStart: "1",
                gridRowEnd: "3",
                gridColumnStart: "3",
                border: "1px solid #f1f1f1",
                padding: "15px",
                display: "grid",
                justifyContent: "stretch",
              }}
            >
              <ReportedUsage
                usageValue={usageValue}
                total={usageToRepresent.total}
                unit={usageToRepresent.unit}
              />

              <Box
                sx={{
                  display: "flex",
                  flexFlow: "column",
                  gap: "14px",
                }}
              >
                <TimeStatItem
                  icon={<HealIcon />}
                  label={
                    <Box>
                      <Box
                        sx={{
                          display: {
                            md: "inline",
                            xs: "none",
                          },
                        }}
                      >
                        {t("time_since_last")}
                      </Box>{" "}
                      {t("heal_activity")}
                    </Box>
                  }
                  value={lastHeal}
                />
                <TimeStatItem
                  icon={<DiagnosticsMenuIcon />}
                  label={
                    <Box>
                      <Box
                        sx={{
                          display: {
                            md: "inline",
                            xs: "none",
                          },
                        }}
                      >
                        {t("time_since_last")}
                      </Box>{" "}
                      {t("scan_activity")}
                    </Box>
                  }
                  value={lastScan}
                />
                <TimeStatItem
                  icon={<UptimeIcon />}
                  label={t("uptime")}
                  value={upTime}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto",
              gridTemplateColumns: "1fr",
              gap: "auto",
            }}
          >
            <ServersList data={serverList} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BasicDashboard;
