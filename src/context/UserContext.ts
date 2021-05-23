import { createContext} from 'react'


// Global user context type
export type UserContextType = {
    jwt: string | null
    isLogged: Boolean
    setJWT: (jwt: string | null) => void
    setIsLogged: (isLogged: boolean) => void
  }

// Initial values for global user context 
export const UserContextDefaultValues: UserContextType = {
    jwt: null,
    isLogged: false,
    setJWT: () => {},
    setIsLogged: () => {}
  };

// Global user context
const UserContext = createContext<UserContextType>(UserContextDefaultValues)

export default UserContext 