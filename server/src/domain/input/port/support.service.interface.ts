import { ContactMessage } from '../../model/value_object/ContactMessage';


export interface ISupportService {
    sendContactEmail(contactMessage: ContactMessage): Promise<any>;
  };