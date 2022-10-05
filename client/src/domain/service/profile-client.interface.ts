import { Profile } from "domain/model/user/profile.type";

//Interface to do dependency inversion
export interface IProfileClient {

  getProfile: (
    userName: string
  ) => Promise<any>;

  updateProfile: (
    userProfile: any) => Promise<number>;

  createProfile(
    userProfile: Profile): Promise<number>;

};