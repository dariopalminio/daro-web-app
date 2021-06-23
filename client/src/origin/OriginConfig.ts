import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
  console.log(result.error);
};
console.log(result.parsed);

// REACT_APP_ENV: prod | dev | qa
export const environment = process.env.REACT_APP_ENV;

export const is_fake_mode = ((process.env.REACT_APP_FAKE === 'true') ? true : false) as boolean;

export const APIEndpoints = {
  auth: 'http://localhost:8080', //process.env.REACT_APP_AUTH_API,
  notifications: 'http://localhost:3001', //process.env.REACT_APP_NOTIFICATION_API,
};

export const Keycloak = {
  realm: process.env.REACT_APP_AUTH_REALM as string,
  client_id: process.env.REACT_APP_AUTH_CLIENT_ID as string,
  client_secret: process.env.REACT_APP_AUTH_CLIENT_SECRET as string,
  username_admin: process.env.REACT_APP_AUTH_USERNAME_ADMIN as string,
  password_admin:  process.env.REACT_APP_AUTH_PASSWORD_ADMIN as string,
  verify_email:  ((process.env.REACT_APP_AUTH_VERIFY_EMAIL === 'true') ? true : false) as boolean,
};

export const URLPath = {
  user_info: `${APIEndpoints.auth}/auth/realms/${Keycloak.realm}/protocol/openid-connect/userinfo`,
  users: `${APIEndpoints.auth}/auth/admin/realms/${Keycloak.realm}/users`,
  token: `${APIEndpoints.auth}/auth/realms/${Keycloak.realm}/protocol/openid-connect/token`,
  notifications: `${APIEndpoints.notifications}/notification/sendContactEmail`,
};
