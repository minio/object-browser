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

import { NotificationEndpointItem } from "./types";

import { IElementValue } from "../Configurations/types";
import i18next from "i18next";

export const notifyPostgres = "notify_postgres";
export const notifyMysql = "notify_mysql";
export const notifyKafka = "notify_kafka";
export const notifyAmqp = "notify_amqp";
export const notifyMqtt = "notify_mqtt";
export const notifyRedis = "notify_redis";
export const notifyNats = "notify_nats";
export const notifyElasticsearch = "notify_elasticsearch";
export const notifyWebhooks = "notify_webhook";
export const notifyNsq = "notify_nsq";

export const notificationTransform = (
  notificationElements: NotificationEndpointItem[]
) => {
  return notificationElements.map((element) => {
    return {
      service_name: `${element.service}:${element.account_id}`,
      name: element.service,
      account_id: element.account_id,
      status: element.status,
    };
  });
};

export const servicesList = [
  {
    actionTrigger: notifyPostgres,
    targetTitle: "PostgreSQL",
    logo: "/postgres-logo.svg",
  },
  {
    actionTrigger: notifyKafka,
    targetTitle: "Kafka",
    logo: "/kafka-logo.svg",
  },
  {
    actionTrigger: notifyAmqp,
    targetTitle: "AMQP",
    logo: "/amqp-logo.svg",
  },
  {
    actionTrigger: notifyMqtt,
    targetTitle: "MQTT",
    logo: "/mqtt-logo.svg",
  },
  {
    actionTrigger: notifyRedis,
    targetTitle: "Redis",
    logo: "/redis-logo.svg",
  },
  {
    actionTrigger: notifyNats,
    targetTitle: "NATS",
    logo: "/nats-logo.svg",
  },
  {
    actionTrigger: notifyMysql,
    targetTitle: "Mysql",
    logo: "/mysql-logo.svg",
  },
  {
    actionTrigger: notifyElasticsearch,
    targetTitle: "Elastic Search",
    logo: "/elasticsearch-logo.svg",
  },
  {
    actionTrigger: notifyWebhooks,
    targetTitle: "Webhook",
    logo: "/webhooks-logo.svg",
  },
  {
    actionTrigger: notifyNsq,
    targetTitle: "NSQ",
    logo: "/nsq-logo.svg",
  },
];

const commonFields = [
  {
    name: "queue-dir",
    label: i18next.t("queue_dir"),
    required: true,

    tooltip: i18next.t("staging_dir_for_undelivered_message"),
    type: "string",
    placeholder: i18next.t("enter_queue_dir"),
  },
  {
    name: "queue-limit",
    label: i18next.t("queue_limit"),
    required: false,

    tooltip: i18next.t("maximum_limit_for_undelivered_message"),
    type: "number",
    placeholder:i18next.t("enter_queue_limit"),
  },
  {
    name: "comment",
    label: i18next.t("comment"),
    required: false,
    type: "comment",
    placeholder: i18next.t("enter_custom_notes"),
  },
];

export const removeEmptyFields = (formFields: IElementValue[]) => {
  const nonEmptyFields = formFields.filter((field) => field.value !== "");

  return nonEmptyFields;
};

