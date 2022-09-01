//Interface to do dependency inversion
export interface IProfileClient {

    getProfileService: (
      userName: string,
      accessToken: string
    ) => Promise<any>;
  
  };