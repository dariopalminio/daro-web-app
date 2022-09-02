//Interface to do dependency inversion
export interface IProfileClient {

    getProfileService: (
      userName: string,
      accessToken: string
    ) => Promise<any>;
  
    updateProfile: (    
      userProfile: any,
      token: string) => Promise<number>;

  };