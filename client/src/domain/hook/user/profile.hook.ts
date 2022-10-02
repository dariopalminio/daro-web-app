import { useContext, useState } from 'react';
import { ApiError } from '../../../infra/client/api.error';
import SessionContext, { ISessionContext } from '../../context/session.context';
import * as StateConfig from '../../../infra/global.config';
import { IAuthTokensClient } from '../../service/auth-tokens-client.interface';
import { IProfileClient } from '../../service/profile-client.interface';
import { IHookState, InitialState } from '../hook.type';

/**
 * use Profile
 * Custom hook
 * 
 * @returns 
 */
export default function useProfile(authClientInjected: IAuthTokensClient | null = null,
    profileClientInjected: IProfileClient | null = null) {
        
    const [state, setState] = useState<IHookState>(InitialState);
    const profClient: IProfileClient = profileClientInjected ? profileClientInjected : StateConfig.profileClient;
    const { session, removeSessionValue } = useContext(SessionContext) as ISessionContext;

    const getProfile = async (userName: string | undefined) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        if (!session || !userName || userName == null) {
            setState({ isProcessing: false, hasError: true, msg: "auth.error.not.logged", isSuccess: false });
            return;
        };

        try {

            let info = await profClient.getProfileService(userName);
            
            setState({ isProcessing: false, hasError: false, msg: "profile.get.user.success", isSuccess: true });
            return info;

        } catch (error: any | ApiError) {
            let errorKey = error.message;
            if (error instanceof ApiError && (error.status===400 || error.status===401)) {
                errorKey = "auth.error.expired.token";
                removeSessionValue();
            }
            console.error(error);
            setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
            throw error;
        }

    };

    const updateProfile = async (userProfile: any | undefined) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        if (!userProfile || userProfile == null) {
            setState({ isProcessing: false, hasError: true, msg: "profile.error.userProfile.empty", isSuccess: false });
            return;
        };

        try {

            let info = await profClient.updateProfile(userProfile);
            setState({ isProcessing: false, hasError: false, msg: "profile.update.success", isSuccess: true });
            return;
        } catch (error: any | ApiError) {
            let errorKey = error.message;
            if (error instanceof ApiError && (error.status===400 || error.status===401)) {
                errorKey = 'auth.error.expired.token';
                removeSessionValue();
            }
            console.error(error);
            setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
            throw error;
        }

    };

    return {
        isProcessing: state.isProcessing,
        hasError: state.hasError,
        msg: state.msg,
        isSuccess: state.isSuccess,
        getProfile,
        updateProfile
    };
};