import { FC, useEffect, useState } from "react";
import * as SessionStorage from '../../../infra/storage/session.storage';
import { SessionType } from "../../../domain/model/auth/session.type";
import { DefaultSession as SessionDefaultValue} from '../../../domain/model/auth/default-session';


/**
 * Session Custom Hook
 */
export const useSession = () => {
    const [session, setSession] = useState<SessionType>(SessionDefaultValue);

    useEffect(() => {
        // Recovery session from storage when is rendered
        const sessionLoaded: SessionType = recoverySessionFromStorage();
        setSession(sessionLoaded);
      }, [setSession]);

    function removeSessionValue() {
        //setSessionToStorage(SessionDefaultValue);
        clearSessionToStorage();
        setSession(SessionDefaultValue);
      }
  
      function setNewSession(newSession: SessionType) {
        setSession(newSession);
        setSessionToStorage(newSession);
      }

      /**
 * Function: Recovery session data from web browser Storage (storage)
 */
  const recoverySessionFromStorage = (): SessionType => {

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
   const setSessionToStorage = (sessionToLoad: SessionType): void => {
    if (typeof SessionStorage !== "undefined") {
      // Code when Storage is supported
      SessionStorage.setSessionToStorage(sessionToLoad);
    }
  };
  
  /**
   * Function: clear Session To Storage
   */
   const clearSessionToStorage = (): void =>{
    SessionStorage.clearSessionToStorage();
  
  }

    return {
        session, 
        setNewSession,
        removeSessionValue
    }
}