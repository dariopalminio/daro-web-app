import { createContext } from 'react'

// Global user type
export type UserType = {
  jwt: (string | null)
  isLogged: Boolean
  isRegistered: Boolean
}

// Global user default value
export const UserDefaultValue: UserType = {
  jwt: null,
  isLogged: false,
  isRegistered: false,
}


// Global user context type
export type UserContextType = {
  user: (UserType | undefined)
  setUser: (newUser: UserType) => void
}

// Recovery data from web browser Storage
export const RecoveryUserFromWebBrowser = (): UserType => {
  if (typeof Storage !== "undefined") {
    // Code when Storage is supported
    const jwtValue = window.sessionStorage.getItem("jwt");
    const userRecovered: UserType = {
      jwt: jwtValue,
      isLogged: Boolean(jwtValue),
      isRegistered: Boolean(jwtValue),
    };
    return userRecovered;
  } else {
    //Code when Storage is NOT supported
    return UserDefaultValue;
  }
}

// Initial values for global user context 
export const UserContextDefaultValues: UserContextType = {
  user: {
    jwt: null,
    isLogged: false,
    isRegistered: false,
  },
  setUser: () => { },
};

// Global user context
const UserContext = createContext<UserContextType>(UserContextDefaultValues)

export default UserContext