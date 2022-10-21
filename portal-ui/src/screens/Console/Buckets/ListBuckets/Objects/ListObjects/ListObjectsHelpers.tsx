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
import * as reactMoment from "react-moment";
import { BucketObjectItem } from "./types";
import { niceBytes } from "../../../../../../common/utils";
import { displayFileIconName } from "./utils";
import  i18next  from 'i18next';

// Functions

export const displayParsedDate = (object: BucketObjectItem) => {
  if (object.name.endsWith("/")) {
    return "";
  }
  return <reactMoment.default>{object.last_modified}</reactMoment.default>;
};

export const displayNiceBytes = (object: BucketObjectItem) => {
  if (object.name.endsWith("/") || !object.size) {
    return "-";
  }
  return niceBytes(String(object.size));
};

export const displayDeleteFlag = (state: boolean) => {
  return state ? "Yes" : "No";
};

// Table Props

export const listModeColumns = [
  {
    label: i18next.t("name"),
    elementKey: "name",
    renderFunction: displayFileIconName,
    enableSort: true,
  },
  {
    label: i18next.t("last_modified"),
    elementKey: "last_modified",
    renderFunction: displayParsedDate,
    renderFullObject: true,
    enableSort: true,
  },
  {
    label: i18next.t("size"),
    elementKey: "size",
    renderFunction: displayNiceBytes,
    renderFullObject: true,
    width: 100,
    contentTextAlign: "center",
    enableSort: true,
  },
];

export const rewindModeColumns = [
  {
    label: i18next.t("name"),
    elementKey: "name",
    renderFunction: displayFileIconName,
    enableSort: true,
  },
  {
    label: i18next.t("object_data"),
    elementKey: "last_modified",
    renderFunction: displayParsedDate,
    renderFullObject: true,
    enableSort: true,
  },
  {
    label: i18next.t("size"),
    elementKey: "size",
    renderFunction: displayNiceBytes,
    renderFullObject: true,
    width: 100,
    contentTextAlign: "center",
    enableSort: true,
  },
  {
    label: i18next.t("deleted"),
    elementKey: "delete_flag",
    renderFunction: displayDeleteFlag,
    width: 60,
    contentTextAlign: "center",
  },
];
