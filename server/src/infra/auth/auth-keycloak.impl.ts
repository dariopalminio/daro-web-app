import { Injectable, HttpService, HttpStatus, Inject } from '@nestjs/common';
import { IAuth } from '../../domain/output-port/auth.interface';
import { IAuthResponse } from '../../domain/model/auth/auth-response.interface';
import * as GlobalConfig from '../config/global-config';
import { stringify } from 'querystring';
import { AxiosResponse } from 'axios';


type NewAdminTokenRequestType = {
  client_id: string,
  grant_type: string,
  username: string,
  password: string,
  scope: string,
  client_secret: string,
};

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

type ConfirmEmailType = {
  username: string
  enabled: string
  emailVerified: string
  email: string
  //attributes: {
  //  verificationCode: string,
  //},
};

/**
 * Keycloak
 */
@Injectable()
export class AuthKeycloakImpl implements IAuth {

  constructor(
    @Inject('HttpService') private readonly http: HttpService,
  ) { }

  /**
   * Get Admin Token
   * 
   * POST /auth/realms/{realm}/protocol/openid-connect/token
   * 
   * Get a admin access token (from auth server) for next time can create user or update user.
   * same login url: `/auth/realms/${your-realm}/protocol/openid-connect/token`,
   * headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  */
  async getAdminToken(): Promise<string> {

    const body: NewAdminTokenRequestType = {
      client_id: GlobalConfig.Keycloak.client_id,
      grant_type: 'password',
      username: GlobalConfig.Keycloak.username_admin,
      password: GlobalConfig.Keycloak.password_admin,
      scope: 'openid roles',
      client_secret: GlobalConfig.Keycloak.client_secret,
    };

    // Token endpoint
    const URL = GlobalConfig.KeycloakPath.token;

    const res = await this.http.post(URL, stringify(body),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    ).toPromise();

    const { access_token } = res.data;
    return access_token;
  };

  /**
   * Register 
   * 
   * POST /auth/admin/realms/{realm}/users
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
   * @param firstName 
   * @param lastname 
   * @param email 
   * @param password 
   * @param adminToken
   * @returns 
   */
  async register(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    adminToken: string): Promise<IAuthResponse> {
    try {
      const access_token = adminToken;

      const body: NewUserRepresentationType = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        emailVerified: "false",
        username: username,
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
      const URL = GlobalConfig.KeycloakPath.users;

      const response: AxiosResponse<any> = await this.http
        .post(
          URL,
          JSON.stringify(body),
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      switch (response.status) {
        case HttpStatus.CREATED: //201
          return { isSuccess: true, status: response.status, message: null, data: response.data };
        case HttpStatus.UNAUTHORIZED: //401
          return { isSuccess: false, status: response.status, message: response.statusText, data: {}, error: response.data };
        case HttpStatus.BAD_REQUEST: //400
          return { isSuccess: false, status: response.status, message: response.statusText, data: {}, error: response.data };
        case HttpStatus.CONFLICT: //409
          return {
            isSuccess: false,
            status: response.status,
            message: 'Conflict: Username already exists!',
            data: {}, 
            error: response.data
          };
        default:
          return { isSuccess: false, status: response.status, message: response.statusText, data: {}, error: response.data };
      }
    } catch (error) {
      const msg = error.message ? error.message : "Unknown error when trying to register new user.";
      return { isSuccess: false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: msg, data: {}, error: error };
    }
  };

  /**
   * Get User By username
   * 
   * GET /auth/admin/realms/{realm}/users
   * 
   * Get users returns an users, filtered according to username params.
   * @param username 
   * @param adminToken 
   * @returns 
   */
  async getUserInfoByAdmin(username: string, adminToken: string): Promise<IAuthResponse> {

    try{
    let access_token = adminToken;

    const URL = GlobalConfig.KeycloakPath.users;

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    const result: AxiosResponse<any> = await this.http
      .get(URL, {
        params: { username: username },
        headers: headers,
      })
      .toPromise();

    if (result.data && result.data[0]) {
      const user = {user: result.data[0]};
      return { isSuccess: true, status: result.status, message: result.statusText, data: user }; //successful
    }
    return { isSuccess: false, status: result.status, message: result.statusText, data: {}, error: result.data };
  }catch(e: any){
    const msg = e.message ? e.message : "Unknown error in get user by username";
    return { isSuccess: false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: msg, data: {}, error: e };
  };
  };

  /**
   * Delete user from Keycloak
   * 
   * DELETE /auth/admin/realms/{realm}/users/{Id}
   * 
   * @param authId 
   * @param accessToken 
   * @returns 
   */
  async deleteAuthUser(authId: string, accessToken: string): Promise<IAuthResponse> {

    const URL = `${GlobalConfig.KeycloakPath.users}/${authId}`;
    const header = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const eraseResult = await this.http.delete(URL, {
        headers: header,
      }).toPromise();

      switch (eraseResult.status) {
        case HttpStatus.NO_CONTENT: //204
          return { isSuccess: true, status: eraseResult.status, message: undefined, data: null }; //successful
        case HttpStatus.NOT_FOUND: //404
          return { isSuccess: false, status: eraseResult.status, message: eraseResult.statusText, data: {}, error: eraseResult.data };
        default:
          return { isSuccess: false, status: eraseResult.status, message: eraseResult.statusText, data: {}, error: eraseResult.data };
      }
    } catch (error) {
      const msg = error.message ? error.message : "Unknown error in delete user.";
      return { isSuccess: false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: msg, data: {}, error: error };
    }
  };

