import { Injectable, Inject } from '@nestjs/common';
import { ContactMessage } from '../model/contact.message';
import { StartConfirmEmailData } from '../model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../model/register/end.confirm.email.data';
import { VerificationCodeData } from '../model/register/verification_code_data';
import { IUserService } from '../input/port/user.service.interface';
import IEmailSender from '../output/port/email.sender.interface';
import { validEmail } from '../helper/validators';
import * as GlobalConfig from '../../GlobalConfig';
import { Base64 } from 'js-base64';
import { EMAIL_SENDER_TOKEN } from '../service/notification.service';


@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(EMAIL_SENDER_TOKEN)
    readonly sender: IEmailSender) {
  }

      /**
     * Encode Token
     * Encode the token for the email confirmation link
     * as `email|createdTimestamp` -> Base64 encoded
     * @param token 
     * @returns 
     */
     encodeToken(email: string, createdTimestamp: string): string {
        const concatenated =  email + '|' + createdTimestamp;
        const encodedToken = Base64.encode(concatenated);
        return encodedToken;
    };

    /**
     * Encode Link
     * Create a url made up of the union between the url of the confirmation page and the token.
     * The result is similar to: 'http://localhost:3000/confirm/ZGFyaW9wYWxtaW5pb0BnbWFpbC5jb218MTYzMTkzNDkxODgxNw=='
     * @param token 
     * @returns string with formatt follow app_url/confirm/token
     */
     createLink (link: string, token: string): string  {
        const url = `${link}${token}`;
        return url;
    };

  /**
   * Send Start Email Confirm
   * Send email with verification code to registration process.
   * @param startConfirmEmailData 
   * @returns 
   */
  async sendStartEmailConfirm(startConfirmEmailData: StartConfirmEmailData): Promise<any> {

    if (!validEmail(startConfirmEmailData.email)) throw new Error("Invalid email!");

    const code = "token"; //TODO
    const token: string = this.encodeToken(startConfirmEmailData.email, code);
    const verificationLink = this.createLink(startConfirmEmailData.verificationLink, token);
      
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
          return {verificationCodeStatus: 'true'};
      
      return {verificationCodeStatus: 'false'};
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
