
import { UserRegisterDataDTO } from '../../model/auth/register/user-register-data.dto.type';
import { StartConfirmEmailData } from '../../model/auth/register/start.confirm.email.data';
import { StartRecoveryDataDTO } from '../../model/auth/recovery/start-recovery-data.dto.type';
import { VerificationCodeDataDTO } from '../../model/auth/register/verification_code_data.dto.type';
import { IAuthResponse } from '../../../domain/model/auth/auth-response.interface';
import { LoginFormDTO } from '../../../domain/model/auth/login/login-form.dto';
import { LogoutFormDTO } from '../../../domain/model/auth/login/logout-form.dto';
import { RecoveryUpdateDataDTO } from '../../../domain/model/auth/recovery/recovery-update-data.dto.type';

export interface IAuthService {

    register (userRegisterData: UserRegisterDataDTO): Promise<any>;
    sendStartEmailConfirm(startConfirmEmailMessage: StartConfirmEmailData): Promise<any>;
    confirmAccount(verificationCodeData: VerificationCodeDataDTO): Promise<IAuthResponse>;
    login(loginForm: LoginFormDTO): Promise<IAuthResponse>;
    logout(logoutFormDTO: LogoutFormDTO): Promise<IAuthResponse>;
    sendEmailToRecoveryPass(startRecoveryDataDTO: StartRecoveryDataDTO): Promise<any>;
    recoveryUpdatePassword(recoveryUpdateDataDTO: RecoveryUpdateDataDTO): Promise<IAuthResponse>;
};