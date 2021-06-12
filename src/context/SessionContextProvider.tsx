import { FC, useEffect } from "react";
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
    // Recovery session when is rendered
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

  return (
    <SessionContext.Provider
      value={{
        session,
        setSessionValue,
        removeSessionValue,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default UserContextProvider;
