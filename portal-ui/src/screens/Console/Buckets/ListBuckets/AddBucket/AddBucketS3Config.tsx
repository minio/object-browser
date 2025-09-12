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

import React, { useState } from "react";
import { Button, Tabs, Tab, Box, TextField } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";
import { setS3Tabs } from "./addBucketsSlice";
import { AppState, useAppDispatch } from "../../../../../store";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

export interface TabData {
  name: string;
  url: string;
  accessKey: string;
  secretKey: string;
  api: string;
  path: string;
}

const AddBucketS3Config = ({ hasErrors }: { hasErrors: boolean[] }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [currentTab, setCurrentTab] = useState("0");
  const tabs = useSelector((state: AppState) => state.addBucket.s3Tabs);

  const handleAddTab = () => {
    const newTabNumber = tabs.length;
    const newTab: TabData = {
      name: `storage${newTabNumber + 1}`,
      url: "",
      accessKey: "",
      secretKey: "",
      api: "s3v4",
      path: "auto",
    };
    const newTabs = [...tabs, newTab];
    setCurrentTab(newTabNumber.toString());
    dispatch(setS3Tabs(newTabs));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  const handleInputChange = (index: number, field: keyof TabData, value: string) => {
    const newTabs = tabs.map((tab, i) =>
      i === index ? { ...tab, [field]: value } : tab
    );
    dispatch(setS3Tabs(newTabs));
  };

  const handleDeleteTab = (index: number) => {
  let newTabs = tabs.filter((_, i) => i !== index);

  newTabs = newTabs.map((tab, i) => ({
    ...tab,
    name: `storage${i + 1}`,
  }));

  dispatch(setS3Tabs(newTabs));

  if (newTabs.length === 0) {
    setCurrentTab("0");
  } else if (parseInt(currentTab) >= newTabs.length) {
    setCurrentTab((newTabs.length - 1).toString());
  } else {
    setCurrentTab(currentTab);
  }

};

  return (
    <Box sx={{ width: "100%" }}>
      <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      onClick={handleAddTab}
    >
        {t("add_a_S3_provider")}
      </Button>

      {tabs.length > 0 && (
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", maxWidth: { xs: 270, sm: 700 } }}>
            <Tabs
              value={currentTab}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab.name} value={index.toString()} />
              ))}
            </Tabs>
          </Box>

          {tabs.map((tab, index) => (
            <TabPanel key={index} value={index.toString()} sx={{ p: 2 }}>
              <TextField
                label="URL"
                value={tab.url}
                onChange={(e) => handleInputChange(index, "url", e.target.value)}
                error={hasErrors[index] === false}
                fullWidth
                margin="normal"
                helperText={hasErrors[index] === false ? t("url_error_http_https_port") : ""}
              />
              <TextField
                label={t("accesskey")}
                value={tab.accessKey}
                onChange={(e) => handleInputChange(index, "accessKey", e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label={t("secretkey")}
                value={tab.secretKey}
                onChange={(e) => handleInputChange(index, "secretKey", e.target.value)}
                fullWidth
                margin="normal"
                type="password"
              />
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeleteTab(index)}
                sx={{ mt: 2 }}
              >
                {t("deleteprovider")}
              </Button>
            </TabPanel>
          ))}
        </TabContext>
      )}
    </Box>
  );
};

export default AddBucketS3Config;