import { FC, useState } from "react";
import UserContext from "./UserContext";


const UserContextProvider: FC = ({ children }) => {
  const [jwt, setJWT] = useState(
    () => window.sessionStorage.getItem('jwt')
  )
  const [isLogged, setIsLogged] = useState(
    Boolean(jwt)
  )

  return (
    <UserContext.Provider
      value={{
        jwt, 
        isLogged,
        setJWT, 
        setIsLogged
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
