import { ContactType } from 'domain/model/notification/contact.type';

//Interface to do dependency inversion
export interface INotificationClient {

  sendContactEmailService: (
    contactData: ContactType
  ) => Promise<any>;

};

