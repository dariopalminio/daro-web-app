import { Injectable, Inject } from '@nestjs/common';
import { ContactMessage } from '../model/contact.message';
import { INotificationService } from '../service/interface/notification.service.interface';
import IEmailSender from '../output-port/email-sender.interface';
import { validEmail } from '../helper/validators.helper';
import * as GlobalConfig from '../../infra/config/global-config';
import { Base64 } from 'js-base64';

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

  async sendEmail(subject: string, email: string, contentHTML: string): Promise<any> {

    if (!validEmail(email)) throw new Error("Invalid email!");

    try {
      const subject: string = `[${GlobalConfig.COMPANY_NAME}] Please verify your email`;
      return this.sender.sendEmail(subject, email, contentHTML);
    } catch (error) {
      throw error;
    };
  };

};
