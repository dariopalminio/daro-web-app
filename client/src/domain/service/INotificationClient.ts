import { ContactType } from '../model/notification/ContactType';

//Interface to do dependency inversion
export interface INotificationClient {
    sendContactEmailService: (contactData: ContactType, token: string) => Promise<any>;
  };

  