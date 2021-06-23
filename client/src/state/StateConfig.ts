import dotenv from 'dotenv';
import { AuthClientFactory } from '../origin/client/user/AuthClientFactory';
import { IAuthClient } from './client/IAuthClient';
import { NotificationClientFactory } from '../origin/client/notification/NotificationClientFactory';
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
export const authorizationService: IAuthClient = AuthClientFactory.create(is_fake_mode);
export const notificationService: INotificationClient = NotificationClientFactory.create(is_fake_mode);