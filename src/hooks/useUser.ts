import { useCallback, useContext, useState } from 'react'
import UserContext, { UserContextType } from '../context/UserContext'
import loginService from '../services/UserService'

// Global user type
export type UserType = {
    jwt: (string | null)
    isLogged: Boolean
}

export const UserDefaultValue: UserType = {
    jwt: null,
    isLogged: false,
}

export default function useUser() {
    const {
        user, setUser } = useContext(UserContext) as UserContextType;
    const [state, setState] = useState({ loading: false, error: false, msg: "" })

    /**
     * login
     */
    const login = useCallback(({ email, password }: any) => {
        setState({ loading: true, error: false, msg: ""  })
        //const jwt: string | null = loginService({ email, password })
        
  
            setState({loading: true, error: false, msg: "" })
            loginService({email, password})
              .then(jwt => {//OK
                window.sessionStorage.setItem('jwt', jwt)
                setState({loading: false, error: false, msg: "OK" })
                console.log("useUser jwt")
                console.log(jwt)
                const userValue: UserType = {
                    jwt: jwt,
                    isLogged: Boolean(jwt)
                }
                setUser(userValue)
              })
              .catch(err => {
                window.sessionStorage.removeItem('jwt')
                setState({loading: false, error: true, msg: err.message })
                console.error(err)
              })
          }, [setUser])

    /**
     * logout
     */
    const logout = useCallback(() => {
        window.sessionStorage.removeItem('jwt')
        setUser(UserDefaultValue)
    }, [setUser])

    return {
        isLogged: user?.isLogged,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        msg: state.msg,
        login,
        logout
    }
}