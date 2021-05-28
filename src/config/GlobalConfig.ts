
require('dotenv').config();

// REACT_APP_ENV: prod | dev | qa
export const environment = process.env.REACT_APP_ENV;

export const fake_endpoints = true

export const APIEndpoints = {
  auth: 'undefined',
};

export const keycloak_realm = 'my-realm-test'
export const client_id = 'rest-client-test'

export const FAKE_API_JWT_JSON_SERVER = 'http://localhost:8080/auth' //"http://localhost:8000/auth"

export const FakeAPIEndpoints = {
  auth: FAKE_API_JWT_JSON_SERVER,
};
