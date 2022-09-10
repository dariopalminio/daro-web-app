import { createContext } from 'react';
import * as Storage from '../../infra/storage/browser.storage';
import { SessionType } from '../model/auth/session.type';

// Global user default value
export const SessionDefaultValue: SessionType = {
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


// Global user session context interface
export interface ISessionContext {
  session:  SessionType 
  setNewSession: (newSession: SessionType) => void
  removeSessionValue: () => void
};

/**
 * Function: Recovery session data from web browser Storage (storage)
 * @returns 
 */
export const recoverySessionFromStorage = (): SessionType => {

  if (typeof Storage !== "undefined") {
    return Storage.recoverySessionFromStorage();
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
    Storage.setSessionToStorage(sessionToLoad);
  }
};
 
// Initial values for global user context 
export const SessionContextDefaultValues: ISessionContext = {
  session: SessionDefaultValue,
  setNewSession: () => { },
  removeSessionValue: () => { }
};

export const clearSessionToStorage = (): void =>{
  Storage.clearSessionToStorage();

}

// Global session context
const SessionContext = createContext<ISessionContext>(SessionContextDefaultValues);

export default SessionContext;