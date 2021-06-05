
require('dotenv').config();

// REACT_APP_ENV: prod | dev | qa
export const environment = process.env.REACT_APP_ENV

export const APIEndpoints = {
  auth: process.env.REACT_APP_API_AUTH,
}

export const Keycloak = {
  realm: process.env.REACT_APP_REALM as string,
  client_id: process.env.REACT_APP_CLIENT_ID as string,
  client_secret: process.env.REACT_APP_CLIENT_SECRET as string
}


