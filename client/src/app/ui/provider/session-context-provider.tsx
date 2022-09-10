import { FC, useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import SessionContext, {
  recoverySessionFromStorage,
  SessionDefaultValue,
  setSessionToStorage,
  SessionAtom,
} from "../../../domain/context/session.context";
import { SessionType } from "../../../domain/model/auth/session.type";



/**
 * UserContext Provider
 * @param param0 
 * @returns 
 */
const UserContextProvider: FC = ({ children }) => {
  //const [session, setSession] = useAtom(SessionAtom);
let localsession;

  //useEffect(() => {
    // Recovery session from storage when is rendered
    //setSession(recoverySessionFromStorage);
  //}, [setSession]);

  const sharedValue = useMemo(()=>{

    function setSessionValue(s: SessionType) {
      setSessionToStorage(s);
      //setSession(s);
    }
  
    function removeSessionValue() {
      setSessionToStorage(SessionDefaultValue);
      //setSession(SessionDefaultValue);
    }

    function session() {
      return recoverySessionFromStorage();
      //setSession(SessionDefaultValue);
    }

    return({
      session,
      setSessionValue,
      removeSessionValue
    })
  },[]);

  return (
    <SessionContext.Provider
      value={sharedValue}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default UserContextProvider;
