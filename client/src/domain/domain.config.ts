import dotenv from 'dotenv';
import { AuthApiClientFactory } from '../infra/client/factory/auth-api-client.factory';
import { IAuthService } from './service/auth-service.interface';
import { NotificationApiClientFactory } from '../infra/client/factory/notification-api-client.factory';
import { INotificationService } from './service/notification-service.interface';

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
export const authorizationService: IAuthService = AuthApiClientFactory.create(is_fake_mode);
export const notificationService: INotificationService = NotificationApiClientFactory.create(is_fake_mode);