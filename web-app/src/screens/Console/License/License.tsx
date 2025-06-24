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

import React, { Fragment } from "react";
import {
  AGPLV3DarkLogo,
  Box,
  Grid,
  HelpBox,
  LicenseIcon,
  PageLayout,
} from "mds";
import PageHeaderWrapper from "../Common/PageHeaderWrapper/PageHeaderWrapper";

const License = () => {
  return (
    <Fragment>
      <PageHeaderWrapper label={"License"} />
      <PageLayout>
        <Grid item xs={12}>
          <HelpBox
            title={"License"}
            iconComponent={<LicenseIcon />}
            help={
              <Fragment>
                <p>
                  This is just a fork of the{" "}
                  <a href="https://github.com/minio/object-browser">
                    MinIO Console
                  </a>{" "}
                  for my own personal educational purposes, and therefore it
                  incorporates MinIO® source code. You may also want to look
                  for other maintained{" "}
                  <a href="https://github.com/minio/object-browser/forks">
                    forks
                  </a>
                  .
                </p>
                <p>
                  It is important to note that <strong>MINIO</strong> is a
                  registered trademark of the MinIO Corporation. Consequently,
                  this project is not affiliated with or endorsed by the MinIO
                  Corporation.
                </p>
              </Fragment>
            }
          />
          <Box
            sx={{
              display: "flex",
              flexFlow: "column",
              "& .link-text": {
                color: "#2781B0",
                fontWeight: 600,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "40px",
                justifyContent: "center",
                "& .min-icon": {
                  fill: "blue",
                  width: "188px",
                  height: "62px",
                },
              }}
            >
              <AGPLV3DarkLogo />
            </Box>
            <Box
              sx={{
                marginBottom: "27px",
              }}
            >
              Console is licensed under the GNU Affero General Public License
              (AGPL) Version 3.0.
            </Box>
            <Box
              sx={{
                paddingBottom: "23px",
              }}
            >
              For more information, please refer to the license at{" "}
              <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">
                https://www.gnu.org/licenses/agpl-3.0.en.html
              </a>
              .
            </Box>
            <Box
              sx={{
                marginBottom: "27px",
              }}
            >
              This software incorporates MinIO® source code which is also
              licensed under the GNU AGPL v3, for which, the full text can be
              found here:{" "}
              <a
                href={`https://www.gnu.org/licenses/agpl-3.0.html`}
                rel="noopener"
                className={"link-text"}
              >
                https://www.gnu.org/licenses/agpl-3.0.html.
              </a>
            </Box>
            <Box
              sx={{
                paddingBottom: "23px",
              }}
            >
              <strong>MINIO</strong> is a registered trademark of the MinIO
              Corporation.
            </Box>
          </Box>
        </Grid>
      </PageLayout>
    </Fragment>
  );
};

export default License;