export const notificationEndpointsFields: any = {
  [notifyKafka]: [
    {
      name: "brokers",
      label: i18next.t("brokers"),
      required: true,

      tooltip: i18next.t("comma_separated_list_kafka_broker_adds"),
      type: "string",
      placeholder: i18next.t("enter_brokers"),
    },
    {
      name: "topic",
      label: i18next.t("topic"),
      tooltip: i18next.t("kafka_topic_notif"),
      type: "string",
      placeholder: i18next.t("enter_topic"),
    },
    {
      name: "sasl_username",
      label: i18next.t("SALS_username"),
      tooltip: i18next.t("SALS_username_for_authentication"),
      type: "string",
      placeholder: i18next.t("enter_SALS_username"),
    },
    {
      name: "sasl_password",
      label: i18next.t("SALS_password"),
      tooltip: i18next.t("SALS_password_for_authentication"),
      type: "string",
      placeholder: i18next.t("enter_SALS_password"),
    },
    {
      name: "sasl_mechanism",
      label: i18next.t("SALS_mechanism"),
      tooltip: i18next.t("SALS_mechanism_for_authentication"),
      type: "string",
    },
    {
      name: "tls_client_auth",
      label: i18next.t("TLS_client_auth"),
      tooltip: i18next.t("client_auth_determines_kafka_policy"),
      type: "string",
      placeholder: i18next.t("enter_TLS_client_auth"),
    },
    {
      name: "sasl",
      label: "SASL",
      tooltip: i18next.t("set_on_enable_SASL"),
      type: "on|off",
    },
    {
      name: "tls",
      label: "TLS",
      tooltip: i18next.t("set_on_to_enalbe_TLS"),
      type: "on|off",
    },
    {
      name: "tls_skip_verify",
      label: i18next.t("TLS_slip_verify"),
      tooltip: i18next.t("TLS_slip_verify_tooltip"),
      type: "on|off",
    },
    {
      name: "client_tls_cert",
      label: i18next.t("client_TLS_cert"),
      tooltip: i18next.t("path_to_client_cret"),
      type: "path",
      placeholder: i18next.t("enter_client_TLS_cert"),
    },
    {
      name: "client_tls_key",
      label: i18next.t("client_TLS_key"),
      tooltip: i18next.t("path_to_client_key"),
      type: "path",
      placeholder: i18next.t("enter_client_TLS_key"),
    },
    {
      name: "version",
      label: "Version",
      tooltip: i18next.t("specify_version_for_kafka_cluster"),
      type: "string",
      placeholder: i18next.t("enter_kafka_version"),
    },
    ...commonFields,
  ],
  [notifyAmqp]: [
    {
      name: "url",
      required: true,
      label: "URL",
      tooltip: i18next.t("URL_tooltip"),
      type: "url",
    },
    {
      name: "exchange",
      label: i18next.t("exchange"),
      tooltip: i18next.t("name_of_AMQP_exchange"),
      type: "string",
      placeholder: i18next.t("enter_exchange"),
    },
    {
      name: "exchange_type",
      label: i18next.t("exchange_type"),
      tooltip: i18next.t("AMQP_exchange_type"),
      type: "string",
      placeholder: i18next.t("enter_exchange_type"),
    },
    {
      name: "routing_key",
      label: i18next.t("routing_key"),
      tooltip: i18next.t("routing_key_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_routing_key"),
    },
    {
      name: "mandatory",
      label: i18next.t("mandatory"),
      tooltip: i18next.t("mandatory_tooltip"),
      type: "on|off",
    },
    {
      name: "durable",
      label: i18next.t("durable"),
      tooltip: i18next.t("durable_tooltip"),
      type: "on|off",
    },
    {
      name: "no_wait",
      label: i18next.t("no_wait"),
      tooltip:i18next.t("no_wait_tooltip"),
      type: "on|off",
    },
    {
      name: "internal",
      label: i18next.t("internal"),
      tooltip:i18next.t("internal_tooltip"),
      type: "on|off",
    },
    {
      name: "auto_deleted",
      label: i18next.t("auto_deleted"),
      tooltip:i18next.t("auto_deleted_tooltip"),
      type: "on|off",
    },
    {
      name: "delivery_mode",
      label: i18next.t("delivery_mode"),
      tooltip: i18next.t("delivery_mode_tooltip"),
      type: "number",
      placeholder: i18next.t("enter_delivery_mode"),
    },
    ...commonFields,
  ],
  [notifyRedis]: [
    {
      name: "address",
      required: true,
      label: i18next.t("address"),
      tooltip: i18next.t("address_tooltip"),
      type: "address",
      placeholder: i18next.t("enter_address"),
    },
    {
      name: "key",
      required: true,
      label: i18next.t("key"),
      tooltip: i18next.t("key_tooltip"),
      type: "string",
      placeholder: i18next.t("queue_denter_keyir"),
    },
    {
      name: "password",
      label: i18next.t("password"),
      tooltip: i18next.t("redis_server_password"),
      type: "string",
      placeholder: i18next.t("enter_password"),
    },
    ...commonFields,
  ],
  [notifyMqtt]: [
    {
      name: "broker",
      required: true,
      label: i18next.t("broker"),
      tooltip: i18next.t("broker_tooltip"),
      type: "uri",
      placeholder: i18next.t("enter_brokers"),
    },
    {
      name: "topic",
      required: true,
      label: i18next.t("topic"),
      tooltip: i18next.t("topic_notif_MQTT"),
      type: "string",
      placeholder: i18next.t("enter_topic"),
    },
    {
      name: "username",
      label: i18next.t("username"),
      tooltip: i18next.t("MQTT_username"),
      type: "string",
      placeholder: i18next.t("enter_username"),
    },
    {
      name: "password",
      label: i18next.t("password"),
      tooltip: i18next.t("MQTT_password_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_password"),
    },
    {
      name: "qos",
      label: "QOS",
      tooltip: i18next.t("set_quality_service_priority"),
      type: "number",
      placeholder: i18next.t("enter_QOS"),
    },
    {
      name: "keep_alive_interval",
      label: i18next.t("keep_alive_interval"),
      tooltip: i18next.t("keep_alive_interval_tooltip"),
      type: "duration",
      placeholder: i18next.t("enter_keep_alive_interval"),
    },
    {
      name: "reconnect_interval",
      label: i18next.t("reconnect_interval"),
      tooltip: i18next.t("reconnect_interval_tooltip"),
      type: "duration",
      placeholder: i18next.t("enter_reconnect_interval"),
    },
    ...commonFields,
  ],
  [notifyNats]: [
    {
      name: "address",
      required: true,
      label: i18next.t("address"),
      tooltip: i18next.t("address_tooltip_NATS"),
      type: "address",
      placeholder: i18next.t("enter_address"),
    },
    {
      name: "subject",
      required: true,
      label: i18next.t("subject"),
      tooltip: i18next.t("subject_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_subject"),
    },
    {
      name: "username",
      label: i18next.t("username"),
      tooltip: i18next.t("username_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_ANTS_username"),
    },
    {
      name: "password",
      label: i18next.t("password"),
      tooltip: i18next.t("password_NATS_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_NATS_password"),
    },
    {
      name: "token",
      label: i18next.t("token"),
      tooltip: i18next.t("token_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_token"),
    },
    {
      name: "tls",
      label: "TLS",
      tooltip: i18next.t("tls_tooltip"),
      type: "on|off",
    },
    {
      name: "tls_skip_verify",
      label: i18next.t("tls_skip_verify"),
      tooltip:i18next.t("subject_TLS_tooltip"),
      type: "on|off",
    },
    {
      name: "ping_interval",
      label: i18next.t("ping_interval"),
      tooltip: i18next.t("ping_interval_tooltip"),
      type: "duration",
      placeholder: i18next.t("enter_ping_interval"),
    },
    {
      name: "streaming",
      label: i18next.t("streaming"),
      tooltip: i18next.t("streaming_tooltip"),
      type: "on|off",
    },
    {
      name: "streaming_async",
      label: i18next.t("streaming_async"),
      tooltip: i18next.t("streaming_async_tooltip"),
      type: "on|off",
    },
    {
      name: "streaming_max_pub_acks_in_flight",
      label: i18next.t("streaming_max_pub_acks_in_flight"),
      tooltip: i18next.t("streaming_max_pub_acks_in_flight_tooltip"),
      type: "number",
      placeholder: i18next.t("enter_streaming_max_pub_acks_in_flight"),
    },
    {
      name: "streaming_cluster_id",
      label: i18next.t("streaming_cluster_id"),
      tooltip: i18next.t("streaming_cluster_id_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_streaming_cluster_id"),
    },
    {
      name: "cert_authority",
      label: i18next.t("cert_authority"),
      tooltip: i18next.t("cert_authority_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_cert_authority"),
    },
    {
      name: "client_cert",
      label: i18next.t("client_cert"),
      tooltip:i18next.t("client_cert_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_client_cert"),
    },
    {
      name: "client_key",
      label: i18next.t("client_key"),
      tooltip: i18next.t("client_key-tooltip"),
      type: "string",
      placeholder: i18next.t("enter_client_key"),
    },
    ...commonFields,
  ],
  [notifyElasticsearch]: [
    {
      name: "url",
      required: true,
      label: "URL",
      tooltip:i18next.t("url_tooltip"),
      type: "url",
      placeholder: i18next.t("enter_url"),
    },
    {
      name: "index",
      required: true,
      label: i18next.t("index"),
      tooltip:i18next.t("index_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_index"),
    },
    {
      name: "format",
      required: true,
      label: i18next.t("format"),
      tooltip:i18next.t("format_tooltip"),
      type: "enum",
      placeholder: i18next.t("enter_format"),
    },
    ...commonFields,
  ],
  [notifyWebhooks]: [
    {
      name: "endpoint",
      required: true,
      label: i18next.t("endpoint"),
      tooltip:i18next.t("endpoint_tooltip"),
      type: "url",
      placeholder: i18next.t("enter_endpoit"),
    },
    {
      name: "auth_token",
      label: i18next.t("auth_token"),
      tooltip: i18next.t("auth_token_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_auth_token"),
    },
    ...commonFields,
  ],
  [notifyNsq]: [
    {
      name: "nsqd_address",
      required: true,
      label: i18next.t("nsqd_address"),
      tooltip: i18next.t("nsqd_address_tooltip"),
      type: "address",
      placeholder: i18next.t("enter_nsqd_address"),
    },
    {
      name: "topic",
      required: true,
      label: i18next.t("topic"),
      tooltip: i18next.t("topic_tooltip"),
      type: "string",
      placeholder: i18next.t("enter_topic"),
    },
    {
      name: "tls",
      label: "TLS",
      tooltip: i18next.t("tls_tooltip"),
      type: "on|off",
    },
    {
      name: "tls_skip_verify",
      label: i18next.t("tls_skip_verify"),
      tooltip:i18next.t("tls_skip_verify_tooltip"),
      type: "on|off",
    },
    ...commonFields,
  ],
};

const serviceToConfigMap: Record<string, string> = {
  webhook: "notify_webhook",
  amqp: "notify_amqp",
  kafka: "notify_kafka",
  mqtt: "notify_mqtt",
  nats: "notify_nats",
  nsq: "notify_nsq",
  mysql: "notify_mysql",
  postgresql: "notify_postgres", //looks different in server response(postgresql as opposed to postgres) from restapi/admin_notification_endpoints.go
  elasticsearch: "notify_elasticsearch",
  redis: "notify_redis",
};

export const getNotificationConfigKey = (serviceName: string) => {
  return serviceToConfigMap[serviceName];
};
