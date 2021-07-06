import { ContactMessage } from '../../model/contact.message';


export interface ISupportService {
    sendContactEmail(contactMessage: ContactMessage): Promise<any>;
  };