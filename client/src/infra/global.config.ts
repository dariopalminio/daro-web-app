import dotenv from 'dotenv';
import { IAuthClient } from '../domain/service/auth-client.interface';
import { IAuthTokensClient } from '../domain/service/auth-tokens-client.interface';
import { INotificationClient } from '../domain/service/notification-client.interface';
import { IProductClient } from '../domain/service/product-client.interface';
import { IProfileClient } from '../domain/service/profile-client.interface';
import { ApiAuthClientFactory } from './client/factory/api-auth-client.factory';
import { AuthApiClientFactory } from './client/factory/auth-api-client.factory';
import { NotificationApiClientFactory } from './client/factory/notification-api-client.factory';
import { ProductApiClientFactory } from './client/factory/product-api.factory';
import { ProfileApiClientFactory } from './client/factory/profile-api-factory';

/**
 * Global Config file
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


export const app_url = (process.env.REACT_APP_URL ? process.env.REACT_APP_URL : 'http://localhost:3000') as string;

export const app_company_name = (process.env.REACT_APP_COMPANY_NAME ? process.env.REACT_APP_COMPANY_NAME : 'Daro 2021') as string;

export const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;

//Injection of services from origin
export const authTokensClient: IAuthTokensClient = AuthApiClientFactory.create(is_fake_mode);
export const notificationClient: INotificationClient = NotificationApiClientFactory.create(is_fake_mode);
export const userAuthClient: IAuthClient = ApiAuthClientFactory.create(is_fake_mode);
export const profileClient: IProfileClient = ProfileApiClientFactory.create(is_fake_mode);
export const productClient: IProductClient = ProductApiClientFactory.create(is_fake_mode);
