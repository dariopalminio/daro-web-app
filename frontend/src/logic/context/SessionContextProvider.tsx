import { FC, useEffect, useMemo } from "react";
import SessionContext, {
  recoverySessionFromStorage,
  SessionDefaultValue,
  SessionType,
  setSessionToStorage,
} from "./SessionContext";
import { atom, useAtom } from "jotai";

export const SessionAtom = atom(SessionDefaultValue);

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
