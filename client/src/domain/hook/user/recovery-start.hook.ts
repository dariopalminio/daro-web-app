import { useCallback, useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../domain.config';
import { IAuthClient } from '../../service/auth-client.interface';
import { INotificationService } from '../../service/notification-service.interface';
import { Base64 } from 'js-base64';


/**
 * 
 */
export default function useRecoveryStart(authServiceInjected: IAuthClient | null = null,
    notifServiceInjected: INotificationService | null = null) {

    const { session, setSessionValue, removeSessionValue } = useContext(SessionContext) as ISessionContext;
    const [state, setState] = useState({ sending: true, sent: false, error: false, msg: '' });
    const authService: IAuthClient = authServiceInjected ? authServiceInjected : StateConfig.authorizationClient;
    const notifService: INotificationService = notifServiceInjected ? notifServiceInjected : StateConfig.notificationService;


    const sendEmailToRecovery = useCallback((email: string) => {

        setState({ sending: true, sent: true, error: false, msg: 'ok'  });


    }, []);


    return {
        sending: state.sending,
        sent: state.sent,
        error: state.error,
        msg: state.msg,
        sendEmailToRecovery,
    };
};