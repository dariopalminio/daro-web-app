
require('dotenv').config();

// REACT_APP_ENV: prod | dev | qa
export const environment = process.env.REACT_APP_ENV;

export const fake_endpoints = true

export const APIEndpoints = {
  auth: 'undefined',
};

/**
 * FAKE_API_JWT_JSON_SERVER
* URL Code: https://github.com/techiediaries/fake-api-jwt-json-server
* You can login/register by sending a POST request to
* POST http://localhost:8000/auth/login
* POST http://localhost:8000/auth/register
* with the following data 
* {
*   "email": "nilson@email.com",
*   "password":"nilson"
* }
* You should receive an access token with the following format 
* {
*    "access_token": "<ACCESS_TOKEN>"
* }
* You should send this authorization with any request to the protected endpoints
* 
*  Authorization: Bearer <ACCESS_TOKEN>
*/
export const FAKE_API_JWT_JSON_SERVER = "http://localhost:8000/auth"

export const FakeAPIEndpoints = {
  auth: FAKE_API_JWT_JSON_SERVER,
};
