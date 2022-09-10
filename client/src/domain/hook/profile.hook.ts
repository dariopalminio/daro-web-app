import { useContext, useState } from 'react';
import SessionContext, { ISessionContext } from '../context/session.context';
import * as StateConfig from '../domain.config';
import { IAuthTokensClient } from '../service/auth-tokens-client.interface';
import { IProfileClient } from '../service/profile-client.interface';

/**
 * use Profile
 * Custom hook
 * 
 * @returns 
 */
export default function useProfile(authClientInjected: IAuthTokensClient | null = null,
    profileClientInjected: IProfileClient | null = null) {

    const [state, setState] = useState({ isProcessing: false, hasError: false, msg: '', isSuccess: false });
    const profClient: IProfileClient = profileClientInjected ? profileClientInjected : StateConfig.profileClient;


    const getProfile = async (userName: string | undefined) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        if (!userName || userName == null) {
            console.log("userName is empty!");
            setState({ isProcessing: false, hasError: true, msg: "profile.error.userName.empty", isSuccess: false });
            return;
        };

        try {

            let info = await profClient.getProfileService(userName);
            console.log("Response sent info...");
            console.log(info);
            setState({ isProcessing: false, hasError: false, msg: "profile.get.user.success", isSuccess: true });
            return info;

        } catch (error) {
            console.error(error);
            const errorKey = "auth.login.error.unauthorized";
            console.log("Can not getProfile!!!", error);
            setState({ isProcessing: false, hasError: true, msg: errorKey, isSuccess: false });
            throw error;
        }

    };

    const updateProfile = async (userProfile: any | undefined) => {
        setState({ isProcessing: true, hasError: false, msg: '', isSuccess: false });

        if (!userProfile || userProfile == null) {
            console.log("userProfile is empty!");
            setState({ isProcessing: false, hasError: true, msg: "profile.error.userProfile.empty", isSuccess: false });
            return;
        };

        try {

            let info = await profClient.updateProfile(userProfile);
            console.log("Response sent info...");
            console.log(info);
            setState({ isProcessing: false, hasError: false, msg: "profile.update.success", isSuccess: true });
            return info;

        } catch (error) {
            console.error(error);
            const errorKey = "profile.error.cannot.get.user";
            console.log("Can not updateProfile!!!", error);
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