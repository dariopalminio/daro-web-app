import { useCallback, useState } from 'react';
import * as StateConfig from '../../../infra/global.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IAuthClient } from '../../service/auth-client.interface';
import { IHookState, InitialState } from '../hook.type';


/**
 * Start process to password recovery
 */
export default function useRecovery(authServiceInjected: IAuthTokensClient | null = null,
    userClientInjected: IAuthClient | null = null) {

    const [state, setState] = useState<IHookState>(InitialState);
    const authClient: IAuthClient = userClientInjected ? userClientInjected : StateConfig.userAuthClient;

    /**
     * Send Email To Recovery
     */
    const sendEmailToRecovery = useCallback((email: string, lang: string) => {

        setState({ isProcessing: true, isSuccess: false, hasError: false, msg: 'sending' });

        if (!email) {
            const errorMsg = "Some problem creating new user. Email does not exist in session!";
            setState({ isProcessing: false, isSuccess: false, hasError: true, msg: errorMsg });
        } else {

            const recoveryPageLink = `${StateConfig.app_url}/user/recovery/form/`;

            // Second: send email to confirmation process
            authClient.sendEmailToRecoveryPass(email, recoveryPageLink, lang)
                .then(info => {
                    console.log("Response sendStartEmailConfirm...", info);
                    setState({ isProcessing: false, isSuccess: true, hasError: false, msg: 'ok' });

                })
                .catch(err => {
                    // Error Can not send email
                    setState({ isProcessing: false, isSuccess: false, hasError: true, msg: "register.error.email-does-not-sent" });
                });
        }
    }, [authClient]);

    /**
     * Update Password
     */
    const updatePassword = useCallback((token: string, password: string, lang: string) => {
        setState({ isProcessing: true, isSuccess: false, hasError: false, msg: 'sending' });

        if (!token || !password) {
            const errorMsg = "Some problem with data. token or password wrong!";
            setState({ isProcessing: false, isSuccess: false, hasError: true, msg: errorMsg });
        } else {
            // Second: send email to confirmation process
            authClient.updatePassword(token, password, lang)
                .then(info => {
                    setState({ isProcessing: false, isSuccess: true, hasError: false, msg: 'Password updated!' });

                })
                .catch(err => {
                    // Error Can not update password
                    const msgErrorKey = err.message;
                    setState({ isProcessing: false, isSuccess: false, hasError: true, msg: msgErrorKey });
                });
        }
    }, [authClient]);

    return {
        isProcessing: state.isProcessing,
        isSuccess: state.isSuccess,
        hasError: state.hasError,
        msg: state.msg,
        updatePassword,
        sendEmailToRecovery,
    };
};