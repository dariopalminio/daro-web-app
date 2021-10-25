export interface IUser{
    _id: string; //_id: holds an ObjectId.
    enable: boolean;
    authId: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    verified: boolean;
    verificationCode: string;
    startVerificationCode: Date;
};
