
import { IProfileClient } from '../../../domain/service/profile-client.interface';

export default function ProfileClientStub(): IProfileClient {

/**
 * Stub function
 */
function getProfileService(userName: string,
    accessToken: string): Promise<any>{
    return new Promise<any>( (resolve, reject) => {
           const resp: any = {};
           resolve(resp);
     });
  };

/**
 * Stub function
 */
 function updateProfile(userProfile: any,
    token: string): Promise<number>{
    return new Promise<any>( (resolve, reject) => {
           const resp: any = {};
           resolve(resp);
     });
  };


return {
    getProfileService,
    updateProfile
};
};
