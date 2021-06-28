import { ContactType } from '../model/notification/contact.type';

//Interface to do dependency inversion
export interface INotificationService {
    sendContactEmailService: (contactData: ContactType, token: string) => Promise<any>;
  };

  