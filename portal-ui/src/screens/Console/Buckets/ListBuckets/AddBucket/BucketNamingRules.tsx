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

import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import { Button, LinearProgress } from "@mui/material";
import { AppState } from "../../../../../store";
import { useSelector } from "react-redux";
import ShowTextIcon from "../../../../../icons/ShowTextIcon";
import HideTextIcon from "../../../../../icons/HideTextIcon";
import { useTranslation } from 'react-i18next';

import ValidRule from "./ValidRule";
import InvalidRule from "./InvalidRule";
import NARule from "./NARule";


const BucketNamingRules = ({ errorList }: { errorList: boolean[] }) => {
  const { t } = useTranslation();

  const lengthRuleText = t("bucket_name_length_rule");
  const characterRuleText = t("bucket_name_char_rule");
  const periodRuleText = t("bucket_name_period_rule");
  const ipRuleText = t("bucket_name_ip_rule");
  const prefixRuleText = t("bucket_name_prefix_rule");
  const suffixRuleText = t("bucket_name_suffix_rule");
  const uniqueRuleText = t("bucket_name_unique_rule");

  const bucketName = useSelector((state: AppState) => state.addBucket.name);

  const [showNamingRules, setShowNamingRules] = useState<boolean>(false);

  const addLoading = useSelector((state: AppState) => state.addBucket.loading);

  const [
    lengthRule,
    validCharacters,
    noAdjacentPeriods,
    notIPFormat,
    noPrefix,
    noSuffix,
    uniqueName,
  ] = errorList;

  return (
    <Fragment>
      <Grid item xs={12}>
        {showNamingRules ? (
          <span>
            {" "}
            {t("hide_bucket_naming_rule")}{" "}
          </span>
        ) : (
          <span>
            {t("view_bucket_naming_rule")}
          </span>
        )}
        <Button
          variant="text"
          size="small"
          onClick={() => {
            setShowNamingRules(!showNamingRules);
          }}
        >
          {showNamingRules ? <ShowTextIcon /> : <HideTextIcon />}
        </Button>
        {showNamingRules && (
          <Grid container>
            <Grid item xs={6}>
              {bucketName.length === 0 ? (
                <NARule ruleText={lengthRuleText} />
              ) : lengthRule ? (
                <ValidRule ruleText={lengthRuleText} />
              ) : (
                <InvalidRule ruleText={lengthRuleText} />
              )}
              {bucketName.length === 0 ? (
                <NARule ruleText={characterRuleText} />
              ) : validCharacters ? (
                <ValidRule ruleText={characterRuleText} />
              ) : (
                <InvalidRule ruleText={characterRuleText} />
              )}
              {bucketName.length === 0 ? (
                <NARule ruleText={periodRuleText} />
              ) : noAdjacentPeriods ? (
                <ValidRule ruleText={periodRuleText} />
              ) : (
                <InvalidRule ruleText={periodRuleText} />
              )}
              {bucketName.length === 0 ? (
                <NARule ruleText={ipRuleText} />
              ) : notIPFormat ? (
                <ValidRule ruleText={ipRuleText} />
              ) : (
                <InvalidRule ruleText={ipRuleText} />
              )}
            </Grid>
            <Grid item xs={6}>
              {bucketName.length === 0 ? (
                <NARule ruleText={prefixRuleText} />
              ) : noPrefix ? (
                <ValidRule ruleText={prefixRuleText} />
              ) : (
                <InvalidRule ruleText={prefixRuleText} />
              )}

              {bucketName.length === 0 ? (
                <NARule ruleText={suffixRuleText} />
              ) : noSuffix ? (
                <ValidRule ruleText={suffixRuleText} />
              ) : (
                <InvalidRule ruleText={suffixRuleText} />
              )}

              {bucketName.length === 0 ? (
                <NARule ruleText={uniqueRuleText} />
              ) : uniqueName ? (
                <ValidRule ruleText={uniqueRuleText} />
              ) : (
                <InvalidRule ruleText={uniqueRuleText} />
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
      {addLoading && (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      )}
    </Fragment>
  );
};

export default BucketNamingRules;
