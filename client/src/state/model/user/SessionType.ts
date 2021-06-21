// Global user type
export type SessionType = {
    jwt: (string | null)
    isLogged: boolean
    isRegistered: boolean
    email: string,
    email_verified: boolean,
    given_name: string,
    preferred_username: string,
    userId: string,
  };