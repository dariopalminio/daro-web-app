import { ContactType } from '../model/notification/contact.type';

//Interface to do dependency inversion
export interface INotificationClient {

  sendContactEmailService: (
    contactData: ContactType,
    accessToken: string
  ) => Promise<any>;

};

