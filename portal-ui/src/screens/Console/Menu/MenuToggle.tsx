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

import React, { Fragment, Suspense, useEffect } from "react";
import OperatorLogo from "../../../icons/OperatorLogo";
import DirectPVLogo from "../../../icons/DirectPVLogo";

import { ConsoleLogo, VersionIcon } from "../../../icons";
import ConsoleLogoWhite from "../../../icons/ConsoleLogoWhite"
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import useApi from "../Common/Hooks/useApi";
import {
  selDirectPVMode,
  selOpMode,
} from "../../../systemSlice";
import { AppState, useAppDispatch } from "../../../store";
import MenuToggleIcon from "../../../icons/MenuToggleIcon";

type MenuToggleProps = {
  isOpen: boolean;
  onToggle: (nextState: boolean) => void;
};
const MenuToggle = ({ isOpen, onToggle }: MenuToggleProps) => {
  const stateClsName = isOpen ? "wide" : "mini";

  const dispatch = useAppDispatch();

  const operatorMode = useSelector(selOpMode);

  const directPVMode = useSelector(selDirectPVMode);


  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box
        className={`${stateClsName}`}
        sx={{
          marginLeft: "26px",
          marginRight: "8px",
          display: "flex",
          alignItems: "center",
          height: "83px",

          "&.mini": {
            flexFlow: "column",
            display: "flex",
            justifyContent: "center",
            gap: "3px",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          },
          "& .logo": {
            background: "transparent",
            "&.wide": {
              flex: "1",
              "& svg": {
                fill: "white",
                width: 167,
              },
            },
            "&.mini": {
              color: "#ffffff",
              "& svg": {
                width: 35,
                fill: "rgba(255, 255, 255, 0.8)",
              },
            },
          },
        }}
      >
        {isOpen ? (
          <div className={`logo ${stateClsName}`}>
            {!operatorMode && !directPVMode ? (
              <Fragment>
                <div
                  style={{ marginLeft: "4px", width: 100, textAlign: "left" }}
                >
                  <ConsoleLogoWhite />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                {directPVMode ? <DirectPVLogo /> : <OperatorLogo />}
              </Fragment>
            )}
          </div>
        ) : (
          <div className={`logo ${stateClsName}`}>
            <Suspense fallback={<div>...</div>}>
              <VersionIcon />
            </Suspense>
          </div>
        )}

        <IconButton
          className={`${stateClsName}`}
          sx={{
            height: "30px",
            width: "30px",
            "&.mini": {
              "&:hover": {
                background: "#A4493D",
              },
            },

            "&:hover": {
              borderRadius: "50%",
              background: "#A4493D",
            },
            "& svg": {
              fill: "#ffffff",
              height: "18px",
              width: "18px",
            },
          }}
          onClick={() => {
            if (isOpen) {
              onToggle(false);
            } else {
              onToggle(true);
            }
          }}
          size="small"
        >
          {isOpen ? <MenuToggleIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default MenuToggle;
