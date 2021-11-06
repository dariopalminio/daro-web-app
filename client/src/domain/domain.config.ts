import dotenv from 'dotenv';
import { AuthApiClientFactory } from '../infra/client/factory/auth-api-client.factory';
import { UserApiClientFactory } from '../infra/client/factory/user-api-client.factory';
import { IAuthTokensClient } from './service/auth-tokens-client.interface';
import { IUserClient } from './service/user-client.interface';
import { NotificationApiClientFactory } from '../infra/client/factory/notification-api-client.factory';
import { INotificationClient } from './service/notification-client.interface';

const result = dotenv.config();

if (result.error) {
  console.log(result.error);
};
console.log(result.parsed);

// REACT_APP_ENV: prod | dev | qa
export const environment = process.env.REACT_APP_ENV;

export const is_fake_mode = ((process.env.REACT_APP_FAKE === 'true') ? true : false) as boolean;

export const app_url = (process.env.REACT_APP_URL ? process.env.REACT_APP_URL : 'http://localhost:3000') as string;

export const app_company_name = (process.env.REACT_APP_COMPANY_NAME ? process.env.REACT_APP_COMPANY_NAME : 'Daro 2021') as string;


//Injection of services from origin
export const authorizationClient: IAuthTokensClient = AuthApiClientFactory.create(is_fake_mode);
export const notificationClient: INotificationClient = NotificationApiClientFactory.create(is_fake_mode);
export const userClient: IUserClient = UserApiClientFactory.create(is_fake_mode);
