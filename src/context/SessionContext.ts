import { createContext } from 'react';

// Global user type
export type SessionType = {
  jwt: (string | null)
  isLogged: Boolean
  isRegistered: Boolean
  email: string,
  email_verified: boolean,
  given_name: string,
  preferred_username: string,
  userId: string,
};

// Global user default value
export const SessionDefaultValue: SessionType = {
  jwt: null,
  isLogged: false,
  isRegistered: false,
  email: "",
  email_verified: false,
  given_name: "",
  preferred_username: "",
  userId: "", // sub is the ID userId
};

// Global user context type
export type SessionContextType = {
  session: (SessionType | undefined)
  setSessionValue: (newSession: SessionType) => void
  removeSessionValue: () => void
};

// Function: Recovery session data from web browser Storage
export const recoverySessionFromWebBrowser = (): SessionType => {

  if (typeof Storage !== "undefined") {
    // Code when Storage is supported
    const jwtValue = window.sessionStorage.getItem("jwt");
    const email = window.sessionStorage.getItem("email");
    const given_name = window.sessionStorage.getItem("given_name");
    const preferred_username = window.sessionStorage.getItem("preferred_username");
    const userId = window.sessionStorage.getItem("user-id");

    const userRecovered: SessionType = {
      jwt: jwtValue,
      isLogged: Boolean(jwtValue),
      isRegistered: Boolean(jwtValue),
      email: email ? email : "",
      email_verified: false,
      given_name: given_name ? given_name : "",
      preferred_username: preferred_username ? preferred_username : "",
      userId: userId ? userId : "",
    };

    return userRecovered;
  } else {
    //Code when Storage is NOT supported
    return SessionDefaultValue;
  }
};

// Function: set session data to web browser Storage
export const setSessionToWebBrowser = (s: SessionType): void => {
  if (typeof Storage !== "undefined") {
    // Code when Storage is supported
    const str = s.jwt ? s.jwt : "";
    window.sessionStorage.setItem('jwt', str);
    window.sessionStorage.setItem('email', s.email);
    window.sessionStorage.setItem('given_name', s.given_name);
    window.sessionStorage.setItem('preferred_username', s.preferred_username);
    window.sessionStorage.setItem('user-id', s.userId);
  }
};

// Initial values for global user context 
export const SessionContextDefaultValues: SessionContextType = {
  session: {
    jwt: null,
    isLogged: false,
    isRegistered: false,
    email: "",
    email_verified: false,
    given_name: "",
    preferred_username: "",
    userId: "",
  },
  setSessionValue: () => { },
  removeSessionValue: () => { },
};

// Global user context
const UserContext = createContext<SessionContextType>(SessionContextDefaultValues);

export default UserContext;