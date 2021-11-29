
require('dotenv').config();

// SERVER_BFF_ENV: prod | dev | qa
export const environment = process.env.SERVER_BFF_ENV;

export const PORT: number = Number(process.env.SERVER_BFF_PORT) as number;
export const PREFIX_ROUTE: string = process.env.SERVER_BFF_PREFIX_ROUTE;
export const COMPANY_NAME: string = process.env.SERVER_BFF_COMPANY_NAME;

export const AUTH_MIDDLEWARE_ON = process.env.SERVER_BFF_AUTH_MIDDLEWARE_ON.toLowerCase() == 'true' ? true : false; 

export const APP_NAME: string = process.env.SERVER_BFF_APP_NAME;
export const VERSION: string = process.env.SERVER_BFF_VERSION;

export const EXPIRATION_DAYS_LIMIT: number = Number(process.env.SERVER_BFF_AUTH_EXPIRATION_DAYS_LIMIT) as number;


export const email = {
  HOST: process.env.SERVER_BFF_EMAIL_HOST as string,
  PORT: Number(process.env.SERVER_BFF_EMAIL_PORT) as number,
  USER: process.env.SERVER_BFF_EMAIL_USER as string,
  PASS: process.env.SERVER_BFF_EMAIL_PASS as string,
  FROM: process.env.SERVER_BFF_EMAIL_FROM as string,
  APP_NAME: process.env.SERVER_BFF_EMAIL_APP_NAME as string
};

export const PUBLIC_KEY = process.env.SERVER_BFF_KEYCLOAK_PUBLIC_KEY as string;

export const is_fake_mode = ((process.env.SERVER_BFF_FAKE === 'true') ? true : false) as boolean;


export const APIEndpoints = {
  auth: (process.env.SERVER_BFF_AUTH_API ? process.env.SERVER_BFF_AUTH_API : 'http://localhost:8080') as string,
};

export const Keycloak = {
  realm: process.env.SERVER_BFF_AUTH_REALM as string,
  client_id: process.env.SERVER_BFF_AUTH_CLIENT_ID as string,
  client_secret: process.env.SERVER_BFF_AUTH_CLIENT_SECRET as string,
  username_admin: process.env.SERVER_BFF_AUTH_USERNAME_ADMIN as string,
  password_admin:  process.env.SERVER_BFF_AUTH_PASSWORD_ADMIN as string,
  verify_email:  ((process.env.SERVER_BFF_AUTH_VERIFY_EMAIL === 'true') ? true : false) as boolean,
};

export const KeycloakPath = {
  user_info: `${APIEndpoints.auth}/auth/realms/${Keycloak.realm}/protocol/openid-connect/userinfo`,
  users: `${APIEndpoints.auth}/auth/admin/realms/${Keycloak.realm}/users`,
  token: `${APIEndpoints.auth}/auth/realms/${Keycloak.realm}/protocol/openid-connect/token`,
};

export const DB = {
    MONGO_ON_SERVER: process.env.SERVER_BFF_MONGO_ON_SERVER as string,
    MONGO_DB: process.env.SERVER_BFF_MONGO_DB as string,
    MONGO_HOST:process.env.SERVER_BFF_MONGO_HOST as string,
    MONGO_USERNAME: process.env.SERVER_BFF_MONGO_USERNAME as string,
    MONGO_USERPASSWORD: process.env.SERVER_BFF_MONGO_USERPASSWORD as string,
  };