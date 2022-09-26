import { FC, useEffect } from "react";
import { useCart } from "../../../domain/hook/cart/cart.hook";
import SessionContext from "../../../domain/context/session.context";
import { useSession } from "../../../domain/hook/auth/session.hook";

/**
 * Session Context Provider
 */
const SessionContextProvider: FC = ({ children }) => {
  const {session,
    setNewSession,
    removeSessionValue,
    permission} = useSession();

  useEffect(() => {

  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        setNewSession,
        removeSessionValue,
        permission
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
