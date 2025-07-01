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

import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Loader, LoginWrapper, RefreshIcon } from "mds";
import { loginStrategyType } from "./login.types";
import MainError from "../Console/Common/MainError/MainError";
import { AppState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import { getFetchConfigurationAsync } from "./loginThunks";
import { resetForm } from "./loginSlice";
import StrategyForm from "./StrategyForm";
import { getLogoApplicationVariant, getLogoVar } from "../../config";
import { RedirectRule } from "api/consoleApi";
import { redirectRules } from "./login.utils";
import { setHelpName } from "../../systemSlice";

export const getTargetPath = () => {
  let targetPath = "/browser";
  if (
    localStorage.getItem("redirect-path") &&
    localStorage.getItem("redirect-path") !== ""
  ) {
    targetPath = `${localStorage.getItem("redirect-path")}`;
    localStorage.setItem("redirect-path", "");
  }
  return targetPath;
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginStrategy = useSelector(
    (state: AppState) => state.login.loginStrategy,
  );
  const loadingFetchConfiguration = useSelector(
    (state: AppState) => state.login.loadingFetchConfiguration,
  );
  const navigateTo = useSelector((state: AppState) => state.login.navigateTo);

  const isK8S = useSelector((state: AppState) => state.login.isK8S);

  useEffect(() => {
    if (navigateTo !== "") {
      dispatch(resetForm());
      navigate(navigateTo);
    }
  }, [navigateTo, dispatch, navigate]);

  useEffect(() => {
    if (loadingFetchConfiguration) {
      dispatch(getFetchConfigurationAsync());
    }
  }, [loadingFetchConfiguration, dispatch]);

  let loginComponent;

  switch (loginStrategy.loginStrategy) {
    case loginStrategyType.redirect:
    case loginStrategyType.form: {
      let redirectItems: RedirectRule[] = [];

      if (
        loginStrategy.redirectRules &&
        loginStrategy.redirectRules.length > 0
      ) {
        redirectItems = [...loginStrategy.redirectRules].sort(redirectRules);
      }

      loginComponent = <StrategyForm redirectRules={redirectItems} />;
      break;
    }
    default:
      loginComponent = (
        <Box
          sx={{
            textAlign: "center",
            "& .loadingLoginStrategy": {
              textAlign: "center",
              width: 40,
              height: 40,
            },
            "& .buttonRetry": {
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          {loadingFetchConfiguration ? (
            <Loader className={"loadingLoginStrategy"} />
          ) : (
            <Fragment>
              <Box>
                <p style={{ textAlign: "center" }}>
                  An error has occurred
                  <br />
                  The backend cannot be reached.
                </p>
              </Box>
              <div className={"buttonRetry"}>
                <Button
                  onClick={() => {
                    dispatch(getFetchConfigurationAsync());
                  }}
                  icon={<RefreshIcon />}
                  iconLocation={"end"}
                  variant="regular"
                  id="retry"
                  label={"Retry"}
                />
              </div>
            </Fragment>
          )}
        </Box>
      );
  }

  let docsURL = "https://min.io/docs/minio/linux/index.html";
  if (isK8S) {
    docsURL = "https://min.io/docs/minio/kubernetes/upstream/index.html";
  }

  useEffect(() => {
    dispatch(setHelpName("login"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <MainError />
      <LoginWrapper
        logoProps={{
          applicationName: getLogoApplicationVariant(),
          subVariant: getLogoVar(),
        }}
        form={loginComponent}
        formFooter={
          <Box
            sx={{
              "& .separator": {
                marginLeft: 4,
                marginRight: 4,
              },
            }}
          >
            <a href={docsURL} target="_blank" rel="noopener">
              Documentation
            </a>
            <span className={"separator"}>|</span>
            <a
              href="https://github.com/georgmangold/console"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
            <span className={"separator"}>|</span>
            <a
              href="https://github.com/georgmangold/console/releases"
              target="_blank"
              rel="noopener"
            >
              Download
            </a>
          </Box>
        }
        promoHeader={
          <span
            style={{
              fontSize: "clamp(6px, 6vw, 115px)",
              lineHeight: 1,
              display: "inline-block",
              width: "100%",
            }}
          >
            Welcome to<br></br>
            <span style={{ fontSize: "clamp(6px, 8vw, 200px)" }}>CONSOLE</span>
          </span>
        }
        promoInfo={
          <span style={{ fontSize: 14, lineHeight: 1 }}>
            This is just a fork of the MinIO Console for my own personal
            educational purposes, and therefore it incorporates MinIO® source
            code. You may also want to look for other maintained forks.
            <br></br>
            It is important to note that <strong>MINIO</strong> is a registered
            trademark of the MinIO Corporation. Consequently, this project is
            not affiliated with or endorsed by the MinIO Corporation.
          </span>
        }
      />
    </Fragment>
  );
};

export default Login;
