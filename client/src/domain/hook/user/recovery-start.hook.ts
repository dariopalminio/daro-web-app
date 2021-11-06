import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../domain.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { INotificationClient } from '../../service/notification-client.interface';
import { Base64 } from 'js-base64';


/**
 * Start process to password recovery
 */
export default function useRecoveryStart(authServiceInjected: IAuthTokensClient | null = null,
    notifClientInjected: INotificationClient | null = null) {

    const { session, setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ sending: true, sent: false, error: false, msg: '' });
    const authTokenService: IAuthTokensClient = authServiceInjected ? authServiceInjected : StateConfig.authorizationClient;
    const notifClient: INotificationClient = notifClientInjected ? notifClientInjected : StateConfig.notificationClient;


    const sendEmailToRecovery = useCallback((email: string) => {

        setState({ sending: true, sent: true, error: false, msg: 'ok'  });
//1- --> api sendEmailToRecovery --> generate verification code --> send email with link
//2- recovery form: api isVerificationCodeOk --> api updateNewPassword

    }, []);


    return {
        sending: state.sending,
        sent: state.sent,
        error: state.error,
        msg: state.msg,
        sendEmailToRecovery,
    };
};