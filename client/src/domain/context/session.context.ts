import { createContext } from 'react';
import { SessionType } from '../model/user/session.type';
import { atom } from "jotai";

//name in session/local storage
const SESSION_ITEM_NAME: string = "APP_SESSION_DATA";

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

// Global user session context interface
export interface ISessionContext {
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

/**
 * Define the atom for your global state variable.
 * A piece of state in Jotai is represented by an atom. An atom accepts an
 * initial value, be it a primitive type like a number, string, or more
 * complex structures like arrays and objects.
 */
 export const SessionAtom = atom(SessionDefaultValue);
 
// Initial values for global user context 
export const SessionContextDefaultValues: ISessionContext = {
  session: SessionDefaultValue,
  setSessionValue: () => { },
  removeSessionValue: () => { },
};

// Global session context
const SessionContext = createContext<ISessionContext>(SessionContextDefaultValues);

export default SessionContext;