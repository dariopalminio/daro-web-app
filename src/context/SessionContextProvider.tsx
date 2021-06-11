import { FC, useEffect } from "react";
import SessionContext, {RecoveryUserFromWebBrowser, SessionDefaultValue } from "./SessionContext";
import { atom, useAtom } from "jotai";


export const SessionAtom = atom(SessionDefaultValue);

const UserContextProvider: FC = ({ children }) => {
  const [session, setSession] = useAtom(SessionAtom);

  useEffect(() => {
    setSession(RecoveryUserFromWebBrowser)
  }, [setSession])

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default UserContextProvider;
