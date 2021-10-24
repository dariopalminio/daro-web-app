import { ContactMessage } from '../../model/contact.message';
import { StartConfirmEmailData } from '../../model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../../model/register/end.confirm.email.data';
import { VerificationCodeData } from '../../model/register/verification_code_data';

export interface IUserService {
    sendStartEmailConfirm(startConfirmEmailMessage: StartConfirmEmailData): Promise<any>;
    sendEndEmailConfirm(endConfirmEmailData: EndConfirmEmailData): Promise<any>;
    isVerificationCodeOk(verificationCodeData: VerificationCodeData): Promise<any>
  };