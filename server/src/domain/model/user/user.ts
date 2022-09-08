import { IAddress } from './address.interface';
import { IUser } from './user.interface';

export class User implements IUser {
/*
    constructor(
        id: string,
        enable: boolean,
        authId: string,
        username: string,
        firstName: string,
        lastname: string,
        email: string,
        verified: boolean,
        verificationCode: string,
        startVerificationCode: Date) {
        this._id = id;
        this.enable = enable;
        this.authId = authId;
        this.username = username;
        this.firstName = firstName;
        this.lastname = lastname;
        this.email = email;
        this.verified = verified;
        this.verificationCode = verificationCode;
        this.startVerificationCode = startVerificationCode;

    }
*/
    _id: string;
    enable: boolean;
    authId: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;

    docType: string;  //docType (RUT|DNI)
    document: string;
    telephone: string;
    //birth: Date;
    //gender: string;
    language: string;

    addresses: IAddress[];
    
    verified: boolean;
    verificationCode: string;
    startVerificationCode: Date;
};