import { Injectable, Inject } from '@nestjs/common';
import { ContactMessage } from '../model/contact.message';
import { StartConfirmEmailData } from '../model/register/start.confirm.email.data';
import { EndConfirmEmailData } from '../model/register/end.confirm.email.data';
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

  /**
   * sendStartEmailConfirm
   * @param contactMessage 
   * @returns 
   */
  async sendStartEmailConfirm(startConfirmEmailMessage: StartConfirmEmailData): Promise<any> {

    //Verify endConfirmEmailData TODO!

    const contentHTML = `
    <p>Hey ${startConfirmEmailMessage.name}!</p>
    <p>To complete the sign up, enter the verification code on the app.</p>
    <h1>Verification code: ${startConfirmEmailMessage.code}</h1>
    <p>Thanks, The Team</p>
    `;

    try {
      return this.sender.sendEmail("[app] Please verify your email", startConfirmEmailMessage.email, contentHTML);
    } catch (error) {
      throw error;
    };
  };
  
  /**
   * sendStartEmailConfirm
   * @param contactMessage 
   * @returns 
   */
     async sendEndEmailConfirm(endConfirmEmailData: EndConfirmEmailData): Promise<any> {
       
      //Verify endConfirmEmailData TODO!

      const contentHTML = `
      <p>Hey ${endConfirmEmailData.name}!</p>
      <p>The registration was successful.</p>
      <p>Thanks, The Team</p>
      `;
  
      try {
        return this.sender.sendEmail("[app] Registration successful", endConfirmEmailData.email, contentHTML);
      } catch (error) {
        throw error;
      };
    };

};
