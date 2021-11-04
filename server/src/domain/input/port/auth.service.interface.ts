
import { UserRegisterDataDTO } from '../../model/register/user-register-data.dto.type';
import { StartConfirmEmailData } from '../../model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../../model/register/end.confirm.email.data';
import { VerificationCodeDataDTO } from '../../model/register/verification_code_data.dto.type';
import { IAuthResponse } from '../../../domain/output/port/auth.interface';

export interface IAuthService {

    register (userRegisterData: UserRegisterDataDTO): Promise<any>;
    sendStartEmailConfirm(startConfirmEmailMessage: StartConfirmEmailData): Promise<any>;
    sendEndEmailConfirm(endConfirmEmailData: EndConfirmEmailData): Promise<any>;
    isVerificationCodeOk(verificationCodeData: VerificationCodeDataDTO): Promise<any>;
    login(username: string, pass: string): Promise<IAuthResponse>;
};