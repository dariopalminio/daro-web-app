import { Injectable, Inject } from '@nestjs/common';
import { ContactMessage } from '../model/contact.message';
import { StartConfirmEmailData } from '../model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../model/register/end.confirm.email.data';
import { INotificationService } from '../input/port/notification.service.interface';
import IEmailSender from '../output/port/email.sender.interface';
import { validEmail } from '../helper/validators';
import * as GlobalConfig from '../../GlobalConfig';

export const EMAIL_SENDER_TOKEN = 'EmailSender_Implementation';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @Inject(EMAIL_SENDER_TOKEN)
    readonly sender: IEmailSender) {
  }

  /**
   * Send contact email 
   * @param contactMessage 
   * @returns 
   */
  async sendContactEmail(contactMessage: ContactMessage): Promise<any> {

    if (!validEmail(contactMessage.email)) throw new Error("Invalid email!");

    try {
      const contentHTML = `
    We will contact you shortly...
    <h1>User Information</h1>
    <ul>
        <li>Username: ${contactMessage.name}</li>
        <li>User Email: ${contactMessage.email}</li>
        <li>PhoneNumber: ${contactMessage.phone}</li>
    </ul>
    <p>Message: ${contactMessage.message}</p>
    `;

      //const sender: IEmailSender = new EmailSmtpSenderAdapter();

      const subject: string = `[${GlobalConfig.COMPANY_NAME}] Support`;
      return this.sender.sendEmail(subject, contactMessage.email, contentHTML);
    } catch (error) {
      throw error;
    };
  };

  /**
   * Send Start Email Confirm
   * Send email with verification code to registration process.
   * @param startConfirmEmailData 
   * @returns 
   */
  async sendStartEmailConfirm(startConfirmEmailData: StartConfirmEmailData): Promise<any> {

    if (!validEmail(startConfirmEmailData.email)) throw new Error("Invalid email!");
    try {
      const contentHTML = `
    <p>Hey ${startConfirmEmailData.name}!</p>
    <p>Bienvenid@ a ${GlobalConfig.COMPANY_NAME}</p>
    <p>Click on the following link to confirm your email.</p>
    <h1>Verification link: ${startConfirmEmailData.verificationLink}</h1>
    <p>Thanks, The team of ${GlobalConfig.COMPANY_NAME}</p>
    `;

      const subject: string = `[${GlobalConfig.COMPANY_NAME}] Please verify your email`;
      return this.sender.sendEmail(subject, startConfirmEmailData.email, contentHTML);
    } catch (error) {
      throw error;
    };
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
