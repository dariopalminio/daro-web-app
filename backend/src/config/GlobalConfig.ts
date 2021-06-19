
require('dotenv').config();

export const AUTH_MIDDLEWARE_ON = process.env.BACKEND_WEB_APP_AUTH_MIDDLEWARE_ON

export const email = {
  HOST: process.env.BACKEND_WEB_APP_EMAIL_HOST as string,
  PORT: parseInt(process.env.BACKEND_WEB_APP_EMAIL_PORT, 3) as number,
  USER: process.env.BACKEND_WEB_APP_EMAIL_USER as string,
  PASS: process.env.BACKEND_WEB_APP_EMAIL_PASS as string,
  FROM: process.env.BACKEND_WEB_APP_EMAIL_FROM as string,
  APP_NAME: process.env.BACKEND_WEB_APP_EMAIL_APP_NAME as string
}


export const PUBLIC_KEY = process.env.BACKEND_WEB_APP_KEYCLOAK_PUBLIC_KEY as string