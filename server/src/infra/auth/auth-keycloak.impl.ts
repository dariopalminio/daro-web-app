import { Injectable, HttpService, HttpStatus, Inject } from '@nestjs/common';
import { IAuth } from '../../domain/output/port/auth.interface';
import * as GlobalConfig from '../../GlobalConfig';
import { stringify } from 'querystring';

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
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    adminToken: string): Promise<any> {

    let access_token = adminToken;

    const body: NewUserRepresentationType = {
      firstName: firstName,
      lastName: lastName,
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

    const res = await this.http
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
    console.log("REgister-->res.status:", res.status);
    switch (res.status) {
      case HttpStatus.CREATED:
        return { isSuccess: true, error: null };
      case HttpStatus.BAD_REQUEST:
        return {
          isSuccess: false,
          error: res.data,
        };
      case HttpStatus.CONFLICT:
        return {
          isSuccess: false,
          error:
            'CONFLICT: Username already exists!',

        };
      default:
        return { isSuccess: false, error: res.data };
    }
  };


  /**
   * Get User By username
   * 
   * Get users returns a list of users, filtered according to userEmail params.
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
    const result = await this.http
      .get(URL, {
        params: { username: username },
        headers: headers,
      })
      .toPromise();

    if (result.data && result.data[0]) return result.data[0];
    return undefined;
  };

}