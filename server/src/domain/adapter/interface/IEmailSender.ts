import { ContactMessage } from '../../model/valueo_bject/ContactMessage';

export default interface IEmailSender {
    sendEmail(subject: string, toEmail: string, htmlContent: string): Promise<boolean>;
  }