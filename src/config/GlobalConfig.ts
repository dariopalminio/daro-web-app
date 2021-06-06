
require('dotenv').config();

// REACT_APP_ENV: prod | dev | qa
export const environment = process.env.REACT_APP_ENV

export const APIEndpoints = {
  auth: process.env.REACT_APP_AUTH_API,
}

export const Keycloak = {
  realm: process.env.REACT_APP_AUTH_REALM as string,
  client_id: process.env.REACT_APP_AUTH_CLIENT_ID as string,
  client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET as string,
  username_admin: process.env.REACT_APP_AUTH_USERNAME_ADMIN as string,
  password_admin: process.env.REACT_APP_AUTH_PASSWORD_ADMIN as string,
}

