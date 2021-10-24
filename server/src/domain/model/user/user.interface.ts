export interface IUser{
    _id: string; //_id: holds an ObjectId.
    enable: boolean;
    authId: string;
    username: string;
    fullname: string;
    lastname: string;
    email: string;
    verified: boolean;
    verificationCode: string;
    startVerificationCode: Date;
};
