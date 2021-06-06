import { useCallback, useContext, useState } from 'react'
import getNewAdminTokenService from '../services/user/GetNewAdminTokenService'
import registerService from '../services/user/RegisterService'

/**
 * cuseRegister Custom Hook
 * 
 */
export default function useRegister() {

    const [state, setState] = useState({ loading: false, error: false, msg: '', isRegisterOk: false })

    /**
     * Register
     */
    const register = useCallback((
        firstname: string,
        lastname: string,
        email: string,
        password: string) => {

        setState({ loading: true, error: false, msg: "Trying to login!", isRegisterOk: false })


        const resonseAdminToken: Promise<any> = getNewAdminTokenService();

        resonseAdminToken.then(jwt => {

                const resonseReg = registerService(
                    firstname,
                    lastname,
                    email,
                    password, jwt);

                    resonseReg.then(statusText => {
                        console.log("Register OK", statusText)
                        setState({ loading: false, error: false, msg: statusText, isRegisterOk: true })
                    }).catch(err => {
                        console.log("Register BAD", err)
                        setState({ loading: false, error: false, msg: err.message, isRegisterOk: false })
                    })
          
            })
            .catch(err => {
                // Error Can not acquire Admin token from service
                console.log("err");
                console.log(err);
                setState({ loading: false, error: true, msg: err.message, isRegisterOk: false })

            })

    }, [setState])


    return {
        isRegisterOk: state.isRegisterOk,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        msg: state.msg,
        register,
    }
}