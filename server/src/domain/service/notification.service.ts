import { Injectable } from '@nestjs/common';
import { ContactMessage } from '../../domain/model/value_object/ContactMessage';
import { INotificationService } from '../input/port/INotificationService';
import { EmailSmtpSenderAdapter} from '../../infrastructure/notification/EmailSmtpSenderAdapter';
import IEmailSender from '../output/port/IEmailSender';

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
