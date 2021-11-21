import { Injectable, Inject } from '@nestjs/common';
import { ContactMessage } from '../model/notification/contact.message';
import { INotificationService } from '../service/interface/notification.service.interface';
import IEmailSender from '../output-port/email-sender.interface';
import { validEmail } from '../helper/validators.helper';
import * as GlobalConfig from '../../infra/config/global-config';



@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @Inject('IEmailSender')
    readonly sender: IEmailSender) {
  }

  /**
   * Send contact email 
   * @param contactMessage 
   * @returns 
   */
  async sendContactEmail(contactMessage: ContactMessage, locale: string): Promise<any> {

    if (!validEmail(contactMessage.email)) throw new Error("Invalid email!");

    try {
      const subject: string = `[${GlobalConfig.COMPANY_NAME}] Support`;
      return await this.sender.sendEmailWithTemplate(subject, contactMessage.email, "contact", contactMessage, locale);
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
