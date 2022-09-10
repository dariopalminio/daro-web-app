//Interface to do dependency inversion
export interface IProfileClient {

    getProfileService: (
      userName: string
    ) => Promise<any>;
  
    updateProfile: (    
      userProfile: any) => Promise<number>;

  };