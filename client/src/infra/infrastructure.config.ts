import dotenv from 'dotenv';
import { IAuthTokensClient } from '../domain/service/auth-tokens-client.interface';
import { AuthApiClientFactory } from './client/factory/auth-api-client.factory';

/**
 * Config file for infrastructure layer
 * 
 * Having a separate configuration file allows you to access variables instantly and
 * improves the maintainability of the codebase since all the variables are in the 
 * same file. 
 */

const result = dotenv.config();

if (result.error) {
  console.log(result.error);
};
console.log(result.parsed);

// REACT_APP_ENV: prod | dev | qa
export const environment = process.env.REACT_APP_ENV;

export const is_fake_mode = ((process.env.REACT_APP_FAKE === 'true') ? true : false) as boolean;

export const urlImages = (process.env.REACT_APP_URL_STATIC_IMG ? process.env.REACT_APP_URL_STATIC_IMG : 'No_URL_Configured') as string;

export const APIEndpoints = {
  authKeycloak: (process.env.REACT_APP_KEYCLOAK ? process.env.REACT_APP_KEYCLOAK : 'http://localhost:8080') as string,
  notifications: process.env.REACT_APP_NOTIFICATION_API as string,
  auth: process.env.REACT_APP_API_AUTH as string,
  users: process.env.REACT_APP_API_USER as string,
  products:  process.env.REACT_APP_API_PRODUCTS as string,
};

export const Keycloak = {
  realm: process.env.REACT_APP_AUTH_REALM as string,
  client_id: process.env.REACT_APP_AUTH_CLIENT_ID as string,
  client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET as string,
  username_admin: process.env.REACT_APP_AUTH_USERNAME_ADMIN as string,
  password_admin:  process.env.REACT_APP_AUTH_PASSWORD_ADMIN as string,
  verify_email:  ((process.env.REACT_APP_AUTH_VERIFY_EMAIL === 'true') ? true : false) as boolean,
};

export const KeycloakPath = {
  user_info: `${APIEndpoints.authKeycloak}/auth/realms/${Keycloak.realm}/protocol/openid-connect/userinfo`,
  users: `${APIEndpoints.authKeycloak}/auth/admin/realms/${Keycloak.realm}/users`,
  token: `${APIEndpoints.authKeycloak}/auth/realms/${Keycloak.realm}/protocol/openid-connect/token`,
};


