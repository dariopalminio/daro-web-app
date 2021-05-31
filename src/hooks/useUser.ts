import { useCallback, useContext, useState } from 'react'
import UserContext, { UserContextType } from '../context/UserContext'
import  loginService  from '../services/UserService'

// Global user type
export type UserType = {
    jwt: (string | null)
    isLogged: Boolean
}

// Global user default value
export const UserDefaultValue: UserType = {
    jwt: null,
    isLogged: false,
}

/**
 * useUser Custom Hook
 * 
 * @returns 
 *      isLogged: Boolean
 *      hasLoginError: string
 *      msg: string
 *      login function
 *      logout function
 */
export default function useUser() {
    const { user, setUser } = useContext(UserContext) as UserContextType
    const [state, setState] = useState({ loading: false, error: false, msg: '' })

    /**
     * login
     */
    const login = useCallback((email: string, password: string) => {
        setState({ loading: true, error: false, msg: "Trying to login!" })


        loginService(email, password)
            .then(jwt => {
                // Authorized
                window.sessionStorage.setItem('jwt', jwt)
                setState({ loading: false, error: false, msg: "Authorized" })
                const userValue: UserType = {
                    jwt: jwt,
                    isLogged: true
                }
                setUser(userValue)
            })
            .catch(err => {
                // Unauthorized
                window.sessionStorage.removeItem('jwt')
                setState({ loading: false, error: true, msg: err.message })
                setUser(UserDefaultValue)
            })
    }, [ setState, setUser])

    /**
     * logout
     */
    const logout = useCallback(() => {
        window.sessionStorage.removeItem('jwt')
        setState({ loading: false, error: false, msg: "You are not logged in!" })
        setUser(UserDefaultValue)
    }, [setState, setUser])

    return {
        isLogged: user?.isLogged,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        msg: state.msg,
        login,
        logout
    }
}