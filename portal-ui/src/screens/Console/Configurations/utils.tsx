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

export const configurationElements: IElement[] = [
  // {
  //   icon: <CompressIcon />,
  //   configuration_id: "compression",
  //   configuration_label: "Compression",
  // },
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

export const fieldsConfigurations: any = {
  compression: [
    {
      name: "extensions",
      required: false,
      label: "Extensions",
      tooltip:
        'Extensions to compress e.g. ".txt",".log" or ".csv", you can write one per field',
      type: "csv",
      placeholder: "Enter an Extension",
      withBorder: true,
    },
    {
      name: "mime_types",
      required: false,
      label: "Mime Types",
      tooltip:
        'Mime types e.g. "text/*","application/json" or "application/xml", you can write one per field',
      type: "csv",
      placeholder: "Enter a Mime Type",
      withBorder: true,
    },
  ],
  identity_openid: [
    {
      name: "config_url",
      required: false,
      label: "Config URL",
      tooltip: "Config URL for identity provider configuration",
      type: "string",
      placeholder:
        "https://identity-provider-url/.well-known/openid-configuration",
    },
    {
      name: "client_id",
      required: false,
      label: "Client ID",
      type: "string",
      placeholder: "Enter Client ID",
    },
    {
      name: "client_secret",
      required: false,
      label: "Secret ID",
      type: "string",
      placeholder: "Enter Secret ID",
    },
    {
      name: "claim_name",
      required: false,
      label: "Claim Name",
      tooltip: "Claim from which MinIO will read the policy or role to use",
      type: "string",
      placeholder: "Enter Claim Name",
    },
    {
      name: "claim_prefix",
      required: false,
      label: "Claim Prefix",
      tooltip: "Claim Prefix",
      type: "string",
      placeholder: "Enter Claim Prefix",
    },
    {
      name: "claim_userinfo",
      required: false,
      label: "Claim UserInfo",
      type: "on|off",
    },
    {
      name: "redirect_uri",
      required: false,
      label: "Redirect URI",
      type: "string",
      placeholder: "https://console-endpoint-url/oauth_callback",
    },
    {
      name: "scopes",
      required: false,
      label: "Scopes",
      type: "string",
      placeholder: "openid,profile,email",
    },
  ],
  identity_ldap: [
    {
      name: "server_addr",
      required: true,
      label: "Server Addr",
      tooltip: 'AD/LDAP server address e.g. "myldapserver.com:636"',
      type: "string",
      placeholder: "myldapserver.com:636",
    },
    {
      name: "tls_skip_verify",
      required: false,
      label: "TLS Skip Verify",
      tooltip:
        'Trust server TLS without verification, defaults to "off" (verify)',
      type: "on|off",
    },
    {
      name: "server_insecure",
      required: false,
      label: "Server Insecure",
      tooltip:
        'Allow plain text connection to AD/LDAP server, defaults to "off"',
      type: "on|off",
    },
    {
      name: "server_starttls",
      required: false,
      label: "Start TLS connection to AD/LDAP server",
      tooltip: "Use StartTLS connection to AD/LDAP server",
      type: "on|off",
    },
    {
      name: "lookup_bind_dn",
      required: true,
      label: "Lookup Bind DN",
      tooltip:
        "DN for LDAP read-only service account used to perform DN and group lookups",
      type: "string",
      placeholder: "cn=admin,dc=min,dc=io",
    },
    {
      name: "lookup_bind_password",
      required: false,
      label: "Lookup Bind Password",
      tooltip:
        "Password for LDAP read-only service account used to perform DN and group lookups",
      type: "string",
      placeholder: "admin",
    },
    {
      name: "user_dn_search_base_dn",
      required: false,
      label: "User DN Search Base DN",
      tooltip: "Base LDAP DN to search for user DN",
      type: "csv",
      placeholder: "dc=myldapserver",
    },
    {
      name: "user_dn_search_filter",
      required: false,
      label: "User DN Search Filter",
      tooltip: "Search filter to lookup user DN",
      type: "string",
      placeholder: "(sAMAcountName=%s)",
    },
    {
      name: "group_search_filter",
      required: false,
      label: "Group Search Filter",
      tooltip: "Search filter for groups",
      type: "string",
      placeholder: "(&(objectclass=groupOfNames)(member=%d))",
    },
    {
      name: "group_search_base_dn",
      required: false,
      label: "Group Search Base DN",
      tooltip: "List of group search base DNs",
      type: "csv",
      placeholder: "dc=minioad,dc=local",
    },
    {
      name: "comment",
      required: false,
      label: "Comment",
      tooltip: "Optionally add a comment to this setting",
      type: "comment",
      placeholder: "Enter custom notes if any",
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
