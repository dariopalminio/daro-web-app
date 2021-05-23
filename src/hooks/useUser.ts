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
    const [state, setState] = useState({ loading: false, error: false })

    /**
     * login
     */
    const login = useCallback(({ username, password }: any) => {
        setState({ loading: true, error: false })
        const jwt: string | null = loginService({ username, password })
        if (jwt) window.sessionStorage.setItem('jwt', jwt)
        setState({ loading: false, error: false })
        const userValue: UserType = {
            jwt: jwt,
            isLogged: Boolean(jwt)
        }
        setUser(userValue)
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
        login,
        logout
    }
}