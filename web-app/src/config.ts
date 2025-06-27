// This file is part of MinIO Console Server
// Copyright (c) 2023 MinIO, Inc.
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

import { ApplicationLogoProps } from "mds";

type LogoVar =
  | "AGPL"
  | "simple"
  | "standard"
  | "enterprise"
  | "new"
  | "enterpriseos"
  | "enterpriseosvertical"
  | undefined;

export const getLogoVar = (): LogoVar => {
  let logoVar: LogoVar = "AGPL";
  return logoVar;
};

export const getLogoApplicationVariant =
  (): ApplicationLogoProps["applicationName"] => {
    return "console";
  };
