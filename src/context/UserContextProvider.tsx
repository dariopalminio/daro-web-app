import { FC, useEffect } from "react";
import UserContext, {RecoveryUserFromWebBrowser} from "./UserContext";
import { atom, useAtom } from "jotai";
import { UserDefaultValue } from "../hooks/useLogin";


export const UserAtom = atom(UserDefaultValue);

const UserContextProvider: FC = ({ children }) => {
  const [user, setUser] = useAtom(UserAtom);

  useEffect(() => {
    setUser(RecoveryUserFromWebBrowser)
  }, [setUser])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
