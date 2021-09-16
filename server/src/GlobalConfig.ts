
require('dotenv').config();

export const PORT: number = Number(process.env.SERVER_BFF_PORT);

export const COMPANY_NAME: string = process.env.SERVER_BFF_COMPANY_NAME;

export const AUTH_MIDDLEWARE_ON = process.env.SERVER_BFF_AUTH_MIDDLEWARE_ON.toLowerCase() == 'true' ? true : false; 

export const email = {
  HOST: process.env.SERVER_BFF_EMAIL_HOST as string,
  PORT: Number(process.env.SERVER_BFF_EMAIL_PORT) as number,
  USER: process.env.SERVER_BFF_EMAIL_USER as string,
  PASS: process.env.SERVER_BFF_EMAIL_PASS as string,
  FROM: process.env.SERVER_BFF_EMAIL_FROM as string,
  APP_NAME: process.env.SERVER_BFF_EMAIL_APP_NAME as string
}


export const PUBLIC_KEY = process.env.SERVER_BFF_KEYCLOAK_PUBLIC_KEY as string;