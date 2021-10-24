import { Injectable, Inject } from '@nestjs/common';
import { ContactMessage } from '../model/contact.message';
import { StartConfirmEmailData } from '../model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../model/register/end.confirm.email.data';
import { VerificationCodeData } from '../model/register/verification_code_data';
import { IUserService } from '../input/port/user.service.interface';
import { IUser } from '../model/user/user.interface';
import { User } from '../model/user/user';
import { IRepository } from '../../domain/output/port/repository.interface';
import IEmailSender from '../output/port/email.sender.interface';
import { validEmail } from '../helper/validators.helper';
import * as GlobalConfig from '../../GlobalConfig';
import { EMAIL_SENDER_TOKEN } from '../service/notification.service';
import { generateToken, encodeToken, createTokenLink } from '../helper/token.helper';

export const USER_REPOSITORY_TOKEN = 'UserRepository_Implementation'; //ModelToken

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(EMAIL_SENDER_TOKEN)
    readonly sender: IEmailSender,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IRepository<IUser>) {
  }

  // Get all
  async getAll(): Promise<IUser[]> {
    const users: IUser[] = await this.userRepository.getAll();
    return users;
  };

  // Get a single
  async getById(id: string): Promise<IUser> {
    const user: IUser = await this.userRepository.getById(id);
    return user;
  };

  // Get a single user by auth id
  async getByAuthId(authId: string): Promise<IUser> {
    const user: IUser = await this.userRepository.getById(authId);
    return user;
  };

  async create(user: User): Promise<boolean> {
    const newCat: Promise<boolean> = this.userRepository.create(User);
    console.log(newCat);
    return newCat;
  };

  // Delete user return this.labelModel.deleteOne({ osCode }).exec();
  async delete(id: string): Promise<boolean> {
    const deleted: boolean = await this.userRepository.delete(id);
    return deleted;
  };

  // Put a single user
  async update(id: string, user: IUser): Promise<boolean> {
    const updatedProduct: boolean = await this.userRepository.update(id, user);
    return updatedProduct;
  };

  async IsVerificationCodeOk(username: string, code: string): Promise<boolean> {
    const user = this.userRepository.getByQuery({
      username: username,
      verificationCode: code,
    });

    if (!user) return false;
    return true;
  }

  /**
   * Send Start Email Confirm
   * Send email with verification code to registration process.
   * @param startConfirmEmailData 
   * @returns 
   */
  async sendStartEmailConfirm(startConfirmEmailData: StartConfirmEmailData): Promise<any> {

    if (!validEmail(startConfirmEmailData.email)) throw new Error("Invalid email!");


    const codeUUID = generateToken(); //generate verification code
    const code = "token"; //codeUUID 

    const token: string = encodeToken(startConfirmEmailData.email, code);
    const verificationLink = createTokenLink(startConfirmEmailData.verificationLink, token);

    try {
      const contentHTML = `
    <p>Hey ${startConfirmEmailData.name}!</p>
    <p>Bienvenid@ a ${GlobalConfig.COMPANY_NAME}</p>
    <p>Click on the following link to confirm your email.</p>
    <h1>Verification link: ${verificationLink}</h1>
    <p>Thanks, The team of ${GlobalConfig.COMPANY_NAME}</p>
    `;

      const subject: string = `[${GlobalConfig.COMPANY_NAME}] Please verify your email`;
      return this.sender.sendEmail(subject, startConfirmEmailData.email, contentHTML);
    } catch (error) {
      throw error;
    };
  };


  async isVerificationCodeOk(verificationCodeData: VerificationCodeData): Promise<any> {

    if (verificationCodeData.code == "token")
      return { verificationCodeStatus: 'true' };

    return { verificationCodeStatus: 'false' };
  };

  /**
 * Send Start Email Confirm
 * Send email with welcome message to end registration process.
 * @param endConfirmEmailData 
 * @returns 
 */
  async sendEndEmailConfirm(endConfirmEmailData: EndConfirmEmailData): Promise<any> {

    if (!validEmail(endConfirmEmailData.email)) throw new Error("Invalid email!");

    try {
      const contentHTML = `
          <p>Hey ${endConfirmEmailData.name}!</p>
          <p>Welcome to the team! The registration was successful.</p>
          <p>Thanks, The team of ${GlobalConfig.COMPANY_NAME}</p>
          `;

      const subject: string = `[${GlobalConfig.COMPANY_NAME}] Registration successful`;

      return this.sender.sendEmail(subject, endConfirmEmailData.email, contentHTML);
    } catch (error) {
      throw error;
    };
  };

};
