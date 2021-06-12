import { createContext } from 'react';

const SESSION_ITEM_NAME: string = "APP_SESSION_DATA";

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

/**
 * Function: Recovery session data from web browser Storage (storage)
 * @returns 
 */
export const recoverySessionFromStorage = (): SessionType => {

  if (typeof Storage !== "undefined") {
    // Code when Storage is supported

    const sessionStorageItem = window.sessionStorage.getItem(SESSION_ITEM_NAME);
    const sessionJSONString: string = sessionStorageItem ? sessionStorageItem : "";

    if (sessionJSONString && sessionJSONString !== "") {
      try {
        const mySessionRecovered: SessionType = JSON.parse(sessionJSONString);
        return mySessionRecovered;
      } catch (error) {
        console.log(error)
      }
    }
  }
  //Code when Storage is NOT supported
  return SessionDefaultValue;
};

/**
 * Function: set session data to web browser Storage in storage
 * @param sessionToLoad 
 */
export const setSessionToStorage = (sessionToLoad: SessionType): void => {
  if (typeof Storage !== "undefined") {
    // Code when Storage is supported
    const sessionStorageItem: string = JSON.stringify(sessionToLoad);
    window.sessionStorage.setItem(SESSION_ITEM_NAME, sessionStorageItem);
  }
};

// Initial values for global user context 
export const SessionContextDefaultValues: SessionContextType = {
  session: SessionDefaultValue,
  setSessionValue: () => { },
  removeSessionValue: () => { },
};

// Global user context
const UserContext = createContext<SessionContextType>(SessionContextDefaultValues);

export default UserContext;