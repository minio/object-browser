// This file is part of MinIO Console Server
// Copyright (c) 2025 MinIO, Inc.
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

import React, { RefObject, useRef } from "react";
import { Box, InputBox, MenuItem, SearchIcon } from "mds";
import get from "lodash/get";
import { useTheme } from "styled-components";
import { AppState, useAppDispatch } from "../../../../store";
import { menuOpen, setFilterBucket } from "../../../../systemSlice";
import { useSelector } from "react-redux";

const BucketFiltering = () => {
  const theme = useTheme();
  const ref = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const bucketFilter = useSelector(
    (state: AppState) => state.system.filterBucketList,
  );
  const sidebarOpen = useSelector(
    (state: AppState) => state.system.sidebarOpen,
  );

  const expandSearchBox = () => {
    dispatch(menuOpen(true));
    ref.current?.focus();
  };

  return (
    <>
      {!sidebarOpen ? (
        <MenuItem
          name={"Filter Bucket"}
          icon={<SearchIcon />}
          onClick={expandSearchBox}
          id={`filter-buckets-expand`}
        />
      ) : null}
      <Box
        sx={{
          opacity: sidebarOpen ? 1 : 0,
          height: sidebarOpen ? "inherit" : "0",
          padding: `5px 15px`,
          "& .startOverlayIcon svg": {
            fill: `${get(theme, "menu.vertical.textColor", "#FFF")}!important`,
          },
        }}
      >
        <InputBox
          id={"filter-buckets"}
          placeholder={"Filter Buckets"}
          sx={{
            "& input": {
              backgroundColor: "rgba(255,255,255,0.1)",
              borderColor: get(
                theme,
                "menu.vertical.sectionDividerColor",
                "#0F446C",
              ),
              color: get(theme, "menu.vertical.textColor", "#FFF"),
              "&::placeholder": {
                color: get(theme, "menu.vertical.textColor", "#FFF"),
              },
            },
          }}
          value={bucketFilter}
          onChange={(e) => {
            dispatch(setFilterBucket(e.target.value));
          }}
          startIcon={<SearchIcon />}
          ref={ref as unknown as RefObject<HTMLInputElement>}
        />
      </Box>
    </>
  );
};

export default BucketFiltering;
