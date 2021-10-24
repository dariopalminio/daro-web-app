import { IUser } from './user.interface';

export class User implements IUser {

    constructor(  id: string,
        enable: boolean,
        authId: string,
        username: string,
        fullname: string,
        lastname: string,
        email: string,
        verified: boolean,
        verificationCode: string,
        startVerificationCode: Date) {
        this._id = id;
        this.enable = enable;
        this.authId = authId;
        this.username = username;
        this.fullname = fullname;
        this.lastname = lastname;
        this.email = email;
        this.verified = verified;
        this.verificationCode = verificationCode;
        this.startVerificationCode = startVerificationCode;

    }

    _id: string; 
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