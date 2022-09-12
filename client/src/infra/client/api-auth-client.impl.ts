import * as InfraConfig from '../infrastructure.config';
import axios, { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError, AuthStatusEnum } from './api.error';
import qs from 'querystring';
import { IAuthClient } from '../../domain/service/auth-client.interface';
import { Tokens } from '../../domain/model/auth/tokens.type';
import { AxiosError } from 'axios';

/**
 * Auth Api Client Implementation
 * @returns 
 */
export default function ApiAuthClientImpl(): IAuthClient {

  /**
   * register
   * 
   * @param username 
   * @param firstName 
   * @param lastName 
   * @param email 
   * @param password 
   * @param adminToken 
   * @returns 
   */
  function register(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    adminToken: string): Promise<any> {

    const body = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    console.log("register:", body);

    //User endpoint
    const URL = `${InfraConfig.APIEndpoints.auth}/register`;
    console.log("url register:", URL);
    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: body
    });

    // using .then, create a new promise which extracts the data
    const r: Promise<any> = promise.then((response) =>
      response
    ).catch((error) => {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });
    //console.log(statusNumber);
    return r;
  };

  /**
   * Send Start Email confirmation with verification code to register process.
   * @param name 
   * @param email 
   * @param code 
   * @param accessToken 
   * @returns 
   */
  function sendStartEmailConfirm(
    name: string,
    email: string,
    verificationPageLink: string,
    lang: string,
    adminToken: string
    ): Promise<any> {

    //Notification endpoint
    const URL = `${InfraConfig.APIEndpoints.auth}/register/confirm/start`;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': `application/json`,
        'lang': lang,
      },
      data: {
        'name': name,
        'userName': email,
        'email': email,
        'verificationPageLink': verificationPageLink,
      }
    });

    // Using .then, create a new promise which extracts the data
    const info: Promise<any> = promise
      .then((response) => response.data)
      .catch((error) => {
        const authError: ApiError = handleAxiosError(error);
        if (authError.status === AuthStatusEnum.UNAUTHORIZED) {
          // Request a new token
          //const newAccessToken = accessToken;
          // Do a retry with a new token
          //return sendContactEmailService(contactData, newAccessToken, false);
          throw authError;
        } else {
          throw authError;
        };
      });

    console.log(info);

    return info;
  };


  /**
   * Confirm Account
   * @param token 
   * @param adminToken 
   * @returns 
   */
  function confirmAccount(
    token: string,
    lang: string,
    adminToken: string): Promise<any> {

    const body = {
      token: token,
    };

    console.log("body create user:", body);
    //User endpoint
    const URL = `${InfraConfig.APIEndpoints.auth}/register/confirm`;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: { 
        'Authorization': `Bearer ${adminToken}`, 
        'lang': lang, },
      data: body
    });

    // using .then, create a new promise which extracts the data
    const resp: Promise<any> = promise.then((response) =>
      response
    ).catch((error) => {
      // response.status !== 200
      console.log("error:",error);
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });
    console.log("resp:",resp);
    return resp;
  };

  /**
   * 
   * @param username 
   * @param pass 
   * @returns 
   */
  function loginService(username: string, pass: string): Promise<Tokens> {

    const body = {
      username: username,
      password: pass
    };

    //Login endpoint
    const URL = `${InfraConfig.APIEndpoints.auth}/tokens/login`;

    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const promise: AxiosPromise<any> = axios.post(URL, qs.stringify(body));

    // using .then, create a new promise which extracts the data
    const tokens: Promise<Tokens> = promise.then((response) => {
      console.log('loginService.response',response);
      return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_in: response.data.expires_in,
        refresh_expires_in: response.data.refresh_expires_in,
        date: new Date()
      }
    }
    ).catch((error) => {
      // response.status !== 200
      console.log('loginService.error',error);
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });

    return tokens;
  };

  /**
   * logout
   * @param userId 
   * @param adminToken 
   * @returns 
   */
  function logoutService(userId: string, adminToken: string): Promise<number> {

    //User endpoint
    const URL = `${InfraConfig.APIEndpoints.auth}/logout`;

    const body = {
      id: userId,
      adminToken: adminToken
    };

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: qs.stringify(body)
    });

    // using .then, create a new promise which extracts the data
    const status: Promise<number> = promise.then((response) =>
      response.status
    ).catch((error) => {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });

    return status;
  };

  /**
   * Send Start Email with verification code to password recovery process.
   * @param name 
   * @param email 
   * @param recoveryPageLink 
   * @param accessToken 
   * @returns 
   */
  function sendEmailToRecoveryPass(
    email: string,
    recoveryPageLink: string,
    lang: string,
    adminToken: string): Promise<any> {

    //Notification endpoint
    const URL = `${InfraConfig.APIEndpoints.auth}/recovery/start`;
    console.log("recovery URL:", URL);
    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': `application/json`,
        'lang': lang, 
      },
      data: {
        'userName': email,
        'email': email,
        'recoveryPageLink': recoveryPageLink,
      }
    });

    // Using .then, create a new promise which extracts the data
    const info: Promise<any> = promise
      .then((response) => response.data)
      .catch((error) => {
        const authError: ApiError = handleAxiosError(error);
          throw authError;
      });

    return info;
  };

  /**
   * Update Password
   * Reset password in recovery process.
   * @param token 
   * @param password 
   * @param adminToken 
   * @returns 
   */
  async function updatePassword(
    token: string,
    password: string,
    lang: string,
    adminToken: string): Promise<any> {
      
    const body = {
      token: token,
      password: password
    };

    //User endpoint
    const URL = `${InfraConfig.APIEndpoints.auth}/recovery/update`;
    try {
      const response: any = await axios({
        method: 'post',
        url: URL,
        headers: { 
          'Authorization': `Bearer ${adminToken}`,
          'lang': lang,  },
        data: body
      });

      return response.data;
    } catch (err: any) {
      const authError: ApiError = handleAxiosError(err);
      throw authError;
    }
  };


  return {
    register,
    sendStartEmailConfirm,
    confirmAccount,
    loginService,
    logoutService,
    sendEmailToRecoveryPass,
    updatePassword
  };
};
