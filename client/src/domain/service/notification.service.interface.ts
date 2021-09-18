import { ContactType } from '../model/notification/contact.type';

//Interface to do dependency inversion
export interface INotificationService {

  sendStartEmailConfirm: (
    name: string,
    email: string,
    verificationLink: string,
    accessToken: string
  ) => Promise<any>;

  sendContactEmailService: (
    contactData: ContactType,
    accessToken: string
  ) => Promise<any>;

};

