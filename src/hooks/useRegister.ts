import { useCallback, useContext, useState } from 'react'
import getAdminTokenService from '../services/user/GetAdminTokenService'
import UserContext, { UserContextType, UserType, UserDefaultValue } from '../context/UserContext'
import registerService from '../services/user/RegisterService'

/**
 * cuseRegister Custom Hook
 * 
 */
export default function useRegister() {

    const { setUser } = useContext(UserContext) as UserContextType
    const [state, setState] = useState({ loading: false, error: false, msg: '', wasCreatedOk: false })

    /**
     * Register
     */
    const register = useCallback((
        firstname: string,
        lastname: string,
        email: string,
        password: string) => {

        setState({ loading: true, error: false, msg: "Trying to login!", wasCreatedOk: false })


        const responseAdminToken: Promise<any> = getAdminTokenService();

        responseAdminToken.then(jwtAdminToken => {

                const resonseReg = registerService(
                    firstname,
                    lastname,
                    email,
                    password, jwtAdminToken);

                    resonseReg.then(statusText => {
                        const msgText = statusText + " Your account has been created successfully. Now you can log in."
                        setState({ loading: false, error: false, msg: msgText, wasCreatedOk: true })
                        const userValue: UserType = {
                            jwt: "",
                            isLogged: false,
                            isRegistered: true
                        }
                        setUser(userValue)
                    }).catch(err => {
                        // Request failed with status code 409 (Conflict) or 400 (Bad Request)
                        let errorText =  err.message
                        if (err.message==="Request failed with status code 409") 
                            errorText =  "Register is NOT OK. CONFLICT: Username already exists!"
                        setState({ loading: false, error: true, msg: errorText, wasCreatedOk: false })
                        setUser(UserDefaultValue)
                    })
          
            })
            .catch(err => {
                // Error Can not acquire Admin token from service
                console.log("err");
                console.log(err);
                setState({ loading: false, error: true, msg: err.message, wasCreatedOk: false })
                setUser(UserDefaultValue)

            })

    }, [setState, setUser])


    return {
        wasCreatedOk: state.wasCreatedOk,
        isLoginLoading: state.loading,
        hasRegisterError: state.error,
        msg: state.msg,
        register,
    }
}