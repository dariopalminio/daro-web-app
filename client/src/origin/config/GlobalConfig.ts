//require('dotenv').config();
//require('dotenv').load();
import dotenv from 'dotenv';
const result = dotenv.config();

//require('dotenv').config({ path: '/full/custom/path/to/your/env/vars' })

// CLIENT_WEB_APP_ENV: prod | dev | qa
export const environment = process.env.CLIENT_APP_ENV;

export const APIEndpoints = {
  auth: 'http://localhost:8080', //process.env.CLIENT_WEB_APP_AUTH_API,
  notifications: 'http://localhost:3001', //process.env.CLIENT_WEB_APP_NOTIFICATION_API,
};

/**
CLIENT_WEB_APP_AUTH_REALM=my-realm-test
CLIENT_WEB_APP_AUTH_CLIENT_ID=rest-client-test
CLIENT_WEB_APP_AUTH_CLIENT_SECRET=2b525aa8-315c-4782-8e78-8b0da22c47f9
CLIENT_WEB_APP_AUTH_USERNAME_ADMIN=dachoy@stefanini.com
CLIENT_WEB_APP_AUTH_PASSWORD_ADMIN=12345asdfg
CLIENT_WEB_APP_AUTH_VERIFY_EMAIL=false
 */
export const Keycloak = {
  realm: 'my-realm-test', // process.env.CLIENT_WEB_APP_AUTH_REALM as string,
  client_id: 'rest-client-test', // process.env.CLIENT_WEB_APP_AUTH_CLIENT_ID as string,
  client_secret: '2b525aa8-315c-4782-8e78-8b0da22c47f9', // process.env.CLIENT_WEB_APP_AUTH_CLIENT_SECRET as string,
  username_admin: 'dachoy@stefanini.com', // process.env.CLIENT_WEB_APP_AUTH_USERNAME_ADMIN as string,
  password_admin:  '12345asdfg', //process.env.CLIENT_WEB_APP_AUTH_PASSWORD_ADMIN as string,
  verify_email:  false, //((process.env.CLIENT_WEB_APP_AUTH_VERIFY_EMAIL === 'true') ? true : false) as boolean,
};

export const URLPath = {
  user_info: `${APIEndpoints.auth}/auth/realms/${Keycloak.realm}/protocol/openid-connect/userinfo`,
  users: `${APIEndpoints.auth}/auth/admin/realms/${Keycloak.realm}/users`,
  token: `${APIEndpoints.auth}/auth/realms/${Keycloak.realm}/protocol/openid-connect/token`,
  notifications: `${APIEndpoints.notifications}/notification/sendContactEmail`,
};
console.log("Config result: ", result);
console.log(`${__dirname}.env`);
console.log("Config:");
console.log("Environment:", process.env.CLIENT_WEB_APP_ENV);
console.log(APIEndpoints);
console.log(Keycloak);
console.log(URLPath);

