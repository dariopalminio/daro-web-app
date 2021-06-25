import dotenv from 'dotenv';
import { AuthApiClientFactory } from '../infrastructure/client/factory/AuthApiClientFactory';
import { IAuthService } from './service/IAuthService';
import { NotificationApiClientFactory } from '../infrastructure/client/factory/NotificationApiClientFactory';
import { INotificationClient } from './service/INotificationClient';

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
export const notificationService: INotificationClient = NotificationApiClientFactory.create(is_fake_mode);