  /**
   * Login
   * 
   * POST /auth/realms/{realm}/protocol/openid-connect/token
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
  async login(username: string, pass: string): Promise<IAuthResponse> {
    try {
      const body: LoginRequestType = {
        username: username,
        password: pass,
        grant_type: 'password',
        client_id: GlobalConfig.Keycloak.client_id,
        client_secret: GlobalConfig.Keycloak.client_secret
      };
      console.log("Login in keycloak body: ", body);
      //Login endpoint
      const URL = GlobalConfig.KeycloakPath.token;

      //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
      const response: AxiosResponse<any> = await this.http.post(URL, stringify(body)).toPromise();
      console.log("Login in keycloak: ", response.status);
      console.log("Login in keycloak: ", response);
      switch (response.status) {
        case HttpStatus.OK: //200
          return { isSuccess: true, status: response.status, message: undefined, data: response.data }; //successful
        case HttpStatus.UNAUTHORIZED: //401
          return { isSuccess: false, status: response.status, message: response.statusText, data: {}, error: response.data };
        default:
          return { isSuccess: false, status: response.status, message: response.statusText, data: {}, error: response.data };
      }
    } catch (error) {
      console.log("Login in keycloak error: ", error);
      const msg = error.message ? error.message : "Unknown error in login.";
      //"connect ECONNREFUSED 127.0.0.1:8080"
      return { isSuccess: false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: msg, data: {}, error: error };
    }
  };

  /**
   * Remove all user sessions associated with the user Also send notification to all clients that have an 
   * admin URL to invalidate the sessions for the particular user.
   * 
   * POST /{realm}/users/{id}/logout
   * 
   * @param userId 
   * @param adminToken 
   * @returns 
   */
  async logout(userId: string, adminToken: string): Promise<IAuthResponse> {
    try {
      //User endpoint
      const URL = `${GlobalConfig.KeycloakPath.users}/${userId}/logout`;

      const header = {
        Authorization: `Bearer ${adminToken}`,
      };

      const response: AxiosResponse<any> = await this.http.post(URL,
        JSON.stringify({}),
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }).toPromise();

      switch (response.status) {
        case HttpStatus.NO_CONTENT: //204
          return { isSuccess: true, status: response.status, message: undefined, data: { message: "Logged out user." } }; //successful
        case HttpStatus.UNAUTHORIZED: //401
          return { isSuccess: false, status: response.status, message: response.statusText, data: {}, error: response.data };
        case HttpStatus.NOT_FOUND: //404
          return { isSuccess: false, status: response.status, message: response.statusText, data: {}, error: response.data };
        default:
          return { isSuccess: false, status: response.status, message: response.statusText, data: {}, error: response.data };
      }
    } catch (error) {
      const msg = error.message ? error.message : "Unknown error in login.";
      return { isSuccess: false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: msg, data: {}, error: error };
    }
  };

  /**
   * Confirm Email
   * 
   * POST /auth/admin/realms/{realm}/users/{Id}
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
   */
  async confirmEmail(userId: string, userEmail: string, adminToken: string): Promise<IAuthResponse> {
    try {
      const body: ConfirmEmailType = {
        email: userEmail,
        emailVerified: "true",
        username: userEmail,
        enabled: "true",
      };

      //User endpoint
      const URL = `${GlobalConfig.KeycloakPath.users}/${userId}`;

      const response: AxiosResponse<any> = await this.http.put(
        URL,
        JSON.stringify(body),
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
          },
        }).toPromise();

      switch (response.status) {
        case HttpStatus.NO_CONTENT: //204
          return { isSuccess: true, status: response.status, message: "Email confirmed!", data: response.data }; //successful
        case HttpStatus.UNAUTHORIZED: //401
          return { isSuccess: false, status: response.status, message: response.statusText, data: {}, error: response.data };
        case HttpStatus.NOT_FOUND: //404
          return { isSuccess: false, status: response.status, message: response.statusText, data: {}, error: response.data };
        default:
          return { isSuccess: false, status: response.status, message: response.statusText, data: {}, error: response.data };
      }
    } catch (error) {
      const msg = error.message ? error.message : "Unknown error in confirm email.";
      return { isSuccess: false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: msg, data: {}, error: error };
    }
  };

  /**
   * Set up a new password for the user.
   * 
   * PUT /{realm}/users/{id}/reset-password
   * 
   * @param userId 
   * @param newPassword 
   * @param adminToken 
   * @returns 
   */
  async resetPassword(
    userId: string,
    newPassword: string,
    adminToken: string
  ): Promise<IAuthResponse> {
    try {
      const body = {
        type: 'password',
        temporary: false,
        value: newPassword,
      };

      //User endpoint
      const URL = `${GlobalConfig.KeycloakPath.users}/${userId}/reset-password`;

      const res = await this.http
        .put(
          URL,
          JSON.stringify(body),
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();

      switch (res.status) {
        case HttpStatus.NO_CONTENT: //204
          const msgSuccess = 'Password has been updated successful!';
          return { isSuccess: true, status: res.status, message: msgSuccess, data: res.data }; //successful
        case HttpStatus.UNAUTHORIZED: //401
          return { isSuccess: false, status: res.status, message: res.statusText, data: res.data };
        case HttpStatus.BAD_REQUEST: //400 no puede repetir contraseña
          return { isSuccess: false, status: res.status, message: res.statusText, data: res.data };
        default:
          return { isSuccess: false, status: res.status, message: res.statusText, data: res.data };
      }
    } catch (error) {
      const msg = error.message ? error.message : "Unknown error in confirm email.";
      return { isSuccess: false, status: HttpStatus.INTERNAL_SERVER_ERROR, message: msg, data: {}, error: error };
    }
  };


};
