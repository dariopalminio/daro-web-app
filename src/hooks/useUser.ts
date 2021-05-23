import { useCallback, useContext, useState } from 'react'
import UserContext, { UserContextType } from '../context/UserContext'
import loginService from '../services/UserService'


export default function useUser() {
    const {
        isLogged,
        setJWT,
        setIsLogged } = useContext(UserContext) as UserContextType;
    const [state, setState] = useState({ loading: false, error: false })

    /**
     * login
     */
    const login = useCallback(({ username, password }: any) => {
        setState({ loading: true, error: false })
        const jwt: string | null = loginService({ username, password })
        if (jwt) window.sessionStorage.setItem('jwt', jwt)
        setState({ loading: false, error: false })
        setIsLogged(Boolean(jwt))
        setJWT(jwt)
    }, [setIsLogged, setJWT])

    /**
     * logout
     */
    const logout = useCallback(() => {
        window.sessionStorage.removeItem('jwt')
        setIsLogged(false)
        setJWT(null)
    }, [setIsLogged, setJWT])

    return {
        isLogged: isLogged,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout
    }
}