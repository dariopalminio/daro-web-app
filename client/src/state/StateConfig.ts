import dotenv from 'dotenv';
import { AuthApiClientFactory } from '../origin/client/user/AuthApiClientFactory';
import { IAuthClient } from './client/IAuthClient';
import { NotificationApiClientFactory } from '../origin/client/notification/NotificationApiClientFactory';
import { INotificationClient } from './client/INotificationClient';

const result = dotenv.config();

if (result.error) {
  console.log(result.error);
};
console.log(result.parsed);

// REACT_APP_ENV: prod | dev | qa
export const environment = process.env.REACT_APP_ENV;

export const is_fake_mode = ((process.env.REACT_APP_FAKE === 'true') ? true : false) as boolean;

//Injection of services from origin
export const authorizationService: IAuthClient = AuthApiClientFactory.create(is_fake_mode);
export const notificationService: INotificationClient = NotificationApiClientFactory.create(is_fake_mode);