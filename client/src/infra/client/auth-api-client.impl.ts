import * as OriginConfig from '../infrastructure.config';
import axios, { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError, AuthStatusEnum } from './api.client.error';
import qs from 'querystring';
import { IAuthClient } from '../../domain/service/auth-client.interface';
import { Tokens } from '../../domain/model/user/tokens.type';

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
  //attributes: {
  //  verificationCode: string,
  //},
};

type ConfirmEmailType = {
  username: string
  enabled: string
  emailVerified: string
  email: string
  //attributes: {
  //  verificationCode: string,
  //},
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
export default function AuthApiClientImpl(): IAuthClient {

  /**
   * Get Admin Token
   * 
   * Get a admin access token (from auth server) for next time can create user or update user.
   * same login url: `/auth/realms/${your-realm}/protocol/openid-connect/token`,
   * headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  */
  function getAdminTokenService(): Promise<string> {
    const body: NewAdminTokenRequestType = {
      client_id: OriginConfig.Keycloak.client_id,
      grant_type: 'password',
      username: OriginConfig.Keycloak.username_admin,
      password: OriginConfig.Keycloak.password_admin,
      scope: 'openid roles',
      client_secret: OriginConfig.Keycloak.client_secret,
    };

    // Token endpoint
    const URL = OriginConfig.URLPath.token

    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const promise: AxiosPromise<any> = axios.post(URL, qs.stringify(body))

    // using .then, create a new promise which extracts the data
    const adminToken: Promise<string> = promise.then((response) =>
      response.data.access_token
    ).catch((error) => {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });

    return adminToken;
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
  function getAppTokenService(): Promise<string> {

    const body: RequesAppToken = {
      client_id: OriginConfig.Keycloak.client_id,
      grant_type: 'client_credentials',
      client_secret: OriginConfig.Keycloak.client_secret,
    };

    // Token endpoint
    const URL = OriginConfig.URLPath.token
    //console.log("GlobalConfig.URLPath.TOKEN:");
    //console.log(OriginConfig.URLPath.token);

    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const promise: AxiosPromise<any> = axios.post(URL, qs.stringify(body));

    // using .then, create a new promise which extracts the data
    const appToken: Promise<string> = promise.then((response) =>
      response.data.access_token
    ).catch((error) => {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });

    return appToken;
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
  function getRefreshTokenService(refreshToken: string): Promise<Tokens> {

    const body: RequesRefreshToken = {
      client_id: OriginConfig.Keycloak.client_id,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_secret: OriginConfig.Keycloak.client_secret,
    };

    // Token endpoint
    const URL = OriginConfig.URLPath.token
    //console.log("GlobalConfig.URLPath.TOKEN:");
    //console.log(OriginConfig.URLPath.token);

    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const promise: AxiosPromise<any> = axios.post(URL, qs.stringify(body));

    // using .then, create a new promise which extracts the data
    const tokens: Promise<Tokens> = promise.then((response) => {
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
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });

    return tokens;
  };

  /**
   * Login
   * 
   * Consumer cliente for login on Keycloak Server & Bearer Token & with client secret
   * configured with OpenID Endpoint configuration, Login with email = true and Access Type = public
   * Example of request:
   * curl --location --request POST 'http://localhost:8080/auth/realms/my-realm-test/protocol/openid-connect/token' \
   * --header 'Content-Type: application/x-www-form-urlencoded' \
   * --data-urlencode 'username=coco@gmail.com' \
   * --data-urlencode 'password=12345Asdfg' \
   * --data-urlencode 'grant_type=password' \
   * --data-urlencode 'client_id=my-client-test' \
   * --data-urlencode 'client_secret=2b525aa8-315c-4782-8e78-8b0da22c47f9'
   * 
   * Response example:
   * {
   *     "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJqbVM2UGZhRXRqbXhVM1UxSmt2blhaQ2V0YkFYR3JWdzJpYl9ESXhVWW80In0.eyJleHAiOjE2MjU4OTAyNDYsImlhdCI6MTYyNTg5MDE4NiwianRpIjoiYTk2Mzg5YTktYWExZS00MzI3LTlkZmYtMTMwNzA5NDJjMGQ0IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL215LXJlYWxtLXRlc3QiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYmI3M2M5NTMtNTdmNy00ZTcxLTlhZDUtMzQyZTRkNWYwNjdmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicmVzdC1jbGllbnQtdGVzdCIsInNlc3Npb25fc3RhdGUiOiJlNTFkODQyMC00NTk1LTQ3ZDQtOTJmMi1lOTczNjg1ZDdhMjQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtbXktcmVhbG0tdGVzdCIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6ImNvY28gY29jbyIsInByZWZlcnJlZF91c2VybmFtZSI6ImNvY29AZ21haWwuY29tIiwiZ2l2ZW5fbmFtZSI6ImNvY28iLCJmYW1pbHlfbmFtZSI6ImNvY28iLCJlbWFpbCI6ImNvY29AZ21haWwuY29tIn0.J1nrm9hAvK2iOGbI8DL_AKE1SU1S1pzNaRp2UUXHP1Uj6VmZqzpDo8kvBALA5FVXBnjJ8r530OYjM7EJQtnZQqoyMRpaRGamFL6eaMTEt3_3626kJlTE5J2TqhzeGvj357FTxnF-XwBpxVUDpxiycCdkPdfFsSKqGji_7CdF9Sj5_-GwPhhKXgdz9j5QOUteZrnFecWlLtvZU2NDsaICOkMkQQIyYgipSczOPwcfVVDe8POCWwWg4F10BIZuE49j3qVMmHMIgktE1wWaZ9MU63_ChmOCtNYxLE7o3gi550YSt9QZVKkH4SSnQHXvKfmxBTAGeopsl4vlLSIMgipZwg",
   *     "expires_in": 60,
   *     "refresh_expires_in": 60,
   *     "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI5MTU1Yzk2ZS05OWVkLTQzOWYtODMwZi00MDNlYzI1OWI5NzYifQ.eyJleHAiOjE2MjU4OTAyNDYsImlhdCI6MTYyNTg5MDE4NiwianRpIjoiZTcwZDE4MWQtODIzYy00NTI4LTlmNWUtNmVlNjNhNWI2NDI5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL215LXJlYWxtLXRlc3QiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvbXktcmVhbG0tdGVzdCIsInN1YiI6ImJiNzNjOTUzLTU3ZjctNGU3MS05YWQ1LTM0MmU0ZDVmMDY3ZiIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJyZXN0LWNsaWVudC10ZXN0Iiwic2Vzc2lvbl9zdGF0ZSI6ImU1MWQ4NDIwLTQ1OTUtNDdkNC05MmYyLWU5NzM2ODVkN2EyNCIsInNjb3BlIjoiZW1haWwgcHJvZmlsZSJ9.MACJO2Go3MdzYz-3o0jyf9v6SWR0S96rJWdbOWvaOMg",
   *     "token_type": "Bearer",
   *     "not-before-policy": 0,
   *     "session_state": "e51d8420-4595-47d4-92f2-e973685d7a24",
   *     "scope": "email profile"
   * }
   * 
   * @param param0 loginRequestData LoginRequest
   * @returns access_token JWT 
   */
   /*
  function loginInAuthServer(username: string, pass: string): Promise<Tokens> {

    const body: LoginRequestType = {
      username: username,
      password: pass,
      grant_type: 'password',
      client_id: OriginConfig.Keycloak.client_id,
      client_secret: OriginConfig.Keycloak.client_secret
    };

    //Login endpoint
    const URL = OriginConfig.URLPath.token;

    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const promise: AxiosPromise<any> = axios.post(URL, qs.stringify(body));

    // using .then, create a new promise which extracts the data
    const tokens: Promise<Tokens> = promise.then((response) => {
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
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });

    //esponse.data.refresh_toke
    //console.log(tokens);
    return tokens;
  };
*/
  /**
   * Logout
   * 
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
   /*
  function logoutService(userId: string, adminToken: string): Promise<number> {

    //User endpoint
    const URL = `${OriginConfig.URLPath.users}/${userId}/logout`;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: {}
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
*/
/**
 * Register 
 * 
 * Create a new user and email must be unique.
 * Keycloak POST Create user [SAT]. 
 * POST 'http://127.0.0.1:8180/auth/admin/realms/my-realm-test/users'
 * AUTHORIZATION: Bearer Token (Token is Admin Token)
 * HEADERS: Content-Type application/json
 * BODY: UserRepresentation
 * curl --location --request POST 'http://yourKeyclaokSSO.com/auth/admin/realms/YOUR-REALM/users' \
 * --header 'Content-Type: application/json' \
 * --header 'Authorization: Bearer <INSERT TOKEN HERE>' \
 * --data-raw '{"firstName":"James","lastName":"West", "email":"jw@test.com", "username":"james.west", "attributes": {"SomeId":"123"}}'
 * @param name 
 * @param lastname 
 * @param email 
 * @param password 
 * @returns 
 */
/*
  function registerService(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    adminToken: string): Promise<number> {

    const body: NewUserRepresentationType = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      emailVerified: OriginConfig.Keycloak.verify_email ? "false" : "true",
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
    const URL = OriginConfig.URLPath.users;

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
*/

/**
 * Get User By Email
 * 
 * Get users returns a list of users, filtered according to userEmail params.
 * @param username 
 * @param adminToken 
 * @returns 
 */
/*
function getUserByEmailService(userEmail: string, adminToken: string): Promise<any> {

  //User endpoint
  const URL = OriginConfig.URLPath.users

  //If username = email
  const config = {
    headers: { Authorization: `Bearer ${adminToken}` },
    params: {
      email: userEmail
    },
  }

  //get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  const promise: AxiosPromise<any> = axios.get(URL, config)

  // using .then, create a new promise which extracts the data
  const dataArray: Promise<any> = promise.then((response) =>
      response.data
      ).catch((error) => {
        // response.status !== 200
        const authError: ApiError = handleAxiosError(error);
        throw authError;
      });
  // If (!response.data[0]) then keycloak.error.user-not-exist else response.data[0] contains user data.
  // If the user with that email exists, the function will return the user's data 
  // in the first position of a data array.
  return dataArray;
};
*/
/**
 * Confirm Email
 * 
 * It asks the auth server to update the verification field of the email to true.
 * Keycloak: PUT Update the user [SAT]
 * call to: <http://keycloak-IP:port>/auth/admin/realms/heroes/users/<userId>
 * with PUT command 
 * and with header 'Content-Type: application/json' \
 * and --data-raw in body with data emailVerified=true in next json structure: '{
 *    "id": "56f6c53f-5150-4b42-9757-4c3dd4e7d947",
 *    "createdTimestamp": 1588881160516,
 *    "username": "Superman",
 *    "enabled": true,
 *    "totp": false,
 *    "emailVerified": true,
 *    "firstName": "Clark",
 *    "lastName": "Kent",
 *    "email": "superman@kael.com",
 *    "disableableCredentialTypes": [],
 *    "requiredActions": [],
 *    "federatedIdentities": [],
 *    "notBefore": 0,
 *    "access": {
 *        "manageGroupMembership": true,
 *        "view": true,
 *        "mapRoles": true,
 *        "impersonate": true,
 *        "manage": true
 *    }
 *}'
 * @param userId 
 * @param adminToken 
 *//*
  function confirmEmailService(userId: string, userEmail: string, adminToken: string): Promise<number> {

    const body: ConfirmEmailType = {
      email: userEmail,
      emailVerified: "true",
      username: userEmail,
      enabled: "true",
    };

    //User endpoint
    const URL = `${OriginConfig.URLPath.users}/${userId}`;

    const promise: AxiosPromise<any> = axios({
      method: 'put',
      url: URL,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: body
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
*/
  
  
  return {
    getAdminTokenService,
    getAppTokenService,
    getRefreshTokenService
  };
};
