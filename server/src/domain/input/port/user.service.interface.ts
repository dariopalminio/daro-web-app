import { ContactMessage } from '../../model/contact.message';
import { StartConfirmEmailData } from '../../model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../../model/register/end.confirm.email.data';
import { VerificationCodeData } from '../../model/register/verification_code_data';
import { IUser } from '../../model/user/user.interface';

export interface IUserService {

  getAll(): Promise<IUser[]>;
  getById(id: string): Promise<IUser>;
  create(user: IUser): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  update(id: string, user: IUser): Promise<boolean>;

  sendStartEmailConfirm(startConfirmEmailMessage: StartConfirmEmailData): Promise<any>;
  sendEndEmailConfirm(endConfirmEmailData: EndConfirmEmailData): Promise<any>;
  isVerificationCodeOk(verificationCodeData: VerificationCodeData): Promise<any>
};