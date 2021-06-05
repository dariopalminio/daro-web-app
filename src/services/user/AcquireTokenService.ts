import * as GlobalConfig from '../../config/GlobalConfig';
import axios from 'axios';
import qs from 'querystring'
import { ResponseType } from './ResponseType'

export type AcquireJWTRequest = {
  grant_type: string
  client_id: string
  client_secret: string
}

/**
 * Acquire Admin Access Token with Client Credentials Grant.
 * you have the value of client secret for OAuth 2 Client “admin-cli“, 
 * you can request an admin access token using the “client-credentials” grant type.
 * 
curl --location --request POST 'http://localhost:8080/auth/realms/my-realm-test/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_id=rest-client-test' \
--data-urlencode 'client_secret=7fb49e15-2a86-4b7c-a648-27746c67895b'
 */
export default async function acquireJWTService (): Promise<any>  {

  let acquireRequestData: AcquireJWTRequest = {
    grant_type: 'client_credentials',
    client_id: GlobalConfig.Keycloak.client_id,
    client_secret: GlobalConfig.Keycloak.client_secret
  }

  const ENDPOINT = GlobalConfig.APIEndpoints.auth
  const REALM = GlobalConfig.Keycloak.realm
  const URL = `${ENDPOINT}/auth/realms/${REALM}/protocol/openid-connect/token`

  const response: ResponseType = await axios.post(URL, qs.stringify(acquireRequestData))

  if (response.status !== 200) {
    // Unauthorized or other error (401, 400, 406...)
    throw new Error('Response is NOT OK. Could not authenticate!')
  }

  const { access_token } = response.data

  return access_token
};


/**
 * REST API Call to Create a New User Account
* Now when you have an access toke, you can use the REST API Keycloak 
* provides to create a new user account.

curl --location --request POST 'http://localhost:8080/auth/admin/realms/appsdeveloperblog/users' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJFY2dlX3Y0c09fZUZ0TnhqYWJjT19QLTBhQ3p6S2VfMW02OU5mRjlBc1VzIn0.eyJleHAiOjE1OTI1Njc4OTEsImlhdCI6MTU5MjU2NzgzMSwianRpIjoiNjJiMWRlODEtNTBhMS00NzA2LWFmN2MtYzhhZTc1YTg1OTJhIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL21hc3RlciIsInN1YiI6IjNmYjc1YTM4LTA4NjctNGZlYi04ZTBlLWYzMTkxZTZlODZlMSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImFkbWluLWNsaSIsInNlc3Npb25fc3RhdGUiOiJhMDMwNGNiMS0xMzViLTQzODItYjYwMi0xNjNmNzgzYWNlN2IiLCJhY3IiOiIxIiwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJhZG1pbjIifQ.G9-OiyrGWk8cY4S3Ho255Y_euk_gTKDgYmGmU8RPBSeBNtFb_A68tuPFJxFKbzhZ1lipKJCXQsHbStoihvXAmmRsKzud5hDIvvnrD7CcVxAIpbd2wV5i6mB2wVLocV0_FCrE0-DNi_GPAKnazjFiVu3TxxM2L8Zsw7PHN9sb8Ux_lRvAFyNY5bT7NTbmEmt6LsO2An7iTZdBLScK9Lk9ZW8_0WG4eLMy9fatrpVV3MXhINW56gZD8WsWISY0m-cbIftDreZ1f2lzIjMGfkDrgCjy-VZjeIpbmffN-YGrUVywziymBRwA7FFLAxcf6jS5548HVxxKeMPIvNEfDG7eWw' \
--data-raw '{"firstName":"Sergey","lastName":"Kargopolov", "email":"test@test.com", "enabled":"true", "username":"app-user"}'
*/
