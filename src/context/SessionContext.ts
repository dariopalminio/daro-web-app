import { createContext } from 'react'
import { boolean, string } from 'yup/lib/locale'

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
}

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
}

// Global user context type
export type SessionContextType = {
  session: (SessionType | undefined)
  setSession: (newSession: SessionType) => void
}

// Recovery data from web browser Storage
export const RecoveryUserFromWebBrowser = (): SessionType => {

  if (typeof Storage !== "undefined") {
    // Code when Storage is supported
    const jwtValue = window.sessionStorage.getItem("jwt");

    const userRecovered: SessionType = {
      jwt: jwtValue,
      isLogged: Boolean(jwtValue),
      isRegistered: Boolean(jwtValue),
      email: "",
      email_verified: false,
      given_name: "",
      preferred_username: "",
      userId: "",
    };
    
    return userRecovered;
  } else {
    //Code when Storage is NOT supported
    return SessionDefaultValue;
  }
}

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
  setSession: () => { },
};

// Global user context
const UserContext = createContext<SessionContextType>(SessionContextDefaultValues)

export default UserContext