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

import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "./common/api";
import { ISessionResponse } from "./screens/Console/types";
import { useSelector } from "react-redux";
import {
  directPVMode,
  globalSetDistributedSetup,
  operatorMode,
  setOverrideStyles,
  userLogged,
} from "./systemSlice";
import { AppState, useAppDispatch } from "./store";
import { saveSessionResponse } from "./screens/Console/consoleSlice";
import { getOverrideColorVariants } from "./utils/stylesUtils";

interface ProtectedRouteProps {
  Component: any;
}

const ProtectedRoute = ({ Component }: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();

  const [sessionLoading, setSessionLoading] = useState<boolean>(true);
  const userLoggedIn = useSelector((state: AppState) => state.system.loggedIn);

  const { pathname = "" } = useLocation();

  const StorePathAndRedirect = () => {
    localStorage.setItem("redirect-path", pathname);
    return <Navigate to={{ pathname: `login` }} />;
  };

  useEffect(() => {
    api
      .invoke("GET", `/api/v1/session`)
      .then((res: ISessionResponse) => {
        dispatch(saveSessionResponse(res));
        dispatch(userLogged(true));
        setSessionLoading(false);
        dispatch(globalSetDistributedSetup(res.distributedMode || false));
        // check for tenants presence, that indicates we are in operator mode
        if (res.operator) {
          dispatch(operatorMode(true));
          dispatch(directPVMode(!!res.directPV));
          document.title = "MinIO Operator";
        }

        if (res.customStyles && res.customStyles !== "") {
          const overrideColorVariants = getOverrideColorVariants(
            res.customStyles
          );

          if (overrideColorVariants !== false) {
            dispatch(setOverrideStyles(overrideColorVariants));
          }
        }
      })
      .catch(() => setSessionLoading(false));
  }, [dispatch]);

  // if we're still trying to retrieve user session render nothing
  if (sessionLoading) {
    return null;
  }
  // redirect user to the right page based on session status
  return userLoggedIn ? <Component /> : <StorePathAndRedirect />;
};

export default ProtectedRoute;
