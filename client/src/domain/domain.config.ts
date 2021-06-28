import dotenv from 'dotenv';
import { AuthApiClientFactory } from '../infrastructure/client/factory/auth.api.client.factory';
import { IAuthService } from './service/auth.service.interface';
import { NotificationApiClientFactory } from '../infrastructure/client/factory/notification.api.client.factory';
import { INotificationService } from './service/notification.service.interface';

const result = dotenv.config();

if (result.error) {
  console.log(result.error);
};
console.log(result.parsed);

// REACT_APP_ENV: prod | dev | qa
export const environment = process.env.REACT_APP_ENV;

export const is_fake_mode = ((process.env.REACT_APP_FAKE === 'true') ? true : false) as boolean;

//Injection of services from origin
export const authorizationService: IAuthService = AuthApiClientFactory.create(is_fake_mode);
export const notificationService: INotificationService = NotificationApiClientFactory.create(is_fake_mode);