import { FC, useEffect, useMemo } from "react";
import SessionContext, {
  recoverySessionFromStorage,
  SessionDefaultValue,
  setSessionToStorage,
} from "../../state/logic/context/SessionContext";
import { SessionType } from '../../state/model/user/SessionType';
import { atom, useAtom } from "jotai";

export const SessionAtom = atom(SessionDefaultValue);

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

  function setSessionValue(s: SessionType) {
    setSessionToStorage(s);
    setSession(s);
  }

  function removeSessionValue() {
    setSessionToStorage(SessionDefaultValue);
    setSession(SessionDefaultValue);
  }

  const sharedValue = useMemo(()=>{
    return({
      session,
      setSessionValue,
      removeSessionValue,
    })
  },[session]);

  return (
    <SessionContext.Provider
      value={sharedValue}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default UserContextProvider;
