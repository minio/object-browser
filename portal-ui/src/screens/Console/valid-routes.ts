//  This file is part of MinIO Console Server
//  Copyright (c) 2022 MinIO, Inc.
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU Affero General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU Affero General Public License for more details.
//
//  You should have received a copy of the GNU Affero General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { IMenuItem } from "./Menu/types";
import { NavLink } from "react-router-dom";
import {
  CONSOLE_UI_RESOURCE,
  IAM_PAGES,
  IAM_PAGES_PERMISSIONS,
  IAM_SCOPES,
  S3_ALL_RESOURCES,
} from "../../common/SecureComponent/permissions";
import {
  AccessMenuIcon,
  AccountsMenuIcon,
  AuditLogsMenuIcon,
  BucketsMenuIcon,
  DrivesMenuIcon,
  GroupsMenuIcon,
  HealthMenuIcon,
  IdentityMenuIcon,
  InspectMenuIcon,
  LogsMenuIcon,
  MetricsMenuIcon,
  MonitoringMenuIcon,
  PerformanceMenuIcon,
  ProfileMenuIcon,
  UsersMenuIcon,
} from "../../icons/SidebarMenus";
import { hasPermission } from "../../common/SecureComponent";
import RegisterMenuIcon from "../../icons/SidebarMenus/RegisterMenuIcon";
import {
  ClustersIcon,
  DocumentationIcon,
  LambdaIcon,
  LicenseIcon,
  RecoverIcon,
  StorageIcon,
  TenantsOutlineIcon,
  MoneyIcon,
} from "../../icons";
import SettingsIcon from "../../icons/SettingsIcon";
import React from "react";
import LicenseBadge from "./Menu/LicenseBadge";
import i18next, { t } from "i18next";


