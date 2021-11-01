import { ContactMessage } from '../../model/contact.message';
import { StartConfirmEmailData } from '../../model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../../model/register/end.confirm.email.data';
import { VerificationCodeDataDTO } from '../../model/register/verification_code_data.dto.type';
import { IUser } from '../../model/user/user.interface';
import { UserRegisterDTO } from '../../model/register/user_register.dto.type';

export interface IUserService {

  getAll(): Promise<IUser[]>;
  getById(id: string): Promise<IUser>;
  create(userRegisterDTO: UserRegisterDTO): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  updateById(id: string, user: IUser): Promise<boolean>;

  sendStartEmailConfirm(startConfirmEmailMessage: StartConfirmEmailData): Promise<any>;
  sendEndEmailConfirm(endConfirmEmailData: EndConfirmEmailData): Promise<any>;
  isVerificationCodeOk(verificationCodeData: VerificationCodeDataDTO): Promise<any>
};