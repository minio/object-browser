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
import LanguageIcon from '@mui/icons-material/Language';
import { IElement, IElementValue } from "./types";
import i18next from "i18next";


export const configurationElements: IElement[] = [
  {
    icon: <LanguageIcon />,
    configuration_id: "language",
    configuration_label: i18next.t("language"),
  },
  {
    icon: <CompressIcon />,
    configuration_id: "compression",
    configuration_label: i18next.t("compression"),
  },
  {
    icon: <LockOpenIcon />,
    configuration_id: "identity_openid",
    configuration_label: i18next.t("identity_openid"),
  },
  {
    icon: <LoginIcon />,
    configuration_id: "identity_ldap",
    configuration_label: i18next.t("identity_ldap"),
  }
];

export const fieldsConfigurations: any = {

  language: [
    {
      name: "language",
      required: false,
      label: i18next.t("language"),
      type: "dropdown", 
    } 
  ],
  compression: [
    {
      name: "extensions",
      required: false,
      label: i18next.t("extenstion"),
      tooltip:i18next.t("extensions_tooltip"),
      type: "csv",
      placeholder:i18next.t("enter_extention"),
      withBorder: true,
    },
    {
      name: "mime_types",
      required: false,
      label:i18next.t("mime_types"),
      tooltip:i18next.t("mime_types_tooltip"),
      type: "csv",
      placeholder:i18next.t("enter_mime_type"),
      withBorder: true,
    },
  ],
  identity_openid: [
    {
      name: "config_url",
      required: false,
      label: i18next.t("config_url"),
      tooltip: i18next.t("config_url_tooltip"),
      type: "string",
      placeholder:
        "https://identity-provider-url/.well-known/openid-configuration",
    },
    {
      name: "client_id",
      required: false,
      label: i18next.t("client_id"),
      type: "string",
      placeholder: i18next.t("enter_client_id"),
    },
    {
      name: "client_secret",
      required: false,
      label: i18next.t("secret_id"),
      type: "string",
      placeholder: i18next.t("enter_secret_id"),
    },
    {
      name: "claim_name",
      required: false,
      label: i18next.t("claim_name"),
      tooltip: i18next.t("claim_name_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_claim_name"),
    },
    {
      name: "claim_prefix",
      required: false,
      label: i18next.t("claim_prefix"),
      tooltip: i18next.t("claim_prefix"),
      type: "string",
      placeholder: i18next.t("enter_claim_prefix"),
    },
    {
      name: "claim_userinfo",
      required: false,
      label: i18next.t("claim_userinfo"),
      type: "on|off",
    },
    {
      name: "redirect_uri",
      required: false,
      label: i18next.t("redirect_uri"),
      type: "string",
      placeholder: "https://console-endpoint-url/oauth_callback",
    },
    {
      name: "scopes",
      required: false,
      label: i18next.t("scopes"),
      type: "string",
      placeholder: i18next.t("openid_profil_email"),
    },
  ],
  identity_ldap: [
    {
      name: "server_addr",
      required: true,
      label: i18next.t("server_addr"),
      tooltip: i18next.t("AD_LDAP_server_address"),
      type: "string",
      placeholder: "myldapserver.com:636",
    },
    {
      name: "tls_skip_verify",
      required: false,
      label: i18next.t("TLS_slip_verify"),
      tooltip:i18next.t("TLS_slip_verify_tooltip"),
      type: "on|off",
    },
    {
      name: "server_insecure",
      required: false,
      label: i18next.t("server_insecure"),
      tooltip:i18next.t("server_insecure_tooltip"),
      type: "on|off",
    },
    {
      name: "server_starttls",
      required: false,
      label: i18next.t("start_TLS_connection"),
      tooltip: i18next.t("start_TLS_connection_tooltip"),
      type: "on|off",
    },
    {
      name: "lookup_bind_dn",
      required: true,
      label: i18next.t("lookup_bind_DN"),
      tooltip:i18next.t("lookup_bind_DN_tooltip"),
      type: "string",
      placeholder: "cn=admin,dc=min,dc=io",
    },
    {
      name: "lookup_bind_password",
      required: false,
      label: i18next.t("lookup_bind_password"),
      tooltip:i18next.t("lookup_bind_password_tooltip"),
      type: "string",
      placeholder: i18next.t("admin"),
    },
    {
      name: "user_dn_search_base_dn",
      required: false,
      label: i18next.t("user_DN_search_base_DN"),
      tooltip: i18next.t("user_DN_search_base_DN_tooltip"),
      type: "csv",
      placeholder: "dc=myldapserver",
    },
    {
      name: "user_dn_search_filter",
      required: false,
      label: i18next.t("user_DN_filter"),
      tooltip: i18next.t("user_DN_filter_tooltip"),
      type: "string",
      placeholder: "(sAMAcountName=%s)",
    },
    {
      name: "group_search_filter",
      required: false,
      label: i18next.t("group_search_filter"),
      tooltip:i18next.t("group_search_filter_tooltip"),
      type: "string",
      placeholder: "(&(objectclass=groupOfNames)(member=%d))",
    },
    {
      name: "group_search_base_dn",
      required: false,
      label: i18next.t("group_search_base_DN"),
      tooltip: i18next.t("group_search_base_DN_tooltip"),
      type: "csv",
      placeholder: "dc=minioad,dc=local",
    },
    {
      name: "comment",
      required: false,
      label: i18next.t("comment"),
      tooltip:i18next.t("comment_tooltip"),
      type: "comment",
      placeholder: i18next.t("enter_custom_notes"),
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
