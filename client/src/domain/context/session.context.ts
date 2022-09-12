import { createContext } from 'react';
import * as SessionStorage from '../../infra/storage/session.storage';
import { SessionType } from '../model/auth/session.type';
import { DefaultSession as SessionDefaultValue} from '../../domain/model/auth/default-session';


// Global user session context interface for provider
export interface ISessionContext {
  session:  SessionType 
  setNewSession: (newSession: SessionType) => void
  removeSessionValue: () => void
};

// Initial values for global user context 
export const SessionContextDefaultValues: ISessionContext = {
  session: SessionDefaultValue,
  setNewSession: () => { },
  removeSessionValue: () => { }
};

// Global session context
const SessionContext = createContext<ISessionContext>(SessionContextDefaultValues);

/**
 * Function: Recovery session data from web browser Storage (storage)
 */
 export const recoverySessionFromStorage = (): SessionType => {

  if (typeof SessionStorage !== "undefined") {
    return SessionStorage.recoverySessionFromStorage();
  }
  //Code when Storage is NOT supported
  return SessionDefaultValue;
};

/**
 * Function: set session data to web browser Storage in storage
 * @param sessionToLoad 
 */
export const setSessionToStorage = (sessionToLoad: SessionType): void => {
  if (typeof SessionStorage !== "undefined") {
    // Code when Storage is supported
    SessionStorage.setSessionToStorage(sessionToLoad);
  }
};

/**
 * Function: clear Session To Storage
 */
export const clearSessionToStorage = (): void =>{
  SessionStorage.clearSessionToStorage();

}

export default SessionContext;