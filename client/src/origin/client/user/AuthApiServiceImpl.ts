import * as GlobalConfig from '../../config/GlobalConfig';
import axios, { AxiosPromise } from 'axios';
import { handleAxiosError, AuthError } from '../AuthError';
import qs from 'querystring';
import { IAuthService } from '../../../state/client/IAuthService';

type NewUserRepresentationType = {
  username: string
  enabled: string
  emailVerified: string
  firstName: string
  lastName: string
  email: string
  credentials: [
    {
      type: string,
      value: string,
      temporary: string,
    },
  ],
};

type LoginRequestType = {
  username: string
  password: string
  grant_type: string
  client_id: string
  client_secret: string
};

type NewAdminTokenRequestType = {
  client_id: string,
  grant_type: string,
  username: string,
  password: string,
  scope: string,
  client_secret: string,
};

type RequesAppToken = {
  client_id: string
  grant_type: string
  client_secret: string
};

/**
 * NotificationApiService implementation 
 * Service as factory function that return an interface.
 * A factory function is any function which is not a class or constructor that returns 
 * a (presumably new) object. In JavaScript, any function can return an object.
 * @returns 
 */
export default function AuthServiceImpl(): IAuthService {

  /**
   * Generate a admin access token for create user
   * same login url: `/auth/realms/${your-realm}/protocol/openid-connect/token`,
   * headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  */
  function getAdminTokenService(): Promise<any> {
    const body: NewAdminTokenRequestType = {
      client_id: GlobalConfig.Keycloak.client_id,
      grant_type: 'password',
      username: GlobalConfig.Keycloak.username_admin,
      password: GlobalConfig.Keycloak.password_admin,
      scope: 'openid roles',
      client_secret: GlobalConfig.Keycloak.client_secret,
    };

    // Token endpoint
    const URL = GlobalConfig.URLPath.token

    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const promise: AxiosPromise<any> = axios.post(URL, qs.stringify(body))

    // using .then, create a new promise which extracts the data
    const adminToken = promise.then((response) =>
      response.data.access_token
    ).catch((error) => {
      // response.status !== 200
      const authError: AuthError = handleAxiosError(error);
      throw authError;
    });
    console.log("adminToken", adminToken);

    return adminToken;
  };

  /**
   * Get Access Token for application from auth server.
   * Obtain SAT (service account token).
   * Method POST[SAT] Obtain accsess token from a service account. 
   * Content-Type: application/x-www-form-urlencoded.
   * Body with client_id, client_secret and grant_type.
  */
  function getAppTokenService(): Promise<any> {

    const body: RequesAppToken = {
      client_id: GlobalConfig.Keycloak.client_id,
      grant_type: 'client_credentials',
      client_secret: GlobalConfig.Keycloak.client_secret,
    };

    // Token endpoint
    const URL = GlobalConfig.URLPath.token
    console.log("GlobalConfig.URLPath.TOKEN:");
    console.log(GlobalConfig.URLPath.token);

    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const promise: AxiosPromise<any> = axios.post(URL, qs.stringify(body));

    // using .then, create a new promise which extracts the data
    const adminToken = promise.then((response) =>
      response.data.access_token
    ).catch((error) => {
      // response.status !== 200
      const authError: AuthError = handleAxiosError(error);
      throw authError;
    });
    console.log("adminToken promise result:", adminToken);
    return adminToken;
  };

  /**
   * Consumer cliente for login on Keycloak Server & Bearer Token & with client secret
   * configured with OpenID Endpoint configuration, Login with email = true and Access Type = public
   * @param param0 loginRequestData LoginRequest
   * @returns access_token JWT 
   * const showDrawer = () => {
   */
  function loginService(username: string, pass: string): Promise<any> {

    const body: LoginRequestType = {
      username: username,
      password: pass,
      grant_type: 'password',
      client_id: GlobalConfig.Keycloak.client_id,
      client_secret: GlobalConfig.Keycloak.client_secret
    };

    //Login endpoint
    const URL = GlobalConfig.URLPath.token;

    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const promise: AxiosPromise<any> = axios.post(URL, qs.stringify(body));

    // using .then, create a new promise which extracts the data
    const accessToken = promise.then((response) =>
      response.data.access_token
    ).catch((error) => {
      // response.status !== 200
      const authError: AuthError = handleAxiosError(error);
      throw authError;
    });
    console.log("Login accessToken promise result:", accessToken);
    return accessToken;
  };

  /**
   * Remove all user sessions associated with the user in auth server. 
   * Also send notification to all clients that have an admin URL to invalidate the 
   * sessions for the particular user.
   * URL FORMAT: http://127.0.0.1:8180/auth/admin/realms/${your-realm}/users/${user-id}/logout
   * POST Logout user [SAT].
   * Authorization: Bearer Token.
   * Headers: Content-Type application/json.
   * @param userId 
   * @param adminToken 
   * @returns 
   */
  function logoutService(userId: string, adminToken: string): Promise<any> {

    //User endpoint
    const URL = `${GlobalConfig.URLPath.users}/${userId}/logout`;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: {}
    });

    // using .then, create a new promise which extracts the data
    const status = promise.then((response) =>
      response.status
    ).catch((error) => {
      // response.status !== 200
      const authError: AuthError = handleAxiosError(error);
      throw authError;
    });
    console.log("logoutService status promise result:", status);
    return status;
  };

  /**
 * registerService
 * 
 * Keycloak POST Create user [SAT]. Create a new user Username must be unique.
 * POST 'http://127.0.0.1:8180/auth/admin/realms/my-realm-test/users'
 * AUTHORIZATION: Bearer Token (Token is Admin Token)
 * HEADERS: Content-Type application/json
 * BODY: UserRepresentation
 * @param name 
 * @param lastname 
 * @param email 
 * @param password 
 * @returns 
 */
  function registerService(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    adminToken: string): Promise<any> {

    const body: NewUserRepresentationType = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      emailVerified: GlobalConfig.Keycloak.verify_email ? "false" : "true",
      username: email,
      credentials: [
        {
          type: 'password',
          value: password,
          temporary: "false",
        },
      ],
      enabled: "true",
    };

    //User endpoint
    const URL = GlobalConfig.URLPath.users;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: body
    });

    // using .then, create a new promise which extracts the data
    const status = promise.then((response) =>
      response.statusText
    ).catch((error) => {
      // response.status !== 200
      const authError: AuthError = handleAxiosError(error);
      throw authError;
    });
    console.log("Register accessToken promise result:", status);
    return status;
  };

  return {
    getAdminTokenService,
    getAppTokenService,
    loginService,
    logoutService,
    registerService,
  };
};
