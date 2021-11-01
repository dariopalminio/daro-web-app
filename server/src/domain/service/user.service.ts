import { Injectable, Inject } from '@nestjs/common';
import { ContactMessage } from '../model/contact.message';
import { StartConfirmEmailData } from '../model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../model/register/end.confirm.email.data';
import { VerificationCodeDataDTO } from '../model/register/verification_code_data.dto.type';
import { IUserService } from '../input/port/user.service.interface';
import { IUser } from '../model/user/user.interface';
import { User } from '../model/user/user';
import { IRepository } from '../../domain/output/port/repository.interface';
import IEmailSender from '../output/port/email.sender.interface';
import { validEmail } from '../helper/validators.helper';
import * as GlobalConfig from '../../GlobalConfig';
import { EMAIL_SENDER_TOKEN } from '../service/notification.service';
import { generateToken, encodeToken, createTokenLink, decodeToken } from '../helper/token.helper';
import { UserRegisterDTO } from '../model/register/user_register.dto.type';

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

  //Create new user with basic data
  async create(userRegisterDTO: UserRegisterDTO): Promise<boolean> {

    console.log("UserRegisterDTO:",userRegisterDTO);

    let newUser: IUser = new User();
    newUser.authId = userRegisterDTO.authId;
    newUser.userName = userRegisterDTO.userName;
    newUser.email = userRegisterDTO.email;
    newUser.firstName = userRegisterDTO.firstName;
    newUser.lastName = userRegisterDTO.lastName;
    newUser.verified = false;
    newUser.enable = true;

    const newCat: Promise<boolean> = this.userRepository.create(newUser);
    console.log(newCat);
    return newCat;
  };

  // Delete user return this.labelModel.deleteOne({ osCode }).exec();
  async delete(id: string): Promise<boolean> {
    const deleted: boolean = await this.userRepository.delete(id);
    return deleted;
  };

  // Put a single user
  async updateById(id: string, user: IUser): Promise<boolean> {
    const updatedProduct: boolean = await this.userRepository.updateById(id, user);
    return updatedProduct;
  };

  /*
  async IsVerificationCodeOk(username: string, code: string): Promise<boolean> {
    const user = this.userRepository.getByQuery({
      username: username,
      verificationCode: code,
    });

    if (!user) return false;
    return true;
  }
*/
  /**
   * Send Start Email Confirm
   * Send email with verification code to registration process.
   * 
   * @param startConfirmEmailData 
   * @returns 
   */
  async sendStartEmailConfirm(startConfirmEmailData: StartConfirmEmailData): Promise<any> {

    if (!validEmail(startConfirmEmailData.email)) throw new Error("Invalid email!");

    try {
    const newVerificationCode = generateToken(); //generate verification code

console.log("startConfirmEmailData",startConfirmEmailData);

    let user: IUser = await this.userRepository.getByQuery({userName: startConfirmEmailData.userName});
    if (!user) throw new Error("User not found!");

    user.verificationCode = newVerificationCode;
    const updatedOk: boolean = await this.userRepository.update(user._id, user);
    if (!updatedOk) throw new Error("Can not save generated verification code!");

    const token: string = encodeToken(startConfirmEmailData.email, newVerificationCode);
    const verificationLink = createTokenLink(startConfirmEmailData.verificationPageLink, token);


      const contentHTML = `
    <p>Hey ${startConfirmEmailData.name}!</p>
    <p>Bienvenid@ a ${GlobalConfig.COMPANY_NAME}</p>
    <p>Click on the following link to confirm your email.</p>
    <h1>Verification link: ${verificationLink}</h1>
    <p>Thanks, The team of ${GlobalConfig.COMPANY_NAME}</p>
    `;

      const subject: string = `[${GlobalConfig.COMPANY_NAME}] Please verify your email`;
      return this.sender.sendEmail(subject, startConfirmEmailData.email, contentHTML);
   
      return true;
    } catch (error) {
      throw error;
    };
  };


  /**
   * isVerificationCodeOk
   * 
   * verificationCodeData.user is email id from Keycloak
   * @param verificationCodeData 
   * @returns 
   */
  async isVerificationCodeOk(verificationCodeData: VerificationCodeDataDTO): Promise<any> {
    
    console.log("verificationCodeData.token:", verificationCodeData.token);
    const partsArray = decodeToken(verificationCodeData.token);
    const decodedEmail = partsArray[0];
    const decodedCode = partsArray[1];

    console.log("service__>verificationCodeData:", verificationCodeData);
    console.log("service__>decodedEmail:", decodedEmail);
    let user: IUser =await this.userRepository.getByQuery({
      userName: decodedEmail,
      verificationCode: decodedCode,
    });

    console.log(user);

    if (!user) return { verificationCodeStatus: 'false', email: decodedEmail };
    
    user.verified = true;
    const updatedOk: boolean = await this.userRepository.update(user._id, user);
    
    return { verificationCodeStatus: 'true', email: decodedEmail };
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
