import { Injectable, HttpService, HttpStatus, Inject } from '@nestjs/common';
import { IAuth } from '../../domain/output/port/auth.interface';
import { IAuthResponse } from '../../domain/model/auth/auth-response.interface';
import * as GlobalConfig from '../../GlobalConfig';
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
    const URL = GlobalConfig.URLPath.token;

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
    const URL = GlobalConfig.URLPath.users;

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
    console.log("REgister-->res.status:", response.status);
    switch (response.status) {
      case HttpStatus.CREATED: //201
        return { isSuccess: true, status: response.status, error: null, data: response.data };
      case HttpStatus.UNAUTHORIZED: //401
        return { isSuccess: false, status: response.status, error: response.statusText, data: response.data };
      case HttpStatus.BAD_REQUEST: //400
        return { isSuccess: false, status: response.status, error: response.statusText, data: response.data };
      case HttpStatus.CONFLICT: //409
        return {
          isSuccess: false, 
          status: response.status,
          error:
            'CONFLICT: Username already exists!',
          data: null
        };
      default:
        return { isSuccess: false, status: response.status, error: response.data, data: null };
    }
  };


  /**
   * Get User By username
   * 
   * Get users returns an users, filtered according to username params.
   * @param username 
   * @param adminToken 
   * @returns 
   */
  async getUserInfoByAdmin(username: string, adminToken: string): Promise<any | undefined> {

    let access_token = adminToken;

    const URL = GlobalConfig.URLPath.users;

    const headers = {
      Authorization: `Bearer ${access_token}`,
    };
    const result: AxiosResponse<any> = await this.http
      .get(URL, {
        params: { username: username },
        headers: headers,
      })
      .toPromise();

    if (result.data && result.data[0]) return result.data[0];
    return undefined;
  };

  /**
   * Delete user from Keycloak
   * @param authId 
   * @param accessToken 
   * @returns 
   */
  async deleteAuthUser(authId: string, accessToken: string): Promise<IAuthResponse> {

    const URL = `${GlobalConfig.URLPath.users}/${authId}`;
    const header = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const eraseResult = await this.http.delete(URL, {
        headers: header,
      }).toPromise();

      switch (eraseResult.status) {
        case HttpStatus.NO_CONTENT: //204
          return { isSuccess: true, status: eraseResult.status, error: undefined, data: null }; //successful
        case HttpStatus.NOT_FOUND: //404
          return { isSuccess: false, status: eraseResult.status, error: eraseResult.statusText, data: eraseResult.data };
        default:
          return { isSuccess: false, status: eraseResult.status, error: eraseResult.statusText, data: eraseResult.data };
      }
    } catch (error) {
      return { isSuccess: false, status: 500, error: error.message, data: null };
    }
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
  async login(username: string, pass: string): Promise<IAuthResponse> {

    const body: LoginRequestType = {
      username: username,
      password: pass,
      grant_type: 'password',
      client_id: GlobalConfig.Keycloak.client_id,
      client_secret: GlobalConfig.Keycloak.client_secret
    };

    //Login endpoint
    const URL = GlobalConfig.URLPath.token;
    try {
      //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
      const response: AxiosResponse<any> = await this.http.post(URL, stringify(body)).toPromise();

      switch (response.status) {
        case HttpStatus.OK: //200
          return { isSuccess: true, status: response.status, error: undefined, data: response.data }; //successful
        case HttpStatus.UNAUTHORIZED: //401
          return { isSuccess: false, status: response.status, error: response.statusText, data: response.data };
        default:
          return { isSuccess: false, status: response.status, error: response.statusText, data: response.data };
      }
    } catch (error) {
      return { isSuccess: false, status: 500, error: error.message, data: null };
    }
  };

  async logout(userId: string, adminToken: string): Promise<IAuthResponse> {

    //User endpoint
    const URL = `${GlobalConfig.URLPath.users}/${userId}/logout`;

    const header = {
      Authorization: `Bearer ${adminToken}`,
    };

    try {

    const response: AxiosResponse<any> = await this.http.post(URL,
      JSON.stringify({}),
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      },).toPromise();
      console.log("logout response:",response);
     switch (response.status) {
        case HttpStatus.NO_CONTENT: //204
          return { isSuccess: true, status: response.status, error: undefined, data: {message: "logged out user"} }; //successful
        case HttpStatus.UNAUTHORIZED: //401
        return { isSuccess: false, status: response.status, error: response.statusText, data: response.data };
        case HttpStatus.NOT_FOUND: //404
        return { isSuccess: false, status: response.status, error: response.statusText, data: response.data };
        default:
          return { isSuccess: false, status: response.status, error: response.statusText, data: response.data };
      }
    } catch (error) {
      return { isSuccess: false, status: 500, error: error.message, data: null };
    }
  };

}
