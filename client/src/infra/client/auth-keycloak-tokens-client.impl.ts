import * as OriginConfig from '../global.config';
import axios, { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError } from './api.error';
import qs from 'querystring';
import { IAuthTokensClient } from '../../domain/service/auth-tokens-client.interface';

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

type RequesRefreshToken = {
  client_id: string
  grant_type: string
  refresh_token: string
  client_secret: string
};

/**
 * Auth Api Client Implementation
 * 
 * This implements Keycloak client.
 * Service as factory function that return an interface.
 * A factory function is any function which is not a class or constructor that returns 
 * a (presumably new) object. In JavaScript, any function can return an object.
 * @returns 
 */
export default function AuthKeycloakTokensClientImpl(): IAuthTokensClient {

  /**
   * Get Admin Token
   * 
   * Get a admin access token (from auth server) for next time can create user or update user.
   * same login url: `/auth/realms/${your-realm}/protocol/openid-connect/token`,
   * headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  */
  async function getAdminTokenService(): Promise<string> {
    try {
      const body: NewAdminTokenRequestType = {
        client_id: OriginConfig.Keycloak.client_id,
        grant_type: 'password',
        username: OriginConfig.Keycloak.username_admin,
        password: OriginConfig.Keycloak.password_admin,
        scope: 'openid roles',
        client_secret: OriginConfig.Keycloak.client_secret,
      };

      // Token endpoint
      const URL = OriginConfig.KeycloakPath.token

      //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
      const response = await axios.post(URL, qs.stringify(body))

      // using .then, create a new promise which extracts the data
      /*
      const adminToken: Promise<string> = promise.then((response) =>
        response.data.access_token
      ).catch((error) => {
        // response.status !== 200
        const authError: ApiError = handleAxiosError(error);
        throw authError;
      });
      */

      return response.data.access_token;
    } catch (error: any) {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    }
  };

  /**
   * Get App Token
   * 
   * Get Access Token for application from auth server.
   * 
   * Obtain SAT (service account token).
   * Method POST[SAT] Obtain accsess token from a service account. 
   * Content-Type: application/x-www-form-urlencoded.
   * Body with client_id, client_secret and grant_type.
  */
  async function getAppTokenService(): Promise<string> {
    try {
      const body: RequesAppToken = {
        client_id: OriginConfig.Keycloak.client_id,
        grant_type: 'client_credentials',
        client_secret: OriginConfig.Keycloak.client_secret,
      };

      // Token endpoint
      const URL = OriginConfig.KeycloakPath.token

      //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
      const response = await axios.post(URL, qs.stringify(body));

      // using .then, create a new promise which extracts the data
      /** 
      const appToken: Promise<string> = promise.then((response) =>
        response.data.access_token
      ).catch((error) => {
        // response.status !== 200
        const authError: ApiError = handleAxiosError(error);
        throw authError;
      });
  */
      return response.data.access_token;
    } catch (error: any) {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    }
  };


  /**
   * Get Refresh Token
   * 
   * getRefreshTokenService is used when you need to make the user keep login in the system 
   * if the user's access_token get expired and user want to keep login. How can I get newly 
   * updated access_token with this function.
   * Use Refresh Tokens
   * Method: POST
   * URL: https://keycloak.example.com/auth/realms/myrealm/protocol/openid-connect/token
   * Body type: x-www-form-urlencoded
   * Form fields:
   * client_id : <my-client-name>
   * grant_type : refresh_token
   * refresh_token: <my-refresh-token>
   * 
   * @param refresh_token 
   * @returns 
   */
  async function getRefreshTokenService(refreshToken: string): Promise<any> {
    try {
      console.log('getRefreshTokenService.refreshToken:', refreshToken);
      const body: RequesRefreshToken = {
        client_id: OriginConfig.Keycloak.client_id,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_secret: OriginConfig.Keycloak.client_secret,
      };

      // Token endpoint
      const URL = OriginConfig.KeycloakPath.token

      const response = await axios.post(URL, qs.stringify(body));

      // using .then, create a new promise which extracts the data
      /*
      const tokens: Promise<any> = promise.then((response) => {
        console.log('getRefreshTokenService.response',response);
        return response;
      }
      ).catch((error) => {
        // response.status !== 200
        const authError: ApiError = handleAxiosError(error);
        throw authError;
      });
  */
      return response;
    } catch (error: any) {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    }
  };

  return {
    getAdminTokenService,
    getAppTokenService,
    getRefreshTokenService
  };
};
