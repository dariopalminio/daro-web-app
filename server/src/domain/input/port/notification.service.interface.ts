import { ContactMessage } from '../../model/value_object/ContactMessage';


export interface INotificationService {
    sendContactEmail(contactMessage: ContactMessage): Promise<any>;
  };