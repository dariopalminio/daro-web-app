import { FC, useEffect } from "react";
import { useCart } from "../../../domain/hook/cart/cart.hook";
import SessionContext from "../../../domain/context/session.context";
import { useSession } from "../../../domain/hook/user/session.hook";

/**
 * Session Context Provider
 */
const SessionContextProvider: FC = ({ children }) => {
  const {session,
    setNewSession,
    removeSessionValue} = useSession();

  useEffect(() => {

  }, []);

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
