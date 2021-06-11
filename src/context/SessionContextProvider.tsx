import { FC, useEffect } from "react";
import SessionContext, {
  recoverySessionFromWebBrowser,
  SessionDefaultValue,
  SessionType,
  setSessionToWebBrowser,
} from "./SessionContext";
import { atom, useAtom } from "jotai";

export const SessionAtom = atom(SessionDefaultValue);

const UserContextProvider: FC = ({ children }) => {
  const [session, setSession] = useAtom(SessionAtom);

  useEffect(() => {
    // Recovery session when is rendered
    setSession(recoverySessionFromWebBrowser);
  }, [setSession]);

  function setSessionValue(s: SessionType) {
    setSessionToWebBrowser(s);
    setSession(s);
  }

  function removeSessionValue() {
    setSessionToWebBrowser(SessionDefaultValue);
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
