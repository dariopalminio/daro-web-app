import { ContactMessage } from '../../model/contact.message';


export interface INotificationService {
    sendContactEmail(contactMessage: ContactMessage, locale: string): Promise<any>;
    sendEmail(subject: string, email: string, contentHTML: string): Promise<any>;
  };