import dotenv from 'dotenv';
import { AuthApiClientFactory } from '../infra/client/factory/auth-api-client.factory';
import { ApiAuthClientFactory } from '../infra/client/factory/api-auth-client.factory';
import { IAuthTokensClient } from './service/auth-tokens-client.interface';
import { IAuthClient } from './service/auth-client.interface';
import { NotificationApiClientFactory } from '../infra/client/factory/notification-api-client.factory';
import { INotificationClient } from './service/notification-client.interface';
import { IProfileClient } from './service/profile-client.interface';
import { ProfileApiClientFactory } from '../infra/client/factory/profile-api-factory';

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
export const authTokensClient: IAuthTokensClient = AuthApiClientFactory.create(is_fake_mode);
export const notificationClient: INotificationClient = NotificationApiClientFactory.create(is_fake_mode);
export const userAuthClient: IAuthClient = ApiAuthClientFactory.create(is_fake_mode);
export const profileClient: IProfileClient = ProfileApiClientFactory.create(is_fake_mode);


