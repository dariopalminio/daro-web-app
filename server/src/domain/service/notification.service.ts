import { Injectable, Inject } from '@nestjs/common';
import { ContactMessage } from '../../domain/model/value_object/ContactMessage';
import { INotificationService } from '../input/port/notification.service.interface';
import IEmailSender from '../output/port/email.sender.interface';

export const EMAIL_SENDER_TOKEN='EmailSender_Implementation';

@Injectable()
export class NotificationService implements INotificationService{
  constructor(
    @Inject(EMAIL_SENDER_TOKEN)
      readonly sender: IEmailSender){
    }

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

    //const sender: IEmailSender = new EmailSmtpSenderAdapter();
    
    try {
      return this.sender.sendEmail("Subject Test", contactMessage.email, contentHTML);
    } catch (error) {
      throw error;
    };
  };

};
