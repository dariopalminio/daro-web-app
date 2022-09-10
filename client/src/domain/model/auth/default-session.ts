import { SessionType } from "./session.type";

// Global user default value
export const DefaultSession: SessionType = {
    createdTimestamp: '',
    access_token: null,
    refresh_token: null,
    expires_in: 0,
    refresh_expires_in: 0,
    date: new Date(),
    isLogged: false,
    email: "",
    email_verified: false,
    given_name: "",
    preferred_username: "",
    userId: "", // sub is the ID userId
  };