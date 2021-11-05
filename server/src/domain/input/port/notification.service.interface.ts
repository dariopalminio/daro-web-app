import { ContactMessage } from '../../model/contact.message';


export interface INotificationService {
    sendContactEmail(contactMessage: ContactMessage): Promise<any>;
    sendEmail(subject: string, email: string, contentHTML: string): Promise<any>;
  };