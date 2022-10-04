import { useState } from 'react';
import { ContactType } from 'domain/model/notification/contact.type';
import { INotificationClient } from 'domain/service/notification-client.interface';
import * as StateConfig from 'infra/global.config';
import { IAuthTokensClient } from 'domain/service/auth-tokens-client.interface';
import { IHookState, InitialState } from '../hook.type';


/**
 * use Notification 
 * Custom hook
 * 
 * @returns 
 */
export default function useNotification(
    authClientInjected: IAuthTokensClient | null = null,
    notifClientInjected: INotificationClient | null = null) {
    const [state, setState] = useState<IHookState>(InitialState);
    const notifClient: INotificationClient = notifClientInjected ? notifClientInjected : StateConfig.notificationClient;
    
    /**
     * sendContactEmail
     */
    const sendContactEmail = (contact: ContactType) => {
        setState({ isProcessing: true, hasError: false, msg: "notification.info.sending", isSuccess: false });

        console.log("Sending email simulation from...");
        console.log(contact);

        if (!contact || contact == null) {
            console.log("Contact is empty!");
            setState({ isProcessing: false, hasError: true, msg: "notification.error.contact.empty", isSuccess: false });
            return;
        };

        notifClient.sendContactEmailService(contact).then(info => {
            console.log("Response sent info...");
            console.log(info);
            setState({ isProcessing: false, hasError: false, msg: "contact.success.sent.email", isSuccess: true })
        })
            .catch(err => {
                if (err.status === 401) {
                    //getRefreshToken();
                }
                const errorKey = "notification.error.cannot.send.email";
                console.log("Can not send email!!!", err.message);
                setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
            });
    };

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        sendContactEmail,
    };
};