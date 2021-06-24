import { Injectable } from '@nestjs/common';
import { ContactMessage } from '../model/valueo_bject/ContactMessage';
import { INotificationService } from '../../domain/service/interface/INotificationService';
import { EmailSmtpSenderAdapter} from '../../infrastructure/notification/EmailSmtpSenderAdapter';
import IEmailSender from '../adapter/interface/IEmailSender';

@Injectable()
export class NotificationService implements INotificationService{


  /**
   * Send contact email 
   * @param contactDTO 
   * @returns 
   */
  async sendContactEmail(contactMessage: ContactMessage): Promise<any> {
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

    const sender: IEmailSender = new EmailSmtpSenderAdapter();
    
    try {
      return sender.sendEmail("Subject Test", contactMessage.email, contentHTML);
    } catch (error) {
      throw error;
    };
  };

};
