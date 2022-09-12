import { FC, useEffect, useState } from "react";

import SessionContext, {
  recoverySessionFromStorage,
  setSessionToStorage,
  clearSessionToStorage
} from "../../../domain/context/session.context";
import { SessionType } from "../../../domain/model/auth/session.type";
import { DefaultSession as SessionDefaultValue} from '../../../domain/model/auth/default-session';

/**
 * Session Context Provider
 */
const SessionContextProvider: FC = ({ children }) => {
  const [session, setSession] = useState<SessionType>(SessionDefaultValue);


  useEffect(() => {
    // Recovery session from storage when is rendered
    const sessionLoaded: SessionType = recoverySessionFromStorage();
    setSession(sessionLoaded);
  }, [setSession]);

  //const sharedValue = useMemo(()=>{

  
    function removeSessionValue() {
      //setSessionToStorage(SessionDefaultValue);
      clearSessionToStorage();
      setSession(SessionDefaultValue);
    }

    function setNewSession(newSession: SessionType) {
      setSession(newSession);
      setSessionToStorage(newSession);
    }
    
/*
    return({
      session,
      setNewSession,
      removeSessionValue
    })
  },[session, setSession]);
*/
  return (
    <SessionContext.Provider
      value={{
        session,
        setNewSession,
        removeSessionValue
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
