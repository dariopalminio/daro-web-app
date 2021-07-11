// Global user type
export interface SessionType {
    access_token: (string | null);
    refresh_token: (string | null);
    expires_in: number;
    refresh_expires_in: number;
    date: Date;
    isLogged: boolean;
    isRegistered: boolean;
    email: string;
    email_verified: boolean;
    given_name: string;
    preferred_username: string;
    userId: string;
  };

