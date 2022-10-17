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
import React from "react";
import { Box } from "@mui/material";
import {
  HelpIconFilled,
  IAMPoliciesIcon,
  PasswordKeyIcon,
  ServiceAccountIcon,
} from "../../../icons";
import { useTranslation } from 'react-i18next';


const FeatureItem = ({
  icon,
  description,
}: {
  icon: any;
  description: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        "& .min-icon": {
          marginRight: "10px",
          height: "23px",
          width: "23px",
          marginBottom: "10px",
        },
      }}
    >
      {icon}{" "}
      <div style={{ fontSize: "14px", fontStyle: "italic", color: "#5E5E5E" }}>
        {description}
      </div>
    </Box>
  );
};
const AddServiceAccountHelpBox = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        flex: 1,
        border: "1px solid #eaeaea",
        borderRadius: "2px",
        display: "flex",
        flexFlow: "column",
        padding: "20px",
        marginTop: {
          xs: "0px",
        },
      }}
    >
      <Box
        sx={{
          fontSize: "16px",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
          paddingBottom: "20px",

          "& .min-icon": {
            height: "21px",
            width: "21px",
            marginRight: "15px",
          },
        }}
      >
        <HelpIconFilled />
        <div>{t("service_accounts_help_intro")}</div>
      </Box>
      <Box sx={{ fontSize: "14px", marginBottom: "15px" }}>
        <Box sx={{ paddingBottom: "20px" }}>
          <FeatureItem
            icon={<ServiceAccountIcon />}
            description={t("create_service_account")}
          />
          <Box sx={{ paddingTop: "20px" }}>
          {t("service_accounts_info2")}
          </Box>
        </Box>
        <Box sx={{ paddingBottom: "20px" }}>
          <FeatureItem
            icon={<PasswordKeyIcon />}
            description={t("assign_custom_credentials")}
          />
          <Box sx={{ paddingTop: "10px" }}>
            {t("randomized_acces_credentials_are_recommended")}
          </Box>
          <Box sx={{ paddingTop: "10px" }}>
          {t("service_accounts_programmatic_access")}
          </Box>
        </Box>
        <Box sx={{ paddingBottom: "20px" }}>
          <FeatureItem
            icon={<IAMPoliciesIcon />}
            description={t("assign_access_policies")}
          />
            <Box sx={{ paddingTop: "10px" }}>
              {t("specify_optional_json_IAM_policy")}
          </Box>
          <Box sx={{ paddingTop: "10px" }}>
            {t('cannot_modify_option_json_IAM')}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexFlow: "column",
        }}
      ></Box>
    </Box>
  );
};

export default AddServiceAccountHelpBox;
