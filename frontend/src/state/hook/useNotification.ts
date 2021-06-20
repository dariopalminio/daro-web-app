import { useCallback, useState } from 'react';
import { ContactType } from '../model/notification/ContactType';


/**
 * useNotification custom hook
 * @returns 
 */
export default function useNotification() {

    const [state, setState] = useState({ sending: false, hasError: false, msg: '', wasSent: false });


    /**
     * sendContactEmail
     */
    const sendContactEmail = useCallback((contact: ContactType | undefined) => {
        setState({ sending: true, hasError: false, msg: "Trying to logout!", wasSent: false })
        
        console.log("Sending email simulation from...");
        console.log(contact);

    }, [state, setState]);


    return {
        sending: state.sending,
        hasError: state.hasError,
        msg: state.msg,
        wasSent: state.wasSent,
        sendContactEmail,
    };
};