export const validRoutes = (
  features: string[] | null | undefined,
  operatorMode: boolean,
  directPVMode: boolean
) => {
  const ldapIsEnabled = (features && features.includes("ldap-idp")) || false;

  let consoleMenus: IMenuItem[] = [
    {
      name: "Bucket",
      id: "buckets",
      component: NavLink,
      to: IAM_PAGES.BUCKETS,
      icon: BucketsMenuIcon,
      forceDisplay: true,
      children: [],
    },
    {
      name: i18next.t("identity"),
      id: "identity",
      icon: IdentityMenuIcon,
      children: [
        {
          component: NavLink,
          id: "users",
          to: IAM_PAGES.USERS,
          customPermissionFnc: () =>
            hasPermission(CONSOLE_UI_RESOURCE, [IAM_SCOPES.ADMIN_LIST_USERS]) ||
            hasPermission(S3_ALL_RESOURCES, [IAM_SCOPES.ADMIN_CREATE_USER]),
          name: i18next.t("users"),
          icon: UsersMenuIcon,
          fsHidden: ldapIsEnabled,
        },
        {
          component: NavLink,
          id: "groups",
          to: IAM_PAGES.GROUPS,
          name: i18next.t("groups"),
          icon: GroupsMenuIcon,
          fsHidden: ldapIsEnabled,
        },
        {
          component: NavLink,
          id: "serviceaccounts",
          to: IAM_PAGES.ACCOUNT,
          name: i18next.t("service_accounts"),
          icon: AccountsMenuIcon,
          forceDisplay: true,
        },
      ],
    },
    {
      name: i18next.t("access"),
      component: NavLink,
      id: "access",
      to: IAM_PAGES.POLICIES,
      icon: AccessMenuIcon,
    },
    {
      name: i18next.t("monitoring"),
      id: "monitorMetrics",
      to: IAM_PAGES.DASHBOARD,
      icon: MetricsMenuIcon,
      component: NavLink,
    },
    {
      component: NavLink,
      to: IAM_PAGES.NOTIFICATIONS_ENDPOINTS,
      name: "Notifications",
      icon: LambdaIcon,
      id: "lambda",
    },
    // {
    //   component: NavLink,
    //   to: IAM_PAGES.TIERS,
    //   name: i18next.t("billing"),
    //   icon: MoneyIcon,
    //   id: "billing",
    // },
    {
      component: NavLink,
      to: IAM_PAGES.SETTINGS,
      name: i18next.t("configurations"),
      id: "configurations",
      icon: SettingsIcon,
    },
    {
      type: "item",
      component: NavLink,
      to: IAM_PAGES.DOCUMENTATION,
      name: "Documentation",
      icon: DocumentationIcon,
      forceDisplay: true,
      onClick: (
        e:
          | React.MouseEvent<HTMLLIElement>
          | React.MouseEvent<HTMLAnchorElement>
          | React.MouseEvent<HTMLDivElement>
      ) => {
        e.preventDefault();
        window.open("https://developer.mantleblockchain.com/docs", "_blank");
      },
    },
  ];

  let operatorMenus: IMenuItem[] = [
    {
      group: "Operator",
      type: "item",
      id: "Tenants",
      component: NavLink,
      to: IAM_PAGES.TENANTS,
      name: "Tenants",
      icon: TenantsOutlineIcon,
      forceDisplay: true,
    },
    {
      group: "Operator",
      type: "item",
      id: "License",
      component: NavLink,
      to: IAM_PAGES.LICENSE,
      name: "License",
      icon: LicenseIcon,
      forceDisplay: true,
    },
    {
      group: "Operator",
      type: "item",
      id: "Register",
      component: NavLink,
      to: IAM_PAGES.REGISTER_SUPPORT,
      name: "Register",
      icon: RegisterMenuIcon,
      forceDisplay: true,
    },
    {
      group: "Operator",
      type: "item",
      id: "Documentation",
      component: NavLink,
      to: IAM_PAGES.DOCUMENTATION,
      name: "Documentation",
      icon: DocumentationIcon,
      forceDisplay: true,
      onClick: (
        e:
          | React.MouseEvent<HTMLLIElement>
          | React.MouseEvent<HTMLAnchorElement>
          | React.MouseEvent<HTMLDivElement>
      ) => {
        e.preventDefault();
        window.open("https://docs.min.io/?ref=op", "_blank");
      },
    },
  ];

  let directPVMenus: IMenuItem[] = [
    {
      group: "Storage",
      type: "item",
      id: "StoragePVCs",
      component: NavLink,
      to: IAM_PAGES.DIRECTPV_STORAGE,
      name: "PVCs",
      icon: ClustersIcon,
      forceDisplay: true,
    },
    {
      name: "Drives",
      type: "item",
      id: "drives",
      component: NavLink,
      icon: DrivesMenuIcon,
      to: IAM_PAGES.DIRECTPV_DRIVES,
      forceDisplay: true,
    },
    {
      name: "Volumes",
      type: "item",
      id: "volumes",
      component: NavLink,
      icon: StorageIcon,
      to: IAM_PAGES.DIRECTPV_VOLUMES,
      forceDisplay: true,
    },
    {
      group: "DirectPV",
      type: "item",
      id: "License",
      component: NavLink,
      to: IAM_PAGES.LICENSE,
      name: "License",
      icon: LicenseIcon,
      forceDisplay: true,
    },
    {
      group: "DirectPV",
      type: "item",
      id: "Documentation",
      component: NavLink,
      to: IAM_PAGES.DOCUMENTATION,
      name: "Documentation",
      icon: DocumentationIcon,
      forceDisplay: true,
      onClick: (
        e:
          | React.MouseEvent<HTMLLIElement>
          | React.MouseEvent<HTMLAnchorElement>
          | React.MouseEvent<HTMLDivElement>
      ) => {
        e.preventDefault();
        window.open("https://docs.min.io/?ref=op", "_blank");
      },
    },
  ];

  let menus = consoleMenus;

  if (directPVMode) {
    menus = directPVMenus;
  } else if (operatorMode) {
    menus = operatorMenus;
  }

  const allowedItems = menus.filter((item: IMenuItem) => {
    if (item.children && item.children.length > 0) {
      const c = item.children?.filter((childItem: IMenuItem) => {
        return (
          ((childItem.customPermissionFnc
            ? childItem.customPermissionFnc()
            : hasPermission(
                CONSOLE_UI_RESOURCE,
                IAM_PAGES_PERMISSIONS[childItem.to ?? ""]
              )) ||
            childItem.forceDisplay) &&
          !childItem.fsHidden
        );
      });
      return c.length > 0;
    }

    const res =
      ((item.customPermissionFnc
        ? item.customPermissionFnc()
        : hasPermission(
            CONSOLE_UI_RESOURCE,
            IAM_PAGES_PERMISSIONS[item.to ?? ""]
          )) ||
        item.forceDisplay) &&
      !item.fsHidden;
    return res;
  });
  return allowedItems;
};
