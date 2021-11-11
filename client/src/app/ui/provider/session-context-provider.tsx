import { FC, useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import SessionContext, {
  recoverySessionFromStorage,
  SessionDefaultValue,
  setSessionToStorage,
  SessionAtom,
  isTokenExpired,
} from "../../../domain/context/session.context";
import { SessionType } from '../../../domain/model/user/session.type';


/**
 * UserContext Provider
 * @param param0 
 * @returns 
 */
const UserContextProvider: FC = ({ children }) => {
  const [session, setSession] = useAtom(SessionAtom);

  useEffect(() => {
    // Recovery session from storage when is rendered
    setSession(recoverySessionFromStorage);
  }, [setSession]);

  const sharedValue = useMemo(()=>{

    function setSessionValue(s: SessionType) {
      setSessionToStorage(s);
      setSession(s);
    }
  
    function removeSessionValue() {
      setSessionToStorage(SessionDefaultValue);
      setSession(SessionDefaultValue);
    }

    return({
      session,
      setSessionValue,
      removeSessionValue,
      isTokenExpired,
    })
  },[session, setSession]);

  return (
    <SessionContext.Provider
      value={sharedValue}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default UserContextProvider;
