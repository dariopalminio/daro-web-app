

require('dotenv').config();


// CLIENT_WEB_APP_ENV: prod | dev | qa
export const environment = process.env.CLIENT_WEB_APP_ENV

export const APIEndpoints = {
  AUTH: process.env.CLIENT_WEB_APP_AUTH_API,
  NOTIFICATION: process.env.CLIENT_WEB_APP_NOTIFICATION_API,
}

export const Keycloak = {
  REALM: process.env.CLIENT_WEB_APP_AUTH_REALM as string,
  CLIENT_ID: process.env.CLIENT_WEB_APP_AUTH_CLIENT_ID as string,
  CLIENT_SECRET: process.env.CLIENT_WEB_APP_AUTH_CLIENT_SECRET as string,
  USERNAME_ADMIN: process.env.CLIENT_WEB_APP_AUTH_USERNAME_ADMIN as string,
  PASSWORD_ADMIN: process.env.CLIENT_WEB_APP_AUTH_PASSWORD_ADMIN as string,
  VERIFY_EMAIL: ((process.env.CLIENT_WEB_APP_AUTH_VERIFY_EMAIL === 'true') ? true : false) as boolean
}

export const URLPath = {
  USER_INFO: `${APIEndpoints.AUTH}/auth/realms/${Keycloak.REALM}/protocol/openid-connect/userinfo`,
  USERS: `${APIEndpoints.AUTH}/auth/admin/realms/${Keycloak.REALM}/users`,
  TOKEN: `${APIEndpoints.AUTH}/auth/realms/${Keycloak.REALM}/protocol/openid-connect/token`,
  NOTIFICATION: `${APIEndpoints.NOTIFICATION}/notification/sendContactEmail`,
}


