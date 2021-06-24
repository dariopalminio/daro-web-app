import { ContactMessage } from '../../model/valueo_bject/ContactMessage';


export interface INotificationService {
    sendContactEmail(contactMessage: ContactMessage): Promise<any>;
  };