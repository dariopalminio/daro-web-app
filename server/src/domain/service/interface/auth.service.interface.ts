
import { UserRegisterDataDTO } from '../../model/auth/register/user-register-data.dto.type';
import { StartConfirmEmailDataDTO } from '../../model/auth/register/start-confirm-email-data.dto';
import { StartRecoveryDataDTO } from '../../model/auth/recovery/start-recovery-data.dto.type';
import { VerificationCodeDataDTO } from '../../model/auth/register/verification-code-data.dto.type';
import { IAuthResponse } from '../../../domain/model/auth/auth-response.interface';
import { LoginFormDTO } from '../../../domain/model/auth/login/login-form.dto';
import { LogoutFormDTO } from '../../../domain/model/auth/login/logout-form.dto';
import { RecoveryUpdateDataDTO } from '../../../domain/model/auth/recovery/recovery-update-data.dto.type';

export interface IAuthService {

    register (userRegisterData: UserRegisterDataDTO): Promise<any>;
    sendStartEmailConfirm(startConfirmEmailMessage: StartConfirmEmailDataDTO, lang:string): Promise<any>;
    confirmAccount(verificationCodeData: VerificationCodeDataDTO, lang:string): Promise<IAuthResponse>;
    login(loginForm: LoginFormDTO): Promise<IAuthResponse>;
    logout(logoutFormDTO: LogoutFormDTO): Promise<IAuthResponse>;
    sendEmailToRecoveryPass(startRecoveryDataDTO: StartRecoveryDataDTO, lang:string): Promise<any>;
    recoveryUpdatePassword(recoveryUpdateDataDTO: RecoveryUpdateDataDTO, lang:string): Promise<IAuthResponse>;
};