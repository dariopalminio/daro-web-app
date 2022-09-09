import { createContext } from 'react';
import { SessionType } from '../model/user/session.type';
import { atom } from "jotai";
import * as Storage from '../../infra/storage/browser.storage';

//name in session/local storage
const SESSION_ITEM_NAME: string = "APP_SESSION_DATA";


// Global user default value
export const SessionDefaultValue: SessionType = {
  createdTimestamp: '',
  access_token: null,
  refresh_token: null,
  expires_in: 0,
  refresh_expires_in: 0,
  date: new Date(),
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
  isTokenExpired: (expires_in: number, firstDate: Date, today: Date) => boolean
};

/**
 * Function: Recovery session data from web browser Storage (storage)
 * @returns 
 */
export const recoverySessionFromStorage = (): SessionType => {

  if (typeof Storage !== "undefined") {
    // Code when Storage is supported

    const sessionStorageItem = Storage.getFromSession(SESSION_ITEM_NAME);
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
    Storage.setInSession(SESSION_ITEM_NAME, sessionStorageItem);
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
  isTokenExpired: (expires_in: number, firstDate: Date, today: Date) => false
};

export function isTokenExpired(expires_in: number, firstDate: Date, today: Date): boolean {
  const secondsDiff = getSecondsBetweenTwoDates(firstDate,today);
  const expireIn = (expires_in > 10) ? expires_in - 10 : expires_in;
  const expired: boolean = (( expireIn - secondsDiff ) <= 0);
  return expired;
};

export function getSecondsBetweenTwoDates( date1: Date, date2: Date ) {
  console.log('date1:',date1);
  // Convert both dates to milliseconds
  var date1_ms = new Date(date1).getTime();
  var date2_ms = new Date(date2).getTime();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
  console.log('difference_ms:',difference_ms);
  console.log('Math.round(difference_ms/1000):',Math.round(difference_ms/1000));
  // Convert back to days and return
  return Math.round(difference_ms/1000); 
};

// Global session context
const SessionContext = createContext<ISessionContext>(SessionContextDefaultValues);

export default SessionContext;