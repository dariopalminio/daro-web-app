// Global user type
export interface SessionType {
    createdTimestamp: string;
    // Access tokens are the thing that applications use to make API requests on behalf of a user.
    access_token: (string | null);
    // Refresh tokens are used to refresh the access token lifetime.
    refresh_token: (string | null);
    // expires_in is Access Token Lifespan: Sets the expiry time for access tokens.
    // The access token lifetime determines the time period during which Client does 
    // not prompt the user to re-authenticate. 
    expires_in: number;
    // refresh_expires_in is SSO Session Idle: Sets the expiry time for refresh tokens.
    refresh_expires_in: number; 
    // Date is the date the access_token was obtained.
    date: Date;
    isLogged: boolean;
    email: string;
    email_verified: boolean;
    given_name: string;
    preferred_username: string;
    userId: string;
    firstName: string;
    lastName: string;
    roles: Array<string>;
    //roles: Array<string> | null
  };

  export enum PermissionType {
    ANONYMOUS = "ANONYMOUS",
    USER = "USER",
    ADMIN = "ADMIN",
  }