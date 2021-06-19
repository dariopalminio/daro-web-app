
require('dotenv').config();

export const email = {
  host: process.env.SERVER_API_EMAIL_HOST as string,
  port: process.env.SERVER_API_EMAIL_PORT as string,
  user: process.env.SERVER_API_EMAIL_USER as string,
  pass: process.env.SERVER_API_EMAIL_PASS as string,
  from: process.env.SERVER_API_EMAIL_FROM as string,
  app_name: process.env.SERVER_API_EMAIL_APP_NAME as string
}


export const PUBLIC_KEY = process.env.SERVER_API_KEYCLOAK_PUBLIC_KEY as string