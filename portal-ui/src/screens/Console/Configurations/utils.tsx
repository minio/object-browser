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
import React from "react";
import CompressIcon from "@mui/icons-material/Compress";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";
import { IElement, IElementValue } from "./types";
import { useTranslation } from 'react-i18next';

export const configurationElements: IElement[] = [
  {
    icon: <CompressIcon />,
    configuration_id: "compression",
    configuration_label: "Compression",
  },
  {
    icon: <LockOpenIcon />,
    configuration_id: "identity_openid",
    configuration_label: "Identity Openid",
  },
  {
    icon: <LoginIcon />,
    configuration_id: "identity_ldap",
    configuration_label: "Identity LDAP",
  },
];
const { t } = useTranslation();

export const fieldsConfigurations: any = {

  compression: [
    {
      name: "extensions",
      required: false,
      label: t("extenstion"),
      tooltip: t("extensions_tooltip"),
      type: "csv",
      placeholder: t("enter_extention"),
      withBorder: true,
    },
    {
      name: "mime_types",
      required: false,
      label: t("mime_types"),
      tooltip: t("mime_types_tooltip"),
      type: "csv",
      placeholder: t("enter_mime_type"),
      withBorder: true,
    },
  ],
  identity_openid: [
    {
      name: "config_url",
      required: false,
      label: t("config_url"),
      tooltip: t("config_url_tooltip"),
      type: "string",
      placeholder:
        "https://identity-provider-url/.well-known/openid-configuration",
    },
    {
      name: "client_id",
      required: false,
      label: t("client_id"),
      type: "string",
      placeholder: t("enter_client_id"),
    },
    {
      name: "client_secret",
      required: false,
      label: t("secret_id"),
      type: "string",
      placeholder: t("enter_secret_id"),
    },
    {
      name: "claim_name",
      required: false,
      label: t("claim_name"),
      tooltip: t("claim_name_tooltip"),
      type: "string",
      placeholder: t("enter_claim_name"),
    },
    {
      name: "claim_prefix",
      required: false,
      label: t("claim_prefix"),
      tooltip: t("claim_prefix"),
      type: "string",
      placeholder: t("enter_claim_prefix"),
    },
    {
      name: "claim_userinfo",
      required: false,
      label: t("claim_userinfo"),
      type: "on|off",
    },
    {
      name: "redirect_uri",
      required: false,
      label: t("redirect_uri"),
      type: "string",
      placeholder: "https://console-endpoint-url/oauth_callback",
    },
    {
      name: "scopes",
      required: false,
      label: t("scopes"),
      type: "string",
      placeholder: t("openid_profil_email"),
    },
  ],
  identity_ldap: [
    {
      name: "server_addr",
      required: true,
      label: t("server_addr"),
      tooltip: t("AD_LDAP_server_address"),
      type: "string",
      placeholder: "myldapserver.com:636",
    },
    {
      name: "tls_skip_verify",
      required: false,
      label: t("TLS_slip_verify"),
      tooltip:t("TLS_slip_verify_tooltip"),
      type: "on|off",
    },
    {
      name: "server_insecure",
      required: false,
      label: t("server_insecure"),
      tooltip:t("server_insecure_tooltip"),
      type: "on|off",
    },
    {
      name: "server_starttls",
      required: false,
      label: t("start_TLS_connection"),
      tooltip: t("start_TLS_connection_tooltip"),
      type: "on|off",
    },
    {
      name: "lookup_bind_dn",
      required: true,
      label: t("lookup_bind_DN"),
      tooltip:t("lookup_bind_DN_tooltip"),
      type: "string",
      placeholder: "cn=admin,dc=min,dc=io",
    },
    {
      name: "lookup_bind_password",
      required: false,
      label: t("lookup_bind_password"),
      tooltip:t("lookup_bind_password_tooltip"),
      type: "string",
      placeholder: t("admin"),
    },
    {
      name: "user_dn_search_base_dn",
      required: false,
      label: t("user_DN_search_base_DN"),
      tooltip: t("user_DN_search_base_DN_tooltip"),
      type: "csv",
      placeholder: "dc=myldapserver",
    },
    {
      name: "user_dn_search_filter",
      required: false,
      label: t("user_DN_filter"),
      tooltip: t("user_DN_filter_tooltip"),
      type: "string",
      placeholder: "(sAMAcountName=%s)",
    },
    {
      name: "group_search_filter",
      required: false,
      label: t("group_search_filter"),
      tooltip:t("group_search_filter_tooltip"),
      type: "string",
      placeholder: "(&(objectclass=groupOfNames)(member=%d))",
    },
    {
      name: "group_search_base_dn",
      required: false,
      label: t("group_search_base_DN"),
      tooltip: t("group_search_base_DN_tooltip"),
      type: "csv",
      placeholder: "dc=minioad,dc=local",
    },
    {
      name: "comment",
      required: false,
      label: t("comment"),
      tooltip:t("comment_tooltip"),
      type: "comment",
      placeholder: t("enter_custom_notes"),
    },
  ],
};

export const removeEmptyFields = (formFields: IElementValue[]) => {
  const nonEmptyFields = formFields.filter((field) => field.value !== "");

  return nonEmptyFields;
};

export const selectSAs = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSelectedSAs: Function,
  selectedSAs: string[]
) => {
  const targetD = e.target;
  const value = targetD.value;
  const checked = targetD.checked;

  let elements: string[] = [...selectedSAs]; // We clone the selectedSAs array
  if (checked) {
    // If the user has checked this field we need to push this to selectedSAs
    elements.push(value);
  } else {
    // User has unchecked this field, we need to remove it from the list
    elements = elements.filter((element) => element !== value);
  }
  setSelectedSAs(elements);
  return elements;
};
