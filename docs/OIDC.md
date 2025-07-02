# OIDC
When the console is running separately and is not embedded in the same binary as the server, the OIDC SSO login configuration is not set from the server.

It needs to be configured using Environment Variables like this:
``` bash
export CONSOLE_MINIO_SERVER="http://127.0.0.1:9000";

export CONSOLE_IDP_URL="http://PROVIDER:5556/.well-known/openid-configuration";
export CONSOLE_IDP_CLIENT_ID="minio-client-app";
export CONSOLE_IDP_SECRET="minio-client-app-secret";
export CONSOLE_IDP_CALLBACK="http://CONSOLE:9090/oauth_callback";
export CONSOLE_IDP_DISPLAY_NAME="Login with OIDC";

./console server
```
> [!IMPORTANT]  
> Currently, the following environment variables are mandatory: `CONSOLE_IDP_URL`, `CONSOLE_IDP_CLIENT_ID`, `CONSOLE_IDP_SECRET` and `CONSOLE_IDP_CALLBACK`.

For convenience, the same environment variables are supported as for the server, with the `CONSOLE_` ones taking precedence over the `MINIO_` ones.  
This means you can use the same variables as you would set on the server and share them with the console.  

| Console Environment Variables | MinIO Server Environment Variables | Required | Example |
| -- | -- | -- | -- |
CONSOLE_IDP_DISPLAY_NAME | MINIO_IDENTITY_OPENID_DISPLAY_NAME | | "Login with OIDC"
CONSOLE_IDP_URL | MINIO_IDENTITY_OPENID_CONFIG_URL | ✓ | https://provider/.well-known/openid-configuration"
CONSOLE_IDP_CLIENT_ID | MINIO_IDENTITY_OPENID_CLIENT_ID | ✓ | minio-client-app
CONSOLE_IDP_SECRET | MINIO_IDENTITY_OPENID_CLIENT_SECRET | ✓ | minio-client-app-secret
CONSOLE_IDP_CALLBACK | MINIO_BROWSER_REDIRECT_URL | ✓ | https://console/oauth_callback" |
CONSOLE_IDP_CALLBACK_DYNAMIC | MINIO_IDENTITY_OPENID_REDIRECT_URI_DYNAMIC | | on / off |
CONSOLE_IDP_SCOPES | MINIO_IDENTITY_OPENID_SCOPES | | "openid,profile,email" 
CONSOLE_IDP_USERINFO | MINIO_IDENTITY_OPENID_CLAIM_USERINFO | |on / off |
CONSOLE_IDP_ROLE_POLICY | MINIO_IDENTITY_OPENID_ROLE_POLICY | | "app-bucket-write,app-bucket-list" |
CONSOLE_IDP_END_SESSION_ENDPOINT | | |
