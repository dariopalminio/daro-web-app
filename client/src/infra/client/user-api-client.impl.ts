import * as OriginConfig from '../infrastructure.config';
import axios, { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError, AuthStatusEnum } from './api.client.error';
import qs from 'querystring';
import { IUserService } from '../../domain/service/user-service.interface';



export default function UserApiClientImpl(): IUserService {

  /**
   * Create User
   * @param authId 
   * @param firstname 
   * @param lastname 
   * @param email 
   * @param adminToken 
   * @returns 
   */
  function createUser(
    authId: string,
    firstName: string,
    lastName: string,
    email: string,
    adminToken: string): Promise<number> {

    const body = {
      authId: authId,
      userName: email,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    console.log("body create user:",body);
    //User endpoint
    const URL = `${OriginConfig.URLPath.user}/create`;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: body
    });

    // using .then, create a new promise which extracts the data
    const statusNumber: Promise<number> = promise.then((response) =>
      response.status
    ).catch((error) => {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });
    //console.log(statusNumber);
    return statusNumber;
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
    accessToken: string ): Promise<any> {

    //Notification endpoint
    const URL = `${OriginConfig.URLPath.user}/sendStartEmailConfirm`;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': `application/json`,
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
          if (authError.status === AuthStatusEnum.UNAUTHORIZED ){
            console.log("sendContactEmailService-->UNAUTHORIZED!!!");
            // Request a new token
            //const newAccessToken = accessToken;
            // Do a retry with a new token
            //return sendContactEmailService(contactData, newAccessToken, false);
            throw authError;
          }else{
            console.log("sendContactEmailService-->throw authError!!!");
            throw authError;
          };
        });
  
        console.log(info);
        
      return info;

  };
  

  function isVerificationCodeOk(
    token: string,
    adminToken: string): Promise<any> {

    const body = {
      token: token,
    };

    console.log("body create user:",body);
    //User endpoint
    const URL = `${OriginConfig.URLPath.user}/isVerificationCodeOk`;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: body
    });

    // using .then, create a new promise which extracts the data
    const resp: Promise<any> = promise.then((response) =>
      response
    ).catch((error) => {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });
    //console.log(statusNumber);
    return resp;
  };

  return {
    createUser,
    sendStartEmailConfirm,
    isVerificationCodeOk
  };
};
