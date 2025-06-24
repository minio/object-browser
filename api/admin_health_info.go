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

package api

import (
	"context"
	b64 "encoding/base64"
	"encoding/json"
	"errors"
	"net/http"
	"time"

	mc "github.com/minio/mc/cmd"
	"github.com/minio/websocket"
)

// startHealthInfo starts fetching mc.ServerHealthInfo and
// sends messages with the corresponding data on the websocket connection
func startHealthInfo(ctx context.Context, conn WSConn, client MinioAdmin, deadline *time.Duration) error {
	if deadline == nil {
		return errors.New("duration can't be nil on startHealthInfo")
	}

	// Fetch info of all servers (cluster or single server)
	healthInfo, version, err := client.serverHealthInfo(ctx, *deadline)
	if err != nil {
		return err
	}

	compressedDiag, err := mc.TarGZHealthInfo(healthInfo, version)
	if err != nil {
		return err
	}
	encodedDiag := b64.StdEncoding.EncodeToString(compressedDiag)
	type messageReport struct {
		Encoded          string      `json:"encoded"`
		ServerHealthInfo interface{} `json:"serverHealthInfo"`
		SubnetResponse   string      `json:"subnetResponse"`
	}

	report := messageReport{
		Encoded:          encodedDiag,
		ServerHealthInfo: healthInfo,
		SubnetResponse:   "/health",
	}

	message, err := json.Marshal(report)
	if err != nil {
		return err
	}

	// Send Message through websocket connection
	return conn.writeMessage(websocket.TextMessage, message)
}

// getHealthInfoOptionsFromReq gets duration for startHealthInfo request
// path come as : `/health-info?deadline=2h`
func getHealthInfoOptionsFromReq(req *http.Request) (*time.Duration, error) {
	deadlineDuration, err := time.ParseDuration(req.FormValue("deadline"))
	if err != nil {
		return nil, err
	}
	return &deadlineDuration, nil
}
