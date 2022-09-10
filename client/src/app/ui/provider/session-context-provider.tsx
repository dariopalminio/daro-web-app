import { FC, useEffect, useMemo, useState } from "react";

import SessionContext, {
  recoverySessionFromStorage,
  SessionDefaultValue,
  setSessionToStorage,
  clearSessionToStorage
} from "../../../domain/context/session.context";
import { SessionType } from "../../../domain/model/auth/session.type";



/**
 * UserContext Provider
 * @param param0 
 * @returns 
 */
const UserContextProvider: FC = ({ children }) => {
  const [session, setSession] = useState<SessionType>(SessionDefaultValue);


  useEffect(() => {
    console.log('useEffect:',session);
    // Recovery session from storage when is rendered
    const sessionLoaded: SessionType = recoverySessionFromStorage();
    console.log('sessionLoaded:',sessionLoaded);
    setSession(sessionLoaded);
    console.log('logged:',session);
  }, [setSession]);

  //const sharedValue = useMemo(()=>{

  
    function removeSessionValue() {
      setSessionToStorage(SessionDefaultValue);
      clearSessionToStorage();
      setSession(SessionDefaultValue);
      console.log(' UserContextProvider-->removeSessionValue_>recoverySessionFromStorage():', recoverySessionFromStorage());
      console.log('UserContextProvider-->session:',session);
    }

    function setNewSession(newSession: SessionType) {
      setSession(newSession);
      setSessionToStorage(newSession);
      console.log(' UserContextProvider-->setNewSession->recoverySessionFromStorage:', recoverySessionFromStorage());
      console.log('UserContextProvider-->session:',session);
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

export default UserContextProvider;
