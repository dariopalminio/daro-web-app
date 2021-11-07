import dotenv from 'dotenv';

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


export const APIEndpoints = {
  auth: (process.env.REACT_APP_AUTH_API ? process.env.REACT_APP_AUTH_API : 'http://localhost:8080') as string,
  //auth: 'http://localhost:8080', //process.env.REACT_APP_AUTH_API,
  notifications: (process.env.REACT_APP_AUTH_API ? process.env.REACT_APP_NOTIFICATION_API : 'http://localhost:3001') as string,
  //notifications: 'http://localhost:3001', //process.env.REACT_APP_NOTIFICATION_API,
  backend: (process.env.REACT_APP_USER_API ? process.env.REACT_APP_USER_API : 'http://localhost:3001') as string,
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
  user_info: `${APIEndpoints.auth}/auth/realms/${Keycloak.realm}/protocol/openid-connect/userinfo`,
  users: `${APIEndpoints.auth}/auth/admin/realms/${Keycloak.realm}/users`,
  token: `${APIEndpoints.auth}/auth/realms/${Keycloak.realm}/protocol/openid-connect/token`,
  notifications: `${APIEndpoints.notifications}/notification`,
